import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

import kasperskyEasyScanner from 'react-native-kav-easyscanner';

const AntivirusChecker = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResult, setIsResult] = React.useState<any>();

  const onPress = async () => {
    try {
      setIsLoading(true);
      const result = await kasperskyEasyScanner();
      //   setIsRooted(isRooted);

      setIsResult(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(isResult?.map?.((item: string) => item));

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
        </View>
      </View>
      {isLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          {isResult?.map?.((item: string) => (
            <View>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AntivirusChecker;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
