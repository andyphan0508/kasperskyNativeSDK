import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
  Platform,
} from 'react-native';
import React from 'react';

type ExportResult = {
  filesFound: string[];
  filesScanned: number;
  filesInfected: number;
};

const kasperskyEasyScanner = (exportResult?: ExportResult): Promise<any> => {
  const { KasperskyScannerSDK } = NativeModules;

  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('AllResult', data => {
      console.log(data);
      resolve(data);
      result.remove();
    });

    try {
      KasperskyScannerSDK.onCreate();
    } catch (error) {
      reject(error);
    }
  });
};

export default kasperskyEasyScanner;
