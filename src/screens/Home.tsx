import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {icons, images} from '../assets';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AppMonitor from '../components/AppMonitor';

import {Button, Icon} from 'react-native-paper';
import colors from '../themesV2/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {StackScreenProps} from '@react-navigation/stack';

// import { IconButton } from 'react-native-paper';

export type Type = 'monitor' | 'antivirus' | 'root' | 'filter';

const Home: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const styles = createStyles();

  const DATA = [
    {
      title: 'Thông tin',
      description: 'Thông tin về ứng dụng',
      type: 'information',
      onPress: () => navigation.navigate('About'),
    },
    {
      title: 'Theo dõi',
      description: 'Theo dõi trạng thái thiết bị',
      type: 'monitor',
      onPress: () => navigation.navigate('AppMonitor'),
    },
    {
      title: 'Quét virus',
      description: 'Tìm mã độc trong thiết bị',
      type: 'antivirus',
      onPress: () => navigation.navigate('Antivirus'),
    },
    {
      title: 'Kiểm tra Root',
      description: 'Kiểm tra máy có bị can thiệp',
      type: 'root',
      onPress: () => navigation.navigate('Root'),
    },
    {
      title: 'Lọc web',
      description: 'Lọc web độc hại khỏi thiết bị của bạn',
      type: 'filter',
      onPress: () => Alert.alert('Coming soon'),
    },
  ];

  const renderItem = (
    title?: string,
    description?: string,
    type?: Type,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.selection}>
        {type === 'information' ? (
          <MaterialIcons name="info" size={30} color="black" />
        ) : type === 'monitor' ? (
          <MaterialIcons name="monitor-heart" color="black" size={30} />
        ) : type === 'antivirus' ? (
          <MaterialIcons name="bug-report" color="black" size={30} />
        ) : type === 'root' ? (
          <MaterialIcons name="security" color="black" size={30} />
        ) : (
          <MaterialIcons name="webhook" color="black" size={30} />
        )}
        <Text style={styles.title}>{title}</Text>

        <Text style={{fontSize: 12, color: 'black'}}>{description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        flexWrap: 'wrap',
      }}>
      <Image source={images.header} style={styles.title1} />
      <View>
        <Text style={styles.textDevice}>Thiết bị của bạn</Text>
        <Text
          style={{
            fontSize: 28,
            alignSelf: 'center',
            color: '#FF335C',
            fontWeight: '800',
            paddingBottom: 8,
          }}>
          CHƯA ĐƯỢC BẢO MẬT
        </Text>
        <View>
          <Button
            style={{
              backgroundColor: colors.light.background,
              alignSelf: 'center',
              width: 150,
              marginBottom: 24,
            }}>
            <Text style={{color: '#FF335C'}}>Tìm hiểu thêm</Text>
          </Button>
        </View>
      </View>
      <View style={styles.wrapMenu}>
        <Text style={styles.quickAction}>Hành động</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
            data={DATA}
            renderItem={({item}) =>
              renderItem(item.title, item.description, item?.type, item.onPress)
            }
            ItemSeparatorComponent={() => (
              <View style={{width: 0.5, backgroundColor: '#FFFFFF'}} />
            )}
            numColumns={2}
          />
        </View>
      </View>
      <Text
        style={{
          padding: 8,
          alignItems: 'flex-end',
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        Kaspersky | VTC Telecom, 2024
      </Text>
    </View>
  );
};

export default Home;

const createStyles = () => {
  return StyleSheet.create({
    menu: {
      flexWrap: 'wrap',
      borderWidth: 1,
      width: 60,
      height: 60,
      justifyContent: 'center',
      gap: 8,
      padding: 4,
      marginVertical: 4,
      borderRadius: 8,
      alignItems: 'center',
    },
    title1: {
      width: '80%',
      height: 80,
      alignItems: 'center',
      alignSelf: 'center',
    },
    wrapMenu: {
      backgroundColor: '#29CCB1',
      width: '100%',
      flex: 1,
      paddingTop: 8,
    },
    textDevice: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'black',
      fontWeight: '400',
      padding: 8,
    },
    selection: {
      backgroundColor: 'white',
      marginVertical: 8,
      marginHorizontal: 8,
      padding: 8,
      width: 180,
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.25,
      borderRadius: 8,
    },
    title: {fontSize: 15, marginTop: 4, fontWeight: '500', color: 'black'},
    quickAction: {
      paddingHorizontal: 16,
      paddingTop: 8,
      fontSize: 18,
      color: '#000000',
      fontWeight: '700',
    },
  });
};
