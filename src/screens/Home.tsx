import { View, Text, NativeModules } from 'react-native';
import React from 'react';
import CheckRoot from '../components/RootScanner';
import AntivirusChecker from '../components/AntivirusScanner';

const Home = () => {
  // console.log(KasperskyRootSDK?.onCreate());
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          color: 'navy',
          fontWeight: '500',
          padding: 8,
        }}>
        React Native SDK Test
      </Text>
      <CheckRoot />
      <AntivirusChecker />
    </View>
  );
};

export default Home;
