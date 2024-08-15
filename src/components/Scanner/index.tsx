import {StyleSheet, Text, View, NativeModules} from 'react-native';
import React from 'react';

const CheckRoot = () => {
  const {KasperskyRootSDK} = NativeModules;

  const onCheckRoot = () => {
    try {
      const response = KasperskyRootSDK?.onSdkInitialized();
      console.log('response', response);
      if (response?.isRooted) {
        return false;
      }
    } catch (error) {
      return false;
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: '#000000', fontWeight: '500', fontSize: 20}}>
        Check root
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1, color: '#000000', fontWeight: '500'}}>
          Check root by Kaspersky initalized
        </Text>
        <Text>{onCheckRoot() ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
};

export default CheckRoot;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
