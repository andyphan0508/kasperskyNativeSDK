package com.wifiscanner;


import android.content.Context;
import android.content.pm.PackageInfo;

import android.content.pm.PackageManager;
import android.net.wifi.SupplicantState;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
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
import com.facebook.react.bridge.WritableArray;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.kavsdk.KavSdk;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.antivirus.AntivirusInstance;
import com.kavsdk.fingerprint.SmFingerprint;
import com.kavsdk.license.SdkLicense;
import com.kavsdk.license.SdkLicenseDateTimeException;
import com.kavsdk.license.SdkLicenseException;
import com.kavsdk.license.SdkLicenseNetworkException;
import com.kavsdk.license.SdkLicenseViolationException;

import com.kavsdk.shared.iface.ServiceStateStorage;
import com.kavsdk.wifi.CloudState;
import com.kavsdk.wifi.WifiCheckResult;
import com.kavsdk.wifi.WifiReputation;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;


public class WifiScannerModule extends ReactContextBaseJavaModule implements SdkInitListener {
  private static final String TAG = "WIFI_SCAN_EXAMPLE";
  private volatile WifiScannerModule.InitStatus mSdkInitStatus = WifiScannerModule.InitStatus.NotInited;
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
        mContext = mContext.getApplicationContext();
        try {
          initializeSdk(mContext, WifiScannerModule.this);
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
    Log.i(TAG, "WiFi-Scanner started");

    mScanThread = new Thread() {
      @Override
      public void run() {
        StringBuilder message = new StringBuilder();

        final WifiManager wifiManager = (WifiManager) mContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);

        try {
          String bssid = wifiManager.getConnectionInfo().getBSSID();
          if (bssid == null || wifiManager.getConnectionInfo().getSupplicantState() == SupplicantState.DISCONNECTED) {
            Log.e(TAG, "Wi-Fi Scan NOT STARTED");
            Log.e(TAG, mContext.getString(R.string.str_wifi_not_connected));
          } else {
            final WifiReputation wifiReputation = new WifiReputation(mContext);
            WifiCheckResult wifiCheckResult = wifiReputation.checkCurrentNetwork();
            if (wifiCheckResult != null) {
              switch (wifiCheckResult.getVerdict()) {
                case Safe:
                  message.append(mContext.getString(R.string.str_wifi_status_safe));
                  break;
                case Unsafe:
                  message.append(mContext.getString(R.string.str_wifi_status_not_safe));
                  break;
                case Unknown:
                  message.append(mContext.getString(R.string.str_wifi_status_unknown));
                  break;
                default:
                  message.append("<unknown verdict>");
              }
              Log.i(TAG, message.toString());
              sendEvent(getReactApplicationContext(), "ScanResult", message.toString());
              message.append("\n");
              Log.i(TAG, mContext.getString(
                      wifiCheckResult.getCloudState() == CloudState.Available
                              ? R.string.str_wifi_ksn_available
                              : R.string.str_wifi_ksn_unavailable));
            }

            SmFingerprint fingerprint = new SmFingerprint(mContext);

            final WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            message.append("\n\n");
            message.append(String.format("SSID: %s\n", wifiCheckResult.getSsid()));
            message.append(String.format("BSSID: %s\n", wifiCheckResult.getBssid()));
            message.append(String.format("MAC: %s\n", fingerprint.getPersistentProperties().wifiMAC));
            message.append(String.format("Supplicant state: %s\n", wifiInfo.getSupplicantState().name()));
            message.append(String.format(Locale.getDefault(), "RSSI: %d\n", wifiInfo.getRssi()));
            message.append(String.format(Locale.getDefault(), "Link speed: %d\n", wifiInfo.getLinkSpeed()));
            message.append(String.format(Locale.getDefault(), "Network ID: %d\n", wifiInfo.getNetworkId()));
            message.append(String.format("Hidden SSID: %s\n", wifiInfo.getHiddenSSID() ? "yes" : "no"));
          }
        } catch (SdkLicenseViolationException e) {
          message.append(mContext.getString(R.string.str_wifi_lic_expired));
        } catch (IOException e) {
          message.append(mContext.getString(R.string.str_wifi_service_unavailable));
        }

        Log.d(TAG, "WiFi Scan finished ");
        Log.d(TAG, message.toString());

        if (mAvCompletedListener != null) {
          mAvCompletedListener.onAvCompleted("WiFi Scan complete!\n\n"
                  + message.toString() + "\n");
        }
        Log.i(TAG, "WiFi-Scanner finished");
      }
    };
    mScanThread.start();
  }

  @Override
  public void onSdkInitialized() {

  }

  @ReactMethod
  public void onSdkInitialized(String mode) throws SdkLicenseViolationException {
  }


  public void onInitSuccess() {

  }

  // AddListener and removeListeners are required for event subscription in RN
  @ReactMethod
  public void addListener(String eventName) {
    // React Native will manage listeners through JavaScript
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // React Native will manage removal of listeners through JavaScript
  }

  public void onInitFailure(String message) {

  }


  private enum InitStatus {
    NotInited,
    InitInProgress,
    InitedSuccesfully,
    InsufficientPermissions,
    NeedNewLicenseCode,
    InitAntivirusFailed,
    InitFailed, Inited;

    public static boolean isError(InitStatus initStatus) {
      return initStatus != NotInited &&
              initStatus != InitInProgress &&
              initStatus != InitedSuccesfully;
    }
  }

  /**
   * Constructor of getNativeLibsPath()
   */
  public String getNativeLibsPath() {
    try {
      PackageInfo packageInfo = getCurrentActivity().getPackageManager().getPackageInfo(getCurrentActivity().getPackageName(), 0);
      return packageInfo.applicationInfo.nativeLibraryDir;
    } catch (PackageManager.NameNotFoundException error) {
      throw new RuntimeException(error);
    }
  }

  // Method to send log messages to JS via event emitter
  private void sendEvent(ReactContext reactContext, String eventName, @Nullable String message) {
    List<String> messageList = Arrays.asList(message);
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, message);
  }
}
