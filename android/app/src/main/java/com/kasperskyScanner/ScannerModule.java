package com.kasperskyScanner;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.checkroot.SdkInitListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.antivirus.AntivirusInstance;
import com.kavsdk.license.SdkLicenseViolationException;
import com.kavsdk.rootdetector.RootDetector;

import java.io.File;
import java.io.IOException;


public class ScannerModule extends ReactContextBaseJavaModule implements SdkInitListener {

    private static final String TAG = "EasyScanner";
    // Create thread for processing
    private Thread scannerThread;
    private volatile InitStatus mSdkInitStatus = InitStatus.NotInited;
    private Antivirus mAntivirusComponent;


    ScannerModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "KasperskyScannerSDK";
    }

    @ReactMethod
    public void displayName() {
        Log.d("Note: ", "Kaspersky Scanner is ready to run");

    }
    @Override
    @ReactMethod
    public void onCreate() {
        Log.i(TAG, "Check root sampling started");

        new Thread(new Runnable() {
            @Override
            public void run() {
                final Context context = getReactApplicationContext().getApplicationContext();
                try {
                    initializeSdk(context, ScannerModule.this);
                } catch (SdkLicenseViolationException e) {
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }


    @ReactMethod
    public String displayName(String string) {
        Log.d("Note: ", "Kaspersky is ready to run");
        return string;
    }

    /**
     * CHECK ROOT MODULE:
     * This system represent the module connecting the device, checking for root
     * and device is rooted or not
     **/
    /**
     * Initialize the SDK
     */

    @ReactMethod
    public void initializeSdk(Context context, SdkInitListener listener) throws SdkLicenseViolationException, IOException {
        Log.i(TAG, "SDK initialization started");
        /** CHECK LICENSE: Dev mode need to re-initialize */

        mAntivirusComponent = AntivirusInstance.getInstance();

        File scanTempDir = getDir("scan_temp", Context.MODE_PRIVATE);
        File monitorTempDir = getDir("monitor_temp", Context.MODE_PRIVATE);
        mAntivirusComponent.initAntivirus(getReactApplicationContext().getApplicationContext(), scanTempDir.getAbsolutePath(), monitorTempDir.getAbsolutePath());
//        try {
//            mAntivirusComponent.initAntivirus(getReactApplicationContext().getApplicationContext(), scanTempDir.getAbsolutePath(), monitorTempDir.getAbsolutePath());
//        } catch (SdkLicenseViolationException e) {
//            mSdkInitStatus = InitStatus.InitFailed;
//            listener.onInitializationFailed(e.getMessage());
//        } catch (IOException ioe) {
//            mSdkInitStatus = InitStatus.InitFailed;
//            listener.onInitializationFailed(ioe.getMessage());
//        }
        mSdkInitStatus = InitStatus.InitedSuccesfully;
        listener.onSdkInitialized();
    }

    public File getDir(String bases, int modePrivate) {
        return new File(bases);
    }


    public void onInitializationFailed(final String reason) {
        Log.e(TAG, "SDK initialization status=" + mSdkInitStatus + ", reason=" + reason);
    }

    @ReactMethod
    public void onSdkInitialized() {
        Log.i("Root checking", "Root checking init");
        scannerThread = new Thread() {
            public void run() {
                try {
                    final boolean isRootedDevice = RootDetector.getInstance().checkRoot();
                    Log.i(TAG, "Is Rooted Device: " + (isRootedDevice ? "YES" : "NO"));
                } catch (SdkLicenseViolationException error) {
                    Log.e(TAG, "Check is device rooted failed due to license violation: " + error.getMessage());
                }
            }
        };
        if (scannerThread != null) {
            scannerThread.start();
        } else {
            Log.e("Point error", "Thread instance is null");
        }

    }


    @Override
    public void onInitSuccess() {

    }

    @Override
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

    /** Constructor of getNativeLibsPath() */
    public String getNativeLibsPath() {
        try {
            PackageInfo packageInfo = getCurrentActivity().getPackageManager().getPackageInfo(getCurrentActivity().getPackageName(), 0);
            return packageInfo.applicationInfo.nativeLibraryDir;
        } catch (PackageManager.NameNotFoundException error) {
            throw new RuntimeException(error);
        }
    }


}