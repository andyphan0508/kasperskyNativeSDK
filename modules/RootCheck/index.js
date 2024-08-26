import { NativeModules } from 'react-native';

const { RNRootCheck } = NativeModules;

/** Export these module to call when interacting with the npm package */
export default { getDeviceName: () => RNRootCheck.getDeviceName() };
