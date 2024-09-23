import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets';
import {Divider} from 'react-native-paper';

import {useAppNavigation} from '../../navigation/AppNavigation';

const WebFilter: React.FC = () => {
  const styles = createStyles();
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#29CCB1" />
      </TouchableOpacity>
      <Image source={images.browser} resizeMode="contain" style={{height: 200, width: '100%'}} />

      <Text style={styles.title}>Lọc website</Text>
      <Text style={styles.description}>
        Để đảm bảo an toàn giữa các ứng dụng, bạn có thể sử dụng chức năng này để kiểm soát ứng dụng trên thiết bị của
        mình. Cho phép Kaspersky quét ứng dụng không an toàn, và theo dõi các ứng dụng có trong thiết bị của mình.
      </Text>
      <Divider style={{borderWidth: 0.25, marginVertical: 8}} />
    </View>
  );
};

export default WebFilter;

const createStyles = () => {
  return StyleSheet.create({
    container: {padding: 16},
    title: {fontSize: 30, fontWeight: 'bold', color: '#1D1D1B', marginVertical: 8},
    description: {color: '#1D1D1B', lineHeight: 23},
  });
};
