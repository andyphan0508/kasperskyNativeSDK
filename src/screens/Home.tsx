import { View, Text, NativeModules } from 'react-native';
import React from 'react';
import CheckRoot from '../components/RootScanner';
import AntivirusChecker from '../components/AntivirusScanner';
import AppMonitor from '../components/AppMonitor';

const Home = () => {
  React.useEffect(() => {}, []);

  const checkRoot = async () => {
    try {
      const result = await NativeModules.RootChecker.isRooted();
      console.log('Root check result', result);
    } catch (error) {
      console.error(error);
    }
  };
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
      <AppMonitor />
    </View>
  );
};

export default Home;
