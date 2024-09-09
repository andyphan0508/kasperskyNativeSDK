package com.kasperskyMonitor;

import android.app.Application;
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


public class MonitorModule extends ReactContextBaseJavaModule implements SdkInitListener {

    private static final String TAG = "APP_MONITOR_SAMPLE";
    // Create thread for processing
    private Thread scannerThread;
    private volatile InitStatus mSdkInitStatus = InitStatus.NotInited;
    private Antivirus mAntivirusComponent;


    MonitorModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "KasperskyMonitorSDK";
    }

    @ReactMethod
    public void displayName() {
        Log.d("Note: ", "Kaspersky Scanner is ready to run");
    }

    @Override
    @ReactMethod
    public void onCreate() {
        Log.i(TAG, "Check scanner sampling started");

        new Thread(() -> {
            final Context context = getReactApplicationContext().getApplicationContext();
            try {
                initializeSdk(context, MonitorModule.this);
            } catch (SdkLicenseViolationException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).start();
    }



    @ReactMethod
    public void initializeSdk(Context context, SdkInitListener listener) throws SdkLicenseViolationException, IOException {
        Log.i(TAG, "SDK initialization started");
        /** CHECK LICENSE: Dev mode need to re-initialize */

        mAntivirusComponent = AntivirusInstance.getInstance();
        Application application = new Application();
        File scanTempDir = application.getDir("scan_temp", Context.MODE_PRIVATE);
        File monitorTempDir = application.getDir("monitor_temp", Context.MODE_PRIVATE);
        mAntivirusComponent.initAntivirus(getReactApplicationContext().getApplicationContext(), scanTempDir.getAbsolutePath(), monitorTempDir.getAbsolutePath());
        mSdkInitStatus = InitStatus.InitedSuccesfully;
        listener.onSdkInitialized();
    }



    public void onInitializationFailed(final String reason) {
        Log.e(TAG, "SDK initialization status=" + mSdkInitStatus + ", reason=" + reason);
    }

    @ReactMethod
    public boolean onSdkInitialized() {
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

        return false;
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