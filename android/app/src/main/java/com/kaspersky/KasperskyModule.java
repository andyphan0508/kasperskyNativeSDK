package com.kaspersky;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KasperskyModule extends ReactContextBaseJavaModule {
    KasperskyModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "";
    }

    @ReactMethod
    public String displayName(String string) {
        Log.d("Note: ", "Kaspersky is ready to run");
        return string;
    }


}