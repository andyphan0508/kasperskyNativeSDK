import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Button, Divider, Switch, Text} from 'react-native-paper';

import kasperskyRootCheck from 'react-native-root-module';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets';
import {StackScreenProps} from '@react-navigation/stack';
import {useAppNavigation} from '../../navigation/AppNavigation';

const CheckRoot: React.FC<any> = ({root}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRooted, setIsRooted] = React.useState(undefined);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const navigation = useAppNavigation();

  const onPress = async () => {
    try {
      setIsLoading(true);
      const isRooted: any = await kasperskyRootCheck();
      setIsRooted(isRooted);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#29CCB1" />
      </TouchableOpacity>
      <Image
        source={images.binary_code}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
      />

      <Text
        style={{
          color: '#1D1D1B',
          fontWeight: '700',
          fontSize: 30,
        }}>
        Kiểm tra quyền root
      </Text>
      <Text
        style={{
          color: '#1D1D1B',
          lineHeight: 20,
          fontSize: 15,
          marginVertical: 8,
        }}>
        Các thiết bị nếu bị phá quyền root, cho phép các tài nguyên trong máy có
        quyền truy cập, thiết bị sẽ dễ dàng bị tấn công bởi tất cả các yếu tố
        bên ngoài, tiết lộ các tệp tin của hệ thống và làm cho thiết bị dễ bị
        nhiễm virus
      </Text>
      <Divider style={{borderWidth: 0.25}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        {isLoading ? (
          <ActivityIndicator size={'large'} style={{width: 100}} />
        ) : (
          <Image
            source={
              isRooted === undefined
                ? images.device_unknown
                : isRooted
                ? images.device_unsecure
                : images.device_secure
            }
            style={{height: 100, width: 100}}
          />
        )}
        <View style={{justifyContent: 'center', flex: 1}}>
          {isRooted === undefined ? (
            <>
              <Text style={{fontSize: 20, color: '#000000', fontWeight: '700'}}>
                Test thiết bị
              </Text>
              <Text
                style={{
                  color: '#000000',
                }}>
                Để có thể đảm bảo an toàn cho thiết bị của bạn, hãy để chúng tôi
                quét qua dữ liệu máy một lần để xác định thiết bị của bạn có bị
                can thiệp hay chưa?
              </Text>
            </>
          ) : isRooted === false ? (
            <>
              <Text style={{fontSize: 20, color: '#29CCB1', fontWeight: '700'}}>
                Chúc mừng
              </Text>
              <Text
                style={{
                  color: '#1D1D1B',
                }}>
                Thiết bị của bạn hiện tại không bị can thiệp, bạn có thể sử dụng
                thiết bị một cách an toàn.
              </Text>
            </>
          ) : (
            <>
              <Text style={{fontSize: 20, color: '#FF335C', fontWeight: '700'}}>
                Cảnh báo
              </Text>
              <Text
                style={{
                  color: '#1D1D1B',
                }}>
                Thiết bị của bạn hiện tại đang bị can thiệp, hãy kiểm tra lại để
                đảm bảo an toàn cho thiết bị của bạn.
              </Text>
            </>
          )}
        </View>
      </View>
      <Button
        onPress={onPress}
        style={{backgroundColor: '#29CCB1', borderRadius: 8}}>
        Nhấn để kiểm tra
      </Button>
    </View>
  );
};

export default React.memo(CheckRoot);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
