import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
  Platform,
} from 'react-native';
import React from 'react';

const kasperskyRootCheck = (): Promise<boolean> => {
  const { KasperskyRootSDK } = NativeModules;

  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('CheckRoot', data => {
      resolve(data);
      result.remove();
    });

    try {
      KasperskyRootSDK.onCreate();
    } catch (error) {
      reject(error);
    }
  });
};

export default kasperskyRootCheck;
