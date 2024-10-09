package com.webmodules;

import android.util.Log;

import com.kaspersky.components.urlchecker.UrlInfo;
import com.kaspersky.components.urlfilter.UrlFilterHandler;
import com.kavsdk.webfilter.WebAccessEvent;
import com.kavsdk.webfilter.WebAccessHandler;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.webfilter.*;

public class UrlFilterImpl implements UrlFilterHandler, WebAccessHandler {
    private static final String TAG = WebFilterPackage.class.getSimpleName();
    private String blockPage = "<!DOCTYPE html><html><head><title>Blocking page</title>" +
            "</head><body> <h1>Blocked from KL POC APP!</h1></body></html>";

    @Override
    public InputStream getBlockPageData(String s, UrlInfo urlInfo) {
        Log.i(TAG, "In getBlockPageData");

        return new ByteArrayInputStream(blockPage.getBytes());
    }

    @Override
    public void onWebAccess(WebAccessEvent webAccessEvent) {
        Log.w(TAG, webAccessEvent.getUrl());
        if (webAccessEvent.getUrl().contains("google")) {
            webAccessEvent.block(new ByteArrayInputStream(blockPage.getBytes()));
        }
    }
}
