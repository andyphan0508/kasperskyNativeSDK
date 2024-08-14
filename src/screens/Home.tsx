import {View, Text, NativeModules} from 'react-native';
import React from 'react';

const Home = () => {
  const {KasperskyRootSDK, KasperskyScannerSDK} = NativeModules;

  console.log(KasperskyRootSDK.onCreate());
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
