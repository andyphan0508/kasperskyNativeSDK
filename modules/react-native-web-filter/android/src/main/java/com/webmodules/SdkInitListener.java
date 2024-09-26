
package com.webmodules;
public interface SdkInitListener
{
    void onInitializationFailed(String reason);
    void onSdkInitialized();
}