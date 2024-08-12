package com.kaspersky;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.checkroot.SdkInitListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.license.SdkLicenseViolationException;
import com.kavsdk.rootdetector.RootDetector;

import java.io.File;


public class KasperskyModule extends ReactContextBaseJavaModule implements SdkInitListener {

    private static final String TAG = "EasyScanner";
    // Create thread for processing
    private Thread scannerThread;
    private volatile InitStatus mSdkInitStatus = InitStatus.NotInited;
    private Antivirus mAntivirusComponent;


    KasperskyModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "KasperskySDK";
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
    public void initializeSdk(Context context, SdkInitListener listener) {
        Log.i(TAG, "SDK initialization started");
        final File basesPath = getDir("bases", Context.MODE_PRIVATE);

        try {
            mSdkInitStatus = InitStatus.Inited;
            Log.i(TAG, "SDK initialized successfully");
            listener.onInitSuccess();
        } catch (Exception e) {
            mSdkInitStatus = InitStatus.NotInited;
            Log.e(TAG, "SDK initialization failed", e);
            listener.onInitFailure(e.getMessage());
        }
    }

    public File getDir(String bases, int modePrivate) {
        return null;
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
    @ReactMethod
    public void onCreate() {
        Log.i(TAG, "Sample application started");
        boolean listener;

        new Thread(new Runnable() {
            @Override
            public void run() {
                final Context context = getReactApplicationContext().getApplicationContext();
                // Perform operations
            }
        }).start();
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

}