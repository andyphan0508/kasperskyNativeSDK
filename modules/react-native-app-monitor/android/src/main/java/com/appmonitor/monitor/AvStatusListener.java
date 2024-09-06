package com.appmonitor.monitor;

public interface AvStatusListener {

    void onCreate();

    void onStatus(String report);

    void onInfected(String report);
}
