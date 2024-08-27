import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Divider, Text } from 'react-native-paper';
import { Button, RadioButton } from 'react-native-paper';
import kasperskyEasyScanner from 'react-native-kav-easyscanner';
import { ScanType } from 'react-native-kav-easyscanner/src/interface';

const AntivirusChecker: React.FC<any> = () => {
  const styles = createStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResult, setIsResult] = React.useState<any>();
  const [scanType, setScanType] = React.useState<ScanType>('Basic');
  const [error, setError] = React.useState<boolean>(false);

  const onPress = async () => {
    try {
      if (scanType === undefined) {
        setError(true);
        return;
      }

      setError(false);
      setIsLoading(true);
      const result = await kasperskyEasyScanner(scanType);

      setIsResult(result);

      setIsLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const onPressButton = (value: string) => (text: string) => {
    setScanType(([text] = value));
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#000000', fontWeight: '500', fontSize: 20 }}>
        Antivirus Scanner
      </Text>
      <Text style={{ color: '#000000' }}>
        This is the antivirus scanner for your device: It will scan your device
        for any malicious software.
      </Text>
      <Divider style={{ backgroundColor: '#0000', padding: 8 }} bold />
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Scan type</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="Basic"
            onPress={() => onPressButton('Recommended')}
            status="checked"
          />
          <Text>Basic</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="Full" />
          <Text>Full</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="Recommended" />
          <Text>Recommended</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="Light" />
          <Text>Light</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="LightPlus" />
          <Text>LightPlus</Text>
        </View>
      </View>
      {error && (
        <View>
          <Text
            style={{ color: 'red', paddingHorizontal: 8, paddingBottom: 8 }}>
            Please choose the mode before continue
          </Text>
        </View>
      )}
      <Button onPress={onPress} style={{ backgroundColor: 'lightgray' }}>
        Press here to scan
      </Button>

      {isLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          <Text>{isResult}</Text>
        </View>
      )}
    </View>
  );
};

export default AntivirusChecker;

const createStyles = () => {
  return StyleSheet.create({
    container: {
      padding: 8,
    },
  });
};
