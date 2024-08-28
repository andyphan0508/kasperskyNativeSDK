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

  const onSelectScanType = (value: string) => {
    setScanType(value as ScanType);
  };

  console.log('scanType', scanType);
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
            onPress={() => onSelectScanType('Basic')}
            status={scanType === 'Basic' ? 'checked' : 'unchecked'}
          />
          <Text>Basic</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="Full"
            onPress={() => onSelectScanType('Full')}
            status={scanType === 'Full' ? 'checked' : 'unchecked'}
          />
          <Text>Full</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="Recommended"
            onPress={() => onSelectScanType('Recommended')}
            status={scanType === 'Recommended' ? 'checked' : 'unchecked'}
          />
          <Text>Recommended</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="Light"
            onPress={() => onSelectScanType('Light')}
            status={scanType === 'Light' ? 'checked' : 'unchecked'}
          />
          <Text>Light</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value="LightPlus"
            onPress={() => onSelectScanType('LightPlus')}
            status={scanType === 'LightPlus' ? 'checked' : 'unchecked'}
          />
          <Text>LightPlus</Text>
        </View>
        <Text style={{ padding: 8, fontSize: 20 }}>{`Mode: ${scanType}`}</Text>
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
