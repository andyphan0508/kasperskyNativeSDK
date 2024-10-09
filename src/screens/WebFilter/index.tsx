import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets';
import {Button, Divider} from 'react-native-paper';

import {useAppNavigation} from '../../navigation/AppNavigation';

import {activateFilter, updateDatabase} from 'react-native-web-filter';
import colors from '../../themes/colors/colors';

const WebFilter: React.FC = () => {
  const styles = createStyles();
  const navigation = useAppNavigation();

  /** This function will update the database of the Anti-virus */
  const onUpdateDatabase = async () => {
    try {
      const resp = await updateDatabase();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = async () => {
    try {
      const resp = await activateFilter();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="#29CCB1" />
      </TouchableOpacity>
      <Image
        source={images.browser}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
      />

      <Text style={styles.title}>Lọc website</Text>
      <Text style={styles.description}>
        Nguồn thông tin trên mạng rất đa dạng, không phải thông tin nào cũng
        đáng tin cậy. Để có thể đảm bảo được thông tin chính xác, bạn cần lọc
        thông tin từ các trang web đáng tin cậy.
      </Text>
      <Divider style={{borderWidth: 0.25, marginVertical: 8}} />

      <Button
        onPress={onPress}
        style={{backgroundColor: colors.dark.secondary1}}>
        <Text style={{color: 'white', fontWeight: '700'}}>Lọc website</Text>
      </Button>
    </View>
  );
};

export default WebFilter;

const createStyles = () => {
  return StyleSheet.create({
    container: {padding: 16},
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#1D1D1B',
      marginVertical: 8,
    },
    description: {color: '#1D1D1B', lineHeight: 23},
  });
};
