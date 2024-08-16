package com.easyscanner;

interface SdkInitListener
{
    void onInitializationFailed(String reason);
    void onSdkInitialized();
}