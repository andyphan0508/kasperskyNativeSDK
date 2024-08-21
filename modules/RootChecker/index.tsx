import React from 'react';
import { NativeModules, DeviceEventEmitter } from 'react-native';
import { RootChecker } from './interface';

const CheckRoot = () => {
  const { KasperskyRootSDK }: RootChecker = NativeModules;

  const [state, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    KasperskyRootSDK.onCreate();
  }, [state]);
  DeviceEventEmitter.addListener('CheckRoot', data => {
    setState(data);
  });

  return state;
};

export default CheckRoot;
