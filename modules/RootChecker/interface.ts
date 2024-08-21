import { NativeModulesStatic } from 'react-native';

export interface RootChecker {
  KasperskyRootSDK: NativeModulesStatic & {
    /** @function onCreate This function need to be firstly done for the SDK to initialize  */
    onCreate(): void;

    /** @function onSdkInitialize This function is to initialize the SDK */
    onSdkInitialize(): void;
  };
}
