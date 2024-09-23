import {Image, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {kasperskyEasyScanner, getPermission} from 'react-native-kav-easyscanner';

import {ScanType} from 'react-native-kav-easyscanner/src/interface';
import {images} from '../../assets';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackScreenProps} from '@react-navigation/stack';

const AntivirusChecker: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const styles = createStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResult, setIsResult] = React.useState<any>([]);
  const [scanType, setScanType] = React.useState<ScanType>('Basic');
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsResult(undefined);
  }, [scanType]);

  const onSync = async () => {
    try {
      const result = await getPermission();
      setIsResult(result);
      console.log(result);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const onPress = async () => {
    try {
      if (scanType === undefined) {
        setError(true);
        return;
      }

      setError(false);
      setIsLoading(true);
      const result = await kasperskyEasyScanner(scanType);

      setIsResult(result);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const onSelectScanType = (value: string) => setScanType(value as ScanType);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#00A88E" />
      </TouchableOpacity>
      <Image source={images.virus_scan} resizeMode="contain" style={{height: 200, width: '100%'}} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Diệt virus</Text>
        <Button style={styles.sync} onPress={onSync}>
          <Text style={{color: '#FFFF', fontWeight: 'bold'}}>Đồng bộ hóa</Text>
        </Button>
      </View>
      {!isLoading && !isResult ? (
        <Text style={{color: '#1D1D1B', lineHeight: 23}}>
          Trình diệt virus này sẽ quét qua thiết bị của bạn, đồng thời sẽ kiểm tra xem có mã độc, đảm bảo thiết bị của
          bạn luôn được an toàn và bảo vệ toàn diện khỏi các mã độc hại.
        </Text>
      ) : isLoading ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00A88E" />
          <Text style={{color: '#1D1D1B', lineHeight: 23, marginHorizontal: 8}}>Đang quét...</Text>
        </View>
      ) : (
        <Text>{!!isResult && !isLoading && typeof isResult === 'string' && isResult.split(',').join('\n')}</Text>
      )}

      <View style={{marginVertical: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1}}>Các loại quét</Text>
          <Text style={{fontSize: 15}}>{scanType}</Text>
        </View>
        <Divider style={{borderWidth: 0.25, opacity: 0.5, marginVertical: 8}} />

        <TouchableOpacity
          onPress={() => onSelectScanType('Basic')}
          style={[styles.selection, {backgroundColor: scanType === 'Basic' ? '#EFFFFC' : undefined}]}>
          <Ionicons name="cloud" size={30} color="#00A88E" />
          <View style={styles.optionBox}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>Cơ bản</Text>
            <Text style={styles.optionSubtitle}>
              Đây là chức năng cơ bản nhất, dùng bộ scan từ hệt thống đám mây KSN của Kaspersky
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Light')}
          style={[styles.selection, {backgroundColor: scanType === 'Light' ? '#EFFFFC' : undefined}]}>
          <MaterialCommunityIcons name="lightning-bolt-circle" size={30} color="#00A88E" />
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>Quét nhanh</Text>
            <Text style={styles.optionSubtitle}>
              Đây là chức năng cơ bản được thêm một vài tính năng nâng cao dùng bộ đám mây KSN
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('LightPlus')}
          style={[styles.selection, {backgroundColor: scanType === 'LightPlus' ? '#EFFFFC' : undefined}]}>
          <Ionicons name="add-circle" size={30} color="#00A88E" />
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>Quét nhanh (nâng cao)</Text>
            <Text style={styles.optionSubtitle}>
              Đây là chức năng cơ bản được thêm một vài tính năng nâng cao dùng bộ đám mây KSN
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Recommended')}
          style={[styles.selection, {backgroundColor: scanType === 'Recommended' ? '#EFFFFC' : undefined}]}>
          <Ionicons name="thumbs-up-sharp" size={30} color="#00A88E" />
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>Khuyên dùng</Text>
            <Text style={styles.optionSubtitle}>
              Chức năng được khuyên dùng nhất về độ đầy đủ và sự an toàn bảo mật
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Full')}
          style={[styles.selection, {backgroundColor: scanType === 'Full' ? '#EFFFFC' : undefined}]}>
          <Ionicons name="shield-checkmark" size={30} color="#00A88E" />
          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>Toàn bộ</Text>
            <Text style={styles.optionSubtitle}>
              Bản đầy đủ các chức năng quét, bảo mật và kiểm tra từ hệ thống KSN
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button onPress={onPress} style={{backgroundColor: '#29CCB1', paddingBottom: 8}}>
        <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold'}}>Quét</Text>
      </Button>
    </ScrollView>
  );
};

export default AntivirusChecker;

const createStyles = () => {
  return StyleSheet.create({
    container: {marginTop: 24, padding: 16, paddingBottom: 16},
    title: {color: '#1D1D1B', fontWeight: '700', fontSize: 30, flex: 1},
    optionTitle: {flex: 1, fontSize: 18, fontWeight: 'bold'},
    optionSubtitle: {flex: 0.8, fontSize: 11, lineHeight: 20},
    optionBox: {marginHorizontal: 16, flex: 1},
    selection: {flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingLeft: 8},
    sync: {backgroundColor: '#29CCB1', color: '#FFFFFF', position: 'absolute', right: 0, borderRadius: 8},
  });
};
