package com.wifiscanner;




import android.content.Context;
import android.content.pm.PackageInfo;

import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import wifimodules.SdkInitListener;
import wifimodules.AvCompletedListener;
import wifimodules.DataStorage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.kavsdk.KavSdk;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.antivirus.AntivirusInstance;
import com.kavsdk.license.SdkLicense;
import com.kavsdk.license.SdkLicenseDateTimeException;
import com.kavsdk.license.SdkLicenseException;
import com.kavsdk.license.SdkLicenseNetworkException;
import com.kavsdk.license.SdkLicenseViolationException;

import com.kavsdk.shared.iface.ServiceStateStorage;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class WifiScannerModule extends ReactContextBaseJavaModule implements SdkInitListener {
  private static final String TAG = "WIFI_SCAN_EXAMPLE";
  private volatile WifiScannerModule.InitStatus mSdkInitStatus = InitStatus.NotInited;
  private Antivirus mAntivirusComponent;
  private Thread mScanThread;
  private Context mContext;

  private AvCompletedListener mAvCompletedListener;


  WifiScannerModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return "KasperskyWifiScanner";
  }

  @ReactMethod
  public void displayName() {
    Log.d("Note: ", "Kaspersky Wifi Scanner is ready to run");

  }


  @ReactMethod
  public void onCreate() {
    Log.i(TAG, "Sample application started");
    new Thread(new Runnable() {
      @Override
      public void run() {
        final Context context = getReactApplicationContext().getApplicationContext();
        try {
          initializeSdk(context, WifiScannerModule.this);
          onSdkInitialized();
        } catch (SdkLicenseViolationException e) {
          throw new RuntimeException(e);
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
    }).start();
  }



  @ReactMethod
  public void initializeSdk(Context context, SdkInitListener listener) throws SdkLicenseViolationException, IOException {


    final File basesPath = getCurrentActivity().getApplicationContext().getDir("bases", Context.MODE_PRIVATE);
    ServiceStateStorage generalStorage = new DataStorage(getCurrentActivity().getApplicationContext(), DataStorage.GENERAL_SETTINGS_STORAGE);

    try {
      KavSdk.initSafe(getCurrentActivity().getApplicationContext(), basesPath, generalStorage, getNativeLibsPath());

      final SdkLicense license = KavSdk.getLicense();
      if (!license.isValid()) {
        if (!license.isClientUserIDRequired()) {
          license.activate(null);
        }
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

    File scanTmpDir = getCurrentActivity().getApplicationContext().getDir("scan_tmp", Context.MODE_PRIVATE);
    File monitorTmpDir = getCurrentActivity().getApplicationContext().getDir("monitor_tmp", Context.MODE_PRIVATE);

    try {
      mAntivirusComponent.initAntivirus(getCurrentActivity().getApplicationContext(),
              scanTmpDir.getAbsolutePath(), monitorTmpDir.getAbsolutePath());

    } catch (SdkLicenseViolationException e) {
      mSdkInitStatus = InitStatus.InitFailed;
      listener.onInitializationFailed(e.getMessage());
      return;
    } catch (IOException ioe) {
      mSdkInitStatus = InitStatus.InitFailed;
      listener.onInitializationFailed(ioe.getMessage());
      return;
    }

    mSdkInitStatus = InitStatus.InitedSuccesfully;
    listener.onSdkInitialized();
  }


  public void onInitializationFailed(final String reason) {

  }



  @Override
  public void onSdkInitialized() {

  }

    @ReactMethod
    public void onSdkInitialized (String mode) throws SdkLicenseViolationException {
    }


    public void onInitSuccess () {

    }

    // AddListener and removeListeners are required for event subscription in RN
    @ReactMethod
    public void addListener (String eventName){
      // React Native will manage listeners through JavaScript
    }

    @ReactMethod
    public void removeListeners (Integer count){
      // React Native will manage removal of listeners through JavaScript
    }

    public void onInitFailure (String message){
    }

    /**
     * Constructor of getNativeLibsPath()
     */
    public String getNativeLibsPath () {
      try {
        PackageInfo packageInfo = getCurrentActivity().getPackageManager().getPackageInfo(getCurrentActivity().getPackageName(), 0);
        return packageInfo.applicationInfo.nativeLibraryDir;
      } catch (PackageManager.NameNotFoundException error) {
        throw new RuntimeException(error);
      }
    }

    // Method to send log messages to JS via event emitter
    private void sendEvent (ReactContext reactContext, String eventName, @Nullable String message){
      List<String> messageList = Arrays.asList(message);
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit(eventName, message);
    }


    public enum InitStatus {
      NotInited,
      InitInProgress,
      InitedSuccesfully,
      InsufficientPermissions,
      NeedNewLicenseCode,
      InitAntivirusFailed,
      InitFailed, Inited;
    }

      public static boolean isError(InitStatus initStatus) {
        return initStatus != InitStatus.NotInited &&
                initStatus != InitStatus.InitInProgress &&
                initStatus != InitStatus.InitedSuccesfully;
      }
    }

    
