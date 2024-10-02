// import { Button } from '@mui/material';
import React from 'react';
import {DeviceEventEmitter, Image, TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import kasperskyAppMonitor from 'react-native-app-monitor';
import {Switch, Button, Divider} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets';
import {useAppNavigation} from '../../navigation/AppNavigation';
import {kasperskyWifiScanner} from 'react-native-wifi-scanner';

const WifiScanner: React.FC<any> = () => {
  const navigation = useAppNavigation();
  const styles = createStyles();

  const [state, setState] = React.useState<any>({
    setScanUdsAllow: false,
    setSkipRiskwareAdWare: false,
    maxAppSize: 102,
    udsScan: false,
    skipRiskwareAdWare: false,
    result: '',
  });

  const [skipRiskwareAdWare, setSkipRiskwareAdWare] =
    React.useState<boolean>(false);
  const [scanUds, setScanUds] = React.useState<boolean>(true);

  React.useEffect(() => {
    DeviceEventEmitter.addListener('Result', event => {
      setState({...state, result: event});
    });
  }, []);

  const onFunction = async () => {
    try {
      await kasperskyWifiScanner();
    } catch (error) {
      console.error(error);
    }
  };

  const onEnableSkipRiskwareAdware = () =>
    setSkipRiskwareAdWare(!skipRiskwareAdWare);
  const onEnableScanUds = () => setScanUds(!scanUds);

  return (
    <View style={{padding: 8}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#29CCB1" />
      </TouchableOpacity>
      <Image
        source={images.wifi}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
      />
      <View
        style={{
          marginHorizontal: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Quét Wifi</Text>
        <Text style={styles.description}>
          Sử dụng Wifi an toàn cùng với Kaspersky
        </Text>
        <Button onPress={onFunction} style={styles.button}>
          <Text style={{color: 'white'}}>Nhấn để quét</Text>
        </Button>
      </View>
    </View>
  );
};

export default WifiScanner;

const createStyles = () => {
  return StyleSheet.create({
    title: {color: '#1D1D1B', fontWeight: '700', fontSize: 30},
    description: {
      color: '#1D1D1B',
      lineHeight: 20,
      fontSize: 15,
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 25,
      fontWeight: '800',
      marginBottom: 8,
      color: '#1D1D1B',
    },
    view: {flexDirection: 'row', alignItems: 'center'},
    button: {backgroundColor: '#29CCB1', borderRadius: 32, marginVertical: 8},
  });
};
