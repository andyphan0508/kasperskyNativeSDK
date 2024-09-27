import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppNavigation} from '../../../navigation/AppNavigation';

const AboutAntivirus = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          marginVertical: 8,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="#00A88E" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          color: '#1D1D1B',
          textAlign: 'center',
        }}>
        Về trình diệt virus
      </Text>
      <Text
        style={{
          color: '#1D1D1B',
          lineHeight: 23,
          marginHorizontal: 16,
          textAlign: 'justify',
        }}>
        Trình diệt virus này sẽ quét qua thiết bị của bạn, đồng thời sẽ kiểm tra
        xem có mã độc, đảm bảo thiết bị của bạn luôn được an toàn và bảo vệ toàn
        diện khỏi các mã độc hại.
      </Text>
    </View>
  );
};

export default AboutAntivirus;
