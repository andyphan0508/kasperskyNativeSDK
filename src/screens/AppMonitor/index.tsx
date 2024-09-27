// import { Button } from '@mui/material';
import React from 'react';
import {DeviceEventEmitter, Image, TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import kasperskyAppMonitor from 'react-native-app-monitor';
import {Switch, Button, Divider} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets';
import {useAppNavigation} from '../../navigation/AppNavigation';

const AppMonitor: React.FC<any> = () => {
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
      await kasperskyAppMonitor({
        setScanUdsAllow: state.setScanUdsAllow,
        setSkipRiskwareAdWare: state.setSkipRiskwareAdWare,
        maxAppSize: state.maxAppSize,
      });
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
        source={images.heart_rate}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
      />
      <View style={{marginHorizontal: 8}}>
        <Text style={styles.title}>Kiểm soát thiết bị</Text>
        <Text style={styles.description}>
          Để đảm bảo an toàn giữa các ứng dụng, bạn có thể sử dụng chức năng này
          để kiểm soát ứng dụng trên thiết bị của mình. Cho phép Kaspersky quét
          ứng dụng không an toàn, và theo dõi các ứng dụng có trong thiết bị của
          mình.
        </Text>
        <Divider style={{borderWidth: 0.25, marginVertical: 8}} />
        <Text style={styles.subtitle}>Tùy chỉnh</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#1D1D1B'}}>
              Bỏ qua ứng dụng mã độc
            </Text>
            <Text style={{fontSize: 12, color: '#1D1D1B'}}>
              Cho phép bỏ qua tất cả những ứng dụng có mã độc trong máy của bạn'
            </Text>
          </View>
          <Switch
            value={skipRiskwareAdWare}
            onChange={onEnableSkipRiskwareAdware}
            color="#00A88E"
          />
        </View>
        <View style={styles.view}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#1D1D1B'}}>
              Quét UDS
            </Text>
            <Text style={{fontSize: 12, color: '#1D1D1B'}}>
              Cho phép bỏ qua tất cả những ứng dụng có mã độc trong máy của bạn
            </Text>
          </View>
          <Switch value={scanUds} onChange={onEnableScanUds} color="#00A88E" />
        </View>
        <Button onPress={onFunction} style={styles.button}>
          Nhấn để theo dõi
        </Button>
      </View>
    </View>
  );
};

export default AppMonitor;

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
    button: {backgroundColor: '#29CCB1', borderRadius: 8, marginVertical: 8},
  });
};
