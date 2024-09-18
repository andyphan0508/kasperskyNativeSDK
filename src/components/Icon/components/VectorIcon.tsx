import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// import {useTheme} from '~/themes'

export type IconType =
  | 'antdesign'
  | 'entypo'
  | 'evilicon'
  | 'feather'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'fontisto'
  | 'foundation'
  | 'ionicon'
  | 'material'
  | 'material-community'
  | 'octicon'
  | 'simple-line'
  | 'zocial'
  | undefined;

export const IconTypes = [
  'antdesign',
  'entypo',
  'evilicon',
  'feather',
  'font-awesome',
  'font-awesome-5',
  'fontisto',
  'foundation',
  'ionicon',
  'material',
  'material-community',
  'octicon',
  'simple-line',
  'zocial',
];

const IconComponents = {
  antdesign: AntDesign,
  entypo: Entypo,
  evilicon: EvilIcons,
  feather: Feather,
  'font-awesome': FontAwesome,
  'font-awesome-5': FontAwesome5,
  fontisto: Fontisto,
  foundation: Foundation,
  ionicon: Ionicons,
  material: MaterialIcons,
  'material-community': MaterialCommunityIcons,
  octicon: Octicons,
  'simple-line': SimpleLineIcons,
  zocial: Zocial,
};

export interface IVectorIcon {
  type: IconType;
  name: string;
  color?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}

const VectorIcon: React.FC<IVectorIcon> = ({
  name,
  color,
  size,
  type,
  containerStyle,
  onPress,
  disabled,
}) => {
  // const { colors } = useTheme();
  const styles = createStyle();
  if (!!type && IconTypes.includes(type)) {
    const IconComponent = IconComponents[type];
    return (
      <TouchableOpacity onPress={onPress} disabled={!onPress || disabled}>
        <View style={[styles.container, containerStyle]}>
          <IconComponent
            name={name}
            color={color || colors.iconTint}
            size={size || 25}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

export default React.memo(VectorIcon);

const createStyle = () => {
  // const { spacing } = useTheme();
  return StyleSheet.create({
    container: { padding: 8 },
  });
};
