import React from 'react';

import {
  Image as RNImage,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  ResizeMode as ResizeModeRN,
  Source as SourceRN,
} from 'react-native-fast-image';

// import {useTheme} from '~/themes'

export type Source = SourceRN;
export type ResizeMode = ResizeModeRN;

export interface IconImageProps {
  //   source?: number | ImageURISource;
  source: Source | number;
  color?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: ResizeMode;
  onPress?: () => void;
  disabled?: boolean;
}

const Icons: React.FC<IconImageProps> = ({
  color,
  size = 25,
  containerStyle,
  resizeMode = 'contain',
  source,
  onPress,
  disabled,
}) => {
  // const { colors } = useTheme();
  const styles = createStyle(size);
  const iconColor = color;

  if (typeof source === 'number') {
    return (
      <TouchableOpacity onPress={onPress} disabled={!onPress || disabled}>
        <View style={[styles.container, containerStyle]}>
          <RNImage
            tintColor={iconColor}
            source={source}
            resizeMode={resizeMode}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress || disabled}>
      <View style={[styles.container, containerStyle]}>
        <FastImage
          tintColor={iconColor}
          source={source}
          resizeMode={resizeMode}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Icons);

const createStyle = (size: number) => {
  return StyleSheet.create({
    container: {},
    image: {width: size, height: size},
  });
};
