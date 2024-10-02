import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
} from 'react-native';

/** Set the permission on storage */

export const updateDatabase = (): Promise<any> => {
  const {KasperskyScannerSDK} = NativeModules;

  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('Status', data => {
      resolve(data);
      result.remove();
    });

    try {
      KasperskyScannerSDK.updateDatabase();
    } catch (error) {
      reject(error);
    }
  });
};

export const kasperskyEasyScanner = (): Promise<any> => {
  const {KasperskyScannerSDK} = NativeModules;

  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('ScanResult', data => {
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

export default {kasperskyEasyScanner, updateDatabase};
