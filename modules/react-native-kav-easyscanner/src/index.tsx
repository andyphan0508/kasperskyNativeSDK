import {DeviceEventEmitter, EmitterSubscription, NativeModules, Platform} from 'react-native';

import {ExportResult, ScanType} from './interface';

export const getPermission = async (): Promise<boolean> => {
  const {KasperskyScannerSDK} = NativeModules;

  if (Platform.OS === 'android') {
    return KasperskyScannerSDK.getPermissionClick();
  }

  return true;
};

export const kasperskyEasyScanner = (scanType: ScanType): Promise<any> => {
  const {KasperskyScannerSDK} = NativeModules;

  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('AllResult', data => {
      resolve(data);
      result.remove();
    });

    try {
      KasperskyScannerSDK.onCreate(scanType);
    } catch (error) {
      reject(error);
    }
  });
};

export default {kasperskyEasyScanner, getPermission};
