package wifimodules;

public interface SdkInitListener
{
    void onInitializationFailed(String reason);

    boolean onSdkInitialized();
}