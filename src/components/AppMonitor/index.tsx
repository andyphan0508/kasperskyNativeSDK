// import { Button } from '@mui/material';
import React from 'react';
import { DeviceEventEmitter } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';

import kasperskyAppMonitor from 'react-native-app-monitor';
import { Switch, Button } from 'react-native-paper';

const AppMonitor: React.FC<any> = () => {
  const [state, setState] = React.useState<any>({
    setScanUdsAllow: false,
    setSkipRiskwareAdWare: false,
    maxAppSize: 102,
    udsScan: false,
    skipRiskwareAdWare: false,
    result: '',
  });

  const [isEnabled, setIsEnabled] = React.useState<boolean>();
  const [skipRiskwareAdWare, setSkipRiskwareAdWare] = React.useState<boolean>();
  const [scanUds, setScanUds] = React.useState<boolean>();

  React.useEffect(() => {
    DeviceEventEmitter.addListener('Result', event => {
      setState({ ...state, result: event });
    });
  }, []);

  React.useEffect(() => {
    if (!isEnabled) {
      setState({
        setScanUdsAllow: false,
        setSkipRiskwareAdWare: false,
        maxAppSize: 102,
        udsScan: false,
        skipRiskwareAdWare: false,
        result: '',
      });
      setScanUds(false);
      setSkipRiskwareAdWare(false);
    }
  }, [isEnabled]);

  const onFunction = async () => {
    try {
      await kasperskyAppMonitor({
        setScanUdsAllow: state.setScanUdsAllow,
        setSkipRiskwareAdWare: state.setSkipRiskwareAdWare,
        maxAppSize: state.maxAppSize,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onPressEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const onEnableSkipRiskwareAdware = () => {
    setSkipRiskwareAdWare(!skipRiskwareAdWare);
  };

  const onEnableScanUds = () => {
    setScanUds(!scanUds);
  };

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, fontSize: 20, color: '#000000' }}>
          App Monitor
        </Text>
        <Switch onChange={onPressEnabled} value={isEnabled} />
      </View>
      {isEnabled && (
        <View style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>Allow scan UDS</Text>
            <Switch onChange={onEnableScanUds} value={scanUds} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>Skip Riskware/Adware</Text>
            <Switch
              onChange={onEnableSkipRiskwareAdware}
              value={skipRiskwareAdWare}
            />
          </View>
          <View style={{}}>
            <Button
              onPress={onFunction}
              style={{ backgroundColor: 'lightgray' }}>
              Press here to monitor
            </Button>
            <View>
              <Text>{state.setScanUdsAllow ? 'true' : 'false'}</Text>
              <Text>{skipRiskwareAdWare ? 'true' : 'false'}</Text>
              <Text>{state.result}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AppMonitor;

const styles = StyleSheet.create({});
