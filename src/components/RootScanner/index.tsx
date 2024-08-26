import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

import kasperskyRootCheck from 'react-native-root-module';

const CheckRoot = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRooted, setIsRooted] = React.useState(false);

  const onPress = async () => {
    try {
      setIsLoading(true);
      const isRooted = await kasperskyRootCheck();
      setIsRooted(isRooted);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#000000', fontWeight: '500', fontSize: 20 }}>
        Check root
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, color: '#000000', fontWeight: '500' }}>
          Check root by Kaspersky
        </Text>
        <View>
          <Button title="Press here to scan" onPress={onPress} />
          {isLoading ? (
            <View>
              <Text>Loading</Text>
            </View>
          ) : (
            <View>
              <Text>
                {isRooted === true
                  ? 'This device is rooted'
                  : 'This device is not rooted'}
              </Text>
            </View>
          )}
        </View>
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
