package com.securityscan;

interface SdkInitListener {
    void onInitializationFailed(String reason);
    void onSdkInitialized();
}

