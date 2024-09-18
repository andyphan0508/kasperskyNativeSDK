import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import VectorIcon, {
  IconType as VectorType,
  IconTypes,
} from './components/VectorIcon';
import Image, {
  Source as SourceRN,
  ResizeMode as ResizeModeRN,
} from './components/Image';

export type Source = SourceRN | number;
export type IconType = VectorType;
export type ResizeMode = ResizeModeRN;

export type IconProp = {
  //   source?: number | ImageURISource;
  source?: Source;
  type?: IconType | any;
  name?: string;
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: ResizeMode;
};

export interface IconProps extends IconProp {
  onPress?: () => void;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({
  source,
  type,
  name,
  size,
  color,
  containerStyle,
  resizeMode = 'contain',
  onPress,
  disabled,
}) => {
  // const { colors } = useTheme();
  const iconColor = color;
  if (!!type && !!name && IconTypes.includes(type)) {
    return (
      <VectorIcon
        type={type}
        name={name}
        color={color}
        size={size || 25}
        containerStyle={containerStyle}
        onPress={onPress}
        disabled={disabled}
      />
    );
  }

  if (!!source) {
    return (
      <Image
        source={source}
        color={iconColor}
        size={size}
        containerStyle={containerStyle}
        onPress={onPress}
        resizeMode={resizeMode}
        disabled={disabled}
      />
    );
  }

  return null;
};

export default React.memo(Icon);
