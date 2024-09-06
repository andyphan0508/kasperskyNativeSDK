import React from 'react';
import { DeviceEventEmitter, NativeModules } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';

import kasperskyAppMonitor from 'react-native-app-monitor';

const AppMonitor: React.FC<any> = () => {
  const [state, setState] = React.useState<any>();

  React.useEffect(() => {
    onFunction();
    DeviceEventEmitter.addListener('kasperskyAppMonitor', event => {
      console.log('event', event);
    });
  }, []);

  const onFunction = async () => {
    try {
      await kasperskyAppMonitor({
        setScanUdsAllow: true,
        setSkipRiskwareAdWare: false,
        maxAppSize: 1024,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>{state}</Text>
    </View>
  );
};

export default AppMonitor;

const styles = StyleSheet.create({});
