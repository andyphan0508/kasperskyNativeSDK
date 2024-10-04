import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-wifi-scanner' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const WifiScanner = NativeModules.WifiScanner
  ? NativeModules.WifiScanner
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

export const kasperskyWifiScanner = (): Promise<any> => {
  const {KasperskyWifiScanner} = NativeModules;
  return new Promise((resolve, reject) => {
    let result: EmitterSubscription;
    result = DeviceEventEmitter.addListener('WifiScanResult', data => {
      resolve(data);
      console.log(data);
      result.remove();
    });

    try {
      KasperskyWifiScanner.onCreate();
    } catch (error) {
      reject(error);
    }
  });
};
