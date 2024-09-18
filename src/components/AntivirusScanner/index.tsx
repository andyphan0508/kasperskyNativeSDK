import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Divider, Switch, Text} from 'react-native-paper';
import {Button, RadioButton} from 'react-native-paper';
import kasperskyEasyScanner from 'react-native-kav-easyscanner';
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

  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isEnabled) {
      setIsResult(undefined);
    }
  }, [isEnabled]);

  const onPress = async () => {
    try {
      if (scanType === undefined) {
        setError(true);
        return;
      }
      console.log('scan');
      setError(false);
      setIsLoading(true);
      const result = await kasperskyEasyScanner(scanType);

      setIsResult(result);

      setIsLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const onSelectScanType = (value: string) => {
    setScanType(value as ScanType);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#00A88E" />
      </TouchableOpacity>
      <Image
        source={images.virus_scan}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
      />
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#1D1D1B',
            fontWeight: '700',
            fontSize: 30,
            flex: 1,
          }}>
          Diệt virus
        </Text>
      </View>
      {!isResult && !isLoading ? (
        <Text style={{color: '#1D1D1B', lineHeight: 23}}>
          Trình diệt virus này sẽ quét qua thiết bị của bạn, đồng thời sẽ kiểm
          tra xem có mã độc có trong thiết bị hay không. Đảm bảo thiết bị của
          bạn luôn được an toàn và bảo vệ toàn diện khỏi các mã độc hại.
        </Text>
      ) : !isResult && isLoading ? (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicator size="large" color="#00A88E" />
          <Text style={{color: '#1D1D1B', lineHeight: 23}}>Đang quét...</Text>
        </View>
      ) : (
        <Text>
          {!!isResult &&
            typeof isResult === 'string' &&
            isResult.split(',').join('\n')}
        </Text>
      )}

      <View style={{marginVertical: 8}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Các loại quét</Text>
        <Divider style={{borderWidth: 0.25, opacity: 0.5, marginVertical: 8}} />

        <TouchableOpacity
          onPress={() => onSelectScanType('Basic')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="cloud" size={30} color="#00A88E" />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>
              Cơ bản
            </Text>
            <Text style={{flex: 1, fontSize: 12, lineHeight: 20}}>
              Đây là chức năng cơ bản nhất, dùng bộ scan từ hệt thống đám mây
              KSN của Kaspersky
            </Text>
          </View>
          {scanType === 'Basic' && <Ionicons name="checkmark" size={30} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Light')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="lightning-bolt-circle"
            size={30}
            color="#00A88E"
          />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>
              Quét nhanh
            </Text>
            <Text style={{flex: 1, fontSize: 12, lineHeight: 20}}>
              Đây là chức năng cơ bản được thêm một vài tính năng nâng cao dùng
              bộ đám mây KSN
            </Text>
          </View>
          {scanType === 'Light' && <Ionicons name="checkmark" size={30} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('LightPlus')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="add-circle" size={30} color="#00A88E" />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>
              Quét nhanh (nâng cao)
            </Text>
            <Text style={{flex: 1, fontSize: 12, lineHeight: 20}}>
              Đây là chức năng cơ bản được thêm một vài tính năng nâng cao dùng
              bộ đám mây KSN
            </Text>
          </View>
          {scanType === 'LightPlus' && <Ionicons name="checkmark" size={30} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Recommended')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="thumbs-up-sharp" size={30} color="#00A88E" />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>
              Khuyên dùng
            </Text>
            <Text style={{flex: 1, fontSize: 12, lineHeight: 20}}>
              Đây là chức năng cơ bản được thêm một vài tính năng nâng cao dùng
              bộ đám mây KSN
            </Text>
          </View>
          {scanType === 'Recommended' && (
            <Ionicons name="checkmark" size={30} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectScanType('Full')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="shield-checkmark" size={30} color="#00A88E" />
          <View style={{marginHorizontal: 16, flex: 1}}>
            <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>
              Toàn bộ
            </Text>
            <Text style={{flex: 1, fontSize: 12, lineHeight: 20}}>
              Trọn bộ tính năng có của Kaspersky, cùng với bộ đám mây KSN. Cho
              phép có thể quét toàn bộ dữ liệu trong thiết bị và kèm cả thẻ nhớ
              bên ngoài.
            </Text>
          </View>
          {scanType === 'Full' && <Ionicons name="checkmark" size={30} />}
        </TouchableOpacity>
      </View>

      <Button
        onPress={onPress}
        style={{backgroundColor: '#29CCB1', paddingBottom: 8}}>
        <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold'}}>
          Quét
        </Text>
      </Button>
    </ScrollView>
  );
};

export default AntivirusChecker;

const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: 24,
      padding: 16,
      paddingBottom: 16,
    },
  });
};
