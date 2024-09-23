import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert} from 'react-native';
import React from 'react';
import {images} from '../assets';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../themes/colors/colors';

// import { IconButton } from 'react-native-paper';

export enum Type {
  information = 'information',
  monitor = 'monitor',
  antivirus = 'antivirus',
  root = 'root',
  filter = 'filter',
}

interface DataInterface {
  title: string;
  description: string;
  type: Type;
  onPress: () => void;
}

const Home: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const styles = createStyles();

  const DATA: DataInterface[] = [
    {
      title: 'Thông tin',
      description: 'Thông tin về ứng dụng',
      type: Type.information,
      onPress: () => navigation.navigate('About'),
    },
    {
      title: 'Theo dõi',
      description: 'Theo dõi trạng thái thiết bị',
      type: Type.monitor,
      onPress: () => navigation.navigate('AppMonitor'),
    },
    {
      title: 'Quét virus',
      description: 'Tìm mã độc trong thiết bị',
      type: Type.antivirus,
      onPress: () => navigation.navigate('Antivirus'),
    },
    {
      title: 'Kiểm tra Root',
      description: 'Kiểm tra máy có bị can thiệp',
      type: Type.root,
      onPress: () => navigation.navigate('Root'),
    },
    {
      title: 'Lọc web',
      description: 'Lọc web độc hại khỏi thiết bị của bạn',
      type: Type.filter,
      onPress: () => navigation.navigate('Filter'),
    },
  ];

  const renderIcon = (name: Type) => {
    switch (name) {
      case Type.information:
        return <MaterialIcons name="info" size={30} color="black" />;
      case Type.monitor:
        return <MaterialIcons name="monitor-heart" color="black" size={30} />;
      case Type.antivirus:
        return <MaterialIcons name="bug-report" color="black" size={30} />;
      case Type.root:
        return <MaterialIcons name="security" color="black" size={30} />;
      case Type.filter:
        return <MaterialIcons name="webhook" color="black" size={30} />;
    }
  };

  const renderItem = (title?: string, description?: string, type?: Type, onPress?: () => void) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.selection}>
        {renderIcon(type as Type)}
        <Text style={styles.title}>{title}</Text>
        <Text style={{fontSize: 12, color: 'black'}}>{description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1, flexWrap: 'wrap'}}>
      <Image source={images.header} style={styles.title1} />
      <View>
        <Image source={images.shield} style={{alignSelf: 'center', height: 130, width: 130, marginTop: 16}} />
        <Text style={styles.textDevice}>Hãy bắt đầu</Text>
        <Text style={styles.headerTitle}>BẢO MẬT THIẾT BỊ CỦA BẠN</Text>
      </View>
      <LinearGradient colors={[colors.dark.primary, colors.dark.primary1]} style={styles.wrapMenu}>
        <Text style={styles.quickAction}>Hành động</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
            data={DATA}
            renderItem={({item}) => renderItem(item.title, item.description, item.type, item.onPress)}
            numColumns={2}
          />
        </View>
      </LinearGradient>
      <Text style={styles.footer}>Kaspersky | VTC Telecom, 2024</Text>
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
    title1: {width: '80%', height: 80, alignItems: 'center', alignSelf: 'center'},
    wrapMenu: {backgroundColor: '#29CCB1', width: '100%', flex: 1, paddingTop: 8},
    textDevice: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'black',
      fontWeight: '400',
      padding: 8,
    },
    selection: {
      backgroundColor: 'white',
      marginTop: 8,
      marginHorizontal: 4,
      padding: 8,
      width: 180,
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.25,
      borderRadius: 8,
    },
    title: {fontSize: 15, marginTop: 4, fontWeight: '500', color: 'black'},
    quickAction: {paddingHorizontal: 16, paddingTop: 8, fontSize: 18, color: colors.dark.secondary4, fontWeight: '700'},
    headerTitle: {
      fontSize: 28,
      alignSelf: 'center',
      color: '#29CCB1',
      textAlign: 'center',
      fontWeight: '800',
      paddingBottom: 8,
      width: 250,
    },
    footer: {padding: 8, alignItems: 'flex-end', alignSelf: 'center', justifyContent: 'flex-end'},
  });
};
