import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Switch, Text } from 'react-native-paper';

import kasperskyRootCheck from 'react-native-root-module';

const CheckRoot: React.FC<any> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRooted, setIsRooted] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);

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

  const onPressEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text
          style={{
            color: '#000000',
            fontWeight: '500',
            fontSize: 20,
            flex: 1,
          }}>
          Check root
        </Text>
        <Switch onChange={onPressEnabled} value={isEnabled} />
      </View>
      {isEnabled && (
        <View
          style={{
            borderWidth: 1,
            padding: 8,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                color: '#000000',
                fontWeight: '500',
                fontSize: 15,
              }}>
              Check root by Kaspersky
            </Text>
            <View>
              <Button
                onPress={onPress}
                style={{ backgroundColor: 'lightgray' }}>
                Press here to scan
              </Button>
            </View>
          </View>
          <View>
            {isLoading ? (
              <View>
                <Text>Loading</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Text>Status: </Text>
                <Text>
                  {isRooted === true
                    ? 'This device is rooted'
                    : 'This device is not rooted'}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default CheckRoot;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
