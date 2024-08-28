## KASPERSKY EASY SCANNER FOR REACT-NATIVE

_This modules is written as a bridge from the native module written in Java and port as an npm package_

To start using the code, install it as a package
`npm install react-native-kav-easyscanner` (**Note**: If the requirement of your npm package is stricted, I suggest adding `--force` to the installer: `npm install react-native-kav-easyscanner --force`)

## How to use it?

This package is using the Kaspersky Easy Scanner on your device. It should be noted that this module is natively written on Java.

Using callback / arrow asynchronize function to call the scanner as a result for usage

```
import kasperskyEasyScanner from 'react-native-kav-easyscanner';

  const onPress = async () => {
    try {
      const result = await kasperskyEasyScanner(scanType);
      setIsResult(result);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };
```

_These are the example of how to use the _
