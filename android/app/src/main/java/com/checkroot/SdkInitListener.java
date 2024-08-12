package com.checkroot;

import com.facebook.react.bridge.ReactMethod;

public interface SdkInitListener {
    @ReactMethod
    void onCreate();

    void onInitializationFailed(String reason);

    void onSdkInitialized();

    void onInitSuccess();

    void onInitFailure(String message);
}