package com.securityscan;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.common.annotations.UnstableReactNativeAPI;
import com.facebook.react.uimanager.ViewManager;

import com.securityscan.SecurityScanModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SecurityScanPackage implements ReactPackage {

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(
          @NonNull ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new SecurityScanModule(reactContext));

    return modules;
  }

 

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
    return Collections.emptyList();
  }


}

