package com.easyscanner;

public interface SdkInitListener
{
    void onInitializationFailed(String reason);
    void onSdkInitialized();
}