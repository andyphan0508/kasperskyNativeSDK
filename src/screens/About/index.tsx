import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {images} from '../../assets';

const About: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#29CCB1" />
      </TouchableOpacity>
      <Image source={images.kasperskyLogo} resizeMode="contain" style={{height: 60, width: 'auto', marginTop: 16}} />
      <Image source={images.vtcLogo} resizeMode="contain" style={{height: 80, width: 'auto', marginTop: 16}} />
      <Text style={{color: '#1D1D1B', fontWeight: '600', fontSize: 15, textAlign: 'center', marginVertical: 8}}>
        Phiên bản: 0.1 (alpha)
      </Text>
      <Text style={styles.description}>
        Đây là một phần mềm diệt virus dựa trên nhân của Kaspersky và được tạo bởi đội ngũ VTC Telecom với mục đích mang
        lại sự tiện lợi cho người dùng, và an toàn trong thế giới mạng. Đây sẽ là bộ scan dữ liệu có ở trong máy và báo
        cáo cho người dùng biết về tình trạng của máy, kiểm tra quyền truy cập root, lọc dữ liệu người dùng truy cập
        trên web và ngăn chặn những trang web độc hại. Để biết thêm về dịch vụ và có những câu hỏi khác, vui lòng liên
        hệ với chúng tôi qua VTC Telecommunications.
      </Text>
      <Text style={{position: 'absolute', bottom: 0, padding: 8}}>2024 Kaspersky | VTC Telecom</Text>
    </View>
  );
};

export default About;

const createStyles = () => {
  const {top, bottom} = useSafeAreaInsets();
  return StyleSheet.create({
    container: {flex: 1, paddingTop: Math.max(top, 16), paddingHorizontal: 16, paddingBottom: Math.max(bottom, 16)},
    description: {fontSize: 15, color: '#1D1D1B', lineHeight: 20},
  });
};
