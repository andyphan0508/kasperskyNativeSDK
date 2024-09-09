package com.securityscan;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.kavsdk.KavSdk;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.antivirus.AntivirusInstance;
import com.kavsdk.antivirus.ScannerConstants;
import com.kavsdk.antivirus.easyscanner.EasyMode;
import com.kavsdk.license.SdkLicense;
import com.kavsdk.license.SdkLicenseDateTimeException;
import com.kavsdk.license.SdkLicenseException;
import com.kavsdk.license.SdkLicenseNetworkException;
import com.kavsdk.license.SdkLicenseViolationException;
import com.kavsdk.securityscanner.SecurityResult;
import com.kavsdk.securityscanner.SecurityScanner;
import com.kavsdk.securityscanner.SecurityScannerBuilder;
import com.kavsdk.shared.iface.ServiceStateStorage;
import com.kavsdk.webfilter.WebFilterControl;

import java.io.File;
import java.io.IOException;
import java.util.Objects;

public class SecurityScanModule extends ReactContextBaseJavaModule  {

  public static final String TAG = "APP_SECURITY_SCAN";
  private volatile SecurityScanModule.InitStatus mSdkInitStatus = InitStatus.NotInited;

  private static final int SCAN_MODE = ScannerConstants.SCAN_MODE_ALLOW_UDS;
  private static final int CLEAN_MODE = ScannerConstants.CLEAN_MODE_DONOTCLEAN;

  private Antivirus mAntivirusComponent;
  private Antivirus mAntivirus;
  private Handler mHandler;
  private Thread mScanThread;
  WebFilterControl mWebFilter;
  private boolean isSdkReady;
  SecurityScanModule(ReactApplicationContext context) {
    super(context);
  }


  public String getName() {
    return "SecurityScanModule";
  }

  @ReactMethod
  /** Setting the SDK to initialize from the start */
  private void initializeSdk(Context context, com.securityscan.SdkInitListener listener) {
    Log.i(TAG, "SDK initialization started");
    final File basesPath = Objects.requireNonNull(getCurrentActivity()).getDir("bases", Context.MODE_PRIVATE);
    ServiceStateStorage generalStorage = new com.example.securityscanexample.DataStorage(getCurrentActivity().getApplicationContext(), com.example.securityscanexample.DataStorage.GENERAL_SETTINGS_STORAGE);

    try {
      KavSdk.initSafe(getCurrentActivity().getApplicationContext(), basesPath, generalStorage, getNativeLibsPath());

      final SdkLicense license = KavSdk.getLicense();
      if (!license.isValid() && !license.isClientUserIDRequired()) {
        license.activate(null);
      }

    } catch (SdkLicenseNetworkException | SdkLicenseDateTimeException | IOException e) {
      mSdkInitStatus = InitStatus.InitFailed;
      listener.onInitializationFailed("Init failure: " + e.getMessage());
      return;
    } catch (SdkLicenseException e) {
      mSdkInitStatus = InitStatus.NeedNewLicenseCode;
      listener.onInitializationFailed("New license code is required: " + e.getMessage());
      return;
    }

      SdkLicense license = KavSdk.getLicense();
    if (!license.isValid()) {
      mSdkInitStatus = InitStatus.NeedNewLicenseCode;
      listener.onInitializationFailed("New license code is required");
      return;
    }

    mAntivirusComponent = AntivirusInstance.getInstance();

    File scanTmpDir = getCurrentActivity().getDir("scan_tmp", Context.MODE_PRIVATE);
    File monitorTmpDir = getCurrentActivity().getDir("monitor_tmp", Context.MODE_PRIVATE);

    try {
      mAntivirusComponent.initAntivirus(getCurrentActivity().getApplicationContext(),
              scanTmpDir.getAbsolutePath(), monitorTmpDir.getAbsolutePath());

    } catch (SdkLicenseViolationException e) {
      mSdkInitStatus = InitStatus.InitFailed;
      listener.onInitializationFailed(e.getMessage());
      return;
    } catch (IOException e) {
      Log.e(TAG, "IOException caused");
      mSdkInitStatus = InitStatus.InitFailed;
      listener.onInitializationFailed(e.getMessage());
      return;
    }

    mSdkInitStatus = InitStatus.InitedSuccesfully;
    listener.onSdkInitialized();
  }

  public void startSecurityScan(EasyMode mode) {
    try {
      mScanThread = null;
      final SecurityScanner securityScanner = new SecurityScannerBuilder(Objects.requireNonNull(getCurrentActivity()).getApplicationContext())
              .setEasyMode(mode)
              .setScanInstalledApplications(true)
              .create();

    } catch (SdkLicenseViolationException e) {
      throw new RuntimeException(e);
    }
  }

  private enum InitStatus {
    NotInited,
    InitInProgress,
    InitedSuccesfully,
    InsufficientPermissions,
    NeedNewLicenseCode,
    InitAntivirusFailed,
    InitFailed;

    public static boolean isError(InitStatus initStatus) {
      return initStatus != NotInited &&
              initStatus != InitInProgress &&
              initStatus != InitedSuccesfully;
    }
  }

  /** Create a method for the package */
  public void onInitializationFailed(final String reason) {
    Log.e(TAG, "SDK initialization status=" + mSdkInitStatus + ", reason=" + reason);
  }


  public void onSdkInitialized() {
    Log.i(TAG, "SDK initialized");
  }

  private String getNativeLibsPath() {
    // If you do not want to store native libraries in the application data directory
    // SDK provides the ability to specify another path
    // (otherwise, you can simply omit pathToLibraries parameter).
    // Note: storing the libraries outside the application data directory is not secure as
    // the libraries can be replaced. In this case, the libraries correctness checking is required.
    // Besides, the specified path must be to device specific libraries,
    // i.e. you should care about device architecture.
    try {
      PackageInfo packageInfo = Objects.requireNonNull(getCurrentActivity()).getPackageManager().getPackageInfo(getCurrentActivity().getPackageName(), 0);
      return packageInfo.applicationInfo.nativeLibraryDir;

  } catch (PackageManager.NameNotFoundException e) {
      throw new RuntimeException(e);
  }
  }
}
