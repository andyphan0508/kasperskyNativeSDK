package com.checkroot;

import com.facebook.react.bridge.ReactMethod;
import com.kavsdk.license.SdkLicenseViolationException;

import java.io.IOException;

public interface SdkInitListener {
    @ReactMethod
    void onCreate() throws SdkLicenseViolationException, IOException;

    void onInitializationFailed(String reason);

    boolean onSdkInitialized();

    void onInitSuccess();

    void onInitFailure(String message);
}