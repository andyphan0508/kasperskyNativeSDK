import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { images } from '../assets';
import { Icon } from 'react-native-paper';
import { SheetManager } from 'react-native-actions-sheet';
import AppMonitor from '../components/AppMonitor';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const Home = () => {
  const styles = createStyles();
  const renderItem = (
    title?: string,
    description?: string,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.menu}>
        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 15, color: 'black' }}>{description}</Text>
        {/* <Icon source="right" size={20} color="black" /> */}
      </TouchableOpacity>
    );
  };

  const onPress = () => {
    return <View></View>;
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Image
        source={images.header}
        style={{
          width: '80%',
          height: 80,
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontSize: 25,
          alignSelf: 'center',
          color: 'navy',
          fontWeight: '800',
          padding: 8,
        }}>
        Kaspersky | VTC Mobile Security
      </Text>
      <View style={{ padding: 8 }}>
        {renderItem('App Monitor', 'Check your app security', onPress)}
        {renderItem('Antivirus Scanner', 'Scan your device', () => {})}
        {renderItem('Root Scanner', 'Check your device root')}
      </View>
    </View>
  );
};

export default Home;

const createStyles = () => {
  return StyleSheet.create({
    menu: {
      flexWrap: 'wrap',
      borderWidth: 1,
      padding: 8,
      marginVertical: 8,
      borderRadius: 8,
    },
  });
};
