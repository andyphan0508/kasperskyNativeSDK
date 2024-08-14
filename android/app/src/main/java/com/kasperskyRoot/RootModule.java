package com.kasperskyRoot;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.checkroot.DataStorage;
import com.checkroot.SdkInitListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kavsdk.KavSdk;
import com.kavsdk.antivirus.Antivirus;
import com.kavsdk.antivirus.AntivirusInstance;
import com.kavsdk.license.SdkLicenseViolationException;
import com.kavsdk.rootdetector.RootDetector;
import com.kavsdk.shared.iface.ServiceStateStorage;

import java.io.File;
import java.io.IOException;
import java.util.Objects;


public class RootModule extends ReactContextBaseJavaModule implements SdkInitListener {

    private static final String TAG = "CHECK_ROOT_EXAMPLE";
    // Create thread for processing
    private volatile InitStatus mSdkInitStatus = InitStatus.NotInited;
    private Antivirus mAntivirusComponent;
    private Thread scannerThread;


    RootModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "KasperskyRootSDK";
    }

    @ReactMethod
    public String displayName(String string) {
        Log.d("Note: ", "Kaspersky is ready to run");
        return string;
    }

    @Override
    @ReactMethod
    public void onCreate() {
        Log.i(TAG, "Check root sampling started");
        new Thread(() -> {
            final Context context = getReactApplicationContext().getApplicationContext();
            initializeSdk(context, RootModule.this);
        }).start();
    }

    @Override
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
        scannerThread.start();

    }


    @ReactMethod
    public void initializeSdk(Context context, SdkInitListener listener) throws SdkLicenseViolationException, IOException {
        Log.i(TAG, "SDK initialization started");
        /** CHECK LICENSE: Dev mode need to re-initialize */

        mAntivirusComponent = AntivirusInstance.getInstance();
        final File basesPath = Objects.requireNonNull(getCurrentActivity()).getDir("bases", Context.MODE_PRIVATE);
        ServiceStateStorage generalStorage  = new DataStorage(getReactApplicationContext(), DataStorage.GENERAL_SETTINGS_STORAGE);

        File scanTempDir = Objects.requireNonNull(getCurrentActivity()).getDir("scan_temp", Context.MODE_PRIVATE);
        File monitorTempDir = Objects.requireNonNull(getCurrentActivity()).getDir("monitor_temp", Context.MODE_PRIVATE);

        mAntivirusComponent.initAntivirus(context, scanTempDir.getAbsolutePath(), monitorTempDir.getAbsolutePath());
        try {
            KavSdk.initSafe(getCurrentActivity().getApplicationContext(), basesPath, generalStorage, getNativeLibsPath());

            mAntivirusComponent.initAntivirus(context, scanTempDir.getAbsolutePath(), monitorTempDir.getAbsolutePath());
        } catch (SdkLicenseViolationException e) {
            mSdkInitStatus = InitStatus.InitFailed;
            listener.onInitializationFailed(e.getMessage());
        } catch (IOException ioe) {
            mSdkInitStatus = InitStatus.InitFailed;
            listener.onInitializationFailed(ioe.getMessage());
        }


        mSdkInitStatus = InitStatus.InitedSuccesfully;
        listener.onSdkInitialized();
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