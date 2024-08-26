
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNRootCheckModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNRootCheckModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNRootCheck";
  }

  @ReactMethod
  public void displayName(String string) {
    System.out.println("Hello " + string);
  }
}