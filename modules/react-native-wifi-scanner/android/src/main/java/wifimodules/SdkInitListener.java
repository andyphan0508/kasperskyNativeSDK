package wifimodules;

public interface SdkInitListener
{
    void onInitializationFailed(String reason);

    void onSdkInitialized();
}