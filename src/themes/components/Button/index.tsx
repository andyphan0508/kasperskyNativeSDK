import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Icon, { IconProp } from '~/components/Icon';

import { useTheme } from '~/themesV2';
// import Touchable from './components/Touchable';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX | string;

const SizesBtn = { lg: 48, md: 36, sm: 26, xs: 20 };
const padding = { lg: 12, md: 8, sm: 6, xs: 4 };
const titleSizes = { lg: 20, md: 16, sm: 12, xs: 10 };

type Sizes = 'lg' | 'md' | 'sm' | 'xs';
type ColorSchemes = 'primary' | 'secondary' | 'tertiary' | Color;

export type Variants = 'solid' | 'outline' | 'link' | 'ghost';

export type TouchableProps = TouchableNativeFeedbackProps &
  TouchableOpacityProps;

export interface ButtonProps extends TouchableProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  size?: Sizes | number;
  colorScheme?: ColorSchemes;
  rounded?: boolean;
  disabled?: boolean;
  useI18n?: boolean;
  variant?: Variants;
  loading?: boolean;
  leftIcon?: IconProp | JSX.Element;
  rightIcon?: IconProp | JSX.Element;
  titleNumOfLines?: number;
  onPress?: (e: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  style,
  useI18n,
  title = '',
  titleStyle,
  colorScheme = 'primary',
  rounded = false,
  loading = false,
  disabled = false,
  variant = 'solid',
  size = 'md',
  leftIcon,
  rightIcon,
  titleNumOfLines,
  onPress = () => {},
  ...props
}) => {
  const { theme, colors } = useTheme();
  const { t } = useTranslation();
  const lightDark = ['primary', 'secondary'].includes(colorScheme)
    ? theme
    : lightOrDark(colorScheme);

  const backgroundColor = {
    solid: disabled
      ? colors.btnDisabled
      : colorScheme === 'primary'
      ? colors.btnBG
      : colorScheme === 'secondary'
      ? colors.secondary800
      : colorScheme,
    outline: colors.transparent,
    ghost: colors.transparent,
    link: colors.transparent,
  };

  const bgLightDark = lightOrDark(backgroundColor[variant]);
  const textColor = {
    solid: disabled
      ? colors.btnDisabledTitle
      : bgLightDark == 'dark'
      ? '#fff'
      : colors.text,
    outline: disabled
      ? colors.btnDisabledTitle
      : colorScheme === 'primary'
      ? lightDark == 'dark'
        ? colors.text
        : colors.btnBG
      : colorScheme === 'secondary'
      ? colors.secondary800
      : colorScheme,
    ghost: disabled
      ? colors.btnDisabledTitle
      : colorScheme === 'primary'
      ? lightDark == 'dark'
        ? colors.text
        : colors.btnBG
      : colorScheme === 'secondary'
      ? colors.secondary800
      : colorScheme,
    link: disabled
      ? colors.btnDisabledTitle
      : colorScheme === 'primary'
      ? lightDark == 'dark'
        ? colors.text
        : colors.btnBG
      : colorScheme === 'secondary'
      ? colors.secondary800
      : colorScheme,
  };
  const borderColor = {
    solid: colors.transparent,
    outline:
      colorScheme === 'primary'
        ? colors.btnBG
        : colorScheme === 'secondary'
        ? colors.secondary800
        : colorScheme,
    ghost: colors.transparent,
    link: colors.transparent,
  };

  const styles = createStyle(
    size,
    variant,
    backgroundColor[variant],
    textColor[variant],
    borderColor[variant],
    rounded,
  );

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[styles.container, style]}
      onPress={onPress}>
      {loading && (
        <View style={{ width: 20, height: 20, marginRight: 2 }}>
          <ActivityIndicator size="small" color={textColor[variant]} />
        </View>
      )}
      {!loading &&
        ((!!leftIcon?.type && !!leftIcon?.name) || !!leftIcon?.source) && (
          <View
            style={{
              marginRight: 2,
              width: titleSizes[size as keyof typeof titleSizes] + 4,
              height: titleSizes[size as keyof typeof titleSizes] + 4,
            }}>
            <Icon
              color={textColor[variant]}
              size={titleSizes[size as keyof typeof titleSizes] - 4}
              {...leftIcon}
            />
          </View>
        )}

      {!loading && React.isValidElement(leftIcon) ? (
        <View style={{ marginRight: 4 }}>{leftIcon}</View>
      ) : null}

      {title.length > 0 && (
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={titleNumOfLines}>
          {useI18n ? t(title) : title}
        </Text>
      )}
      {!loading &&
        ((!!rightIcon?.type && !!rightIcon?.name) || !!rightIcon?.source) && (
          <View style={{ width: 20, height: 20, marginLeft: 2 }}>
            <Icon
              color={textColor[variant]}
              size={typeof size === 'number' ? size * 0.36 : titleSizes[size]}
              {...rightIcon}
            />
          </View>
        )}
      {React.isValidElement(rightIcon) ? (
        <View style={{ width: 20, height: 20, marginRight: 4 }}>
          {rightIcon}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

function lightOrDark(color: string) {
  let _color: any = [];
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    _color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );

    r = parseInt(color[1], 10);
    g = parseInt(color[2], 10);
    b = parseInt(color[3], 10);
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    _color = +(
      '0x' + color.slice(1).replace(color.length < 5 ? /./g : 'false', '$&$&')
    );

    r = _color >> 16;
    g = (_color >> 8) & 255;
    b = _color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 160) {
    return 'light';
  } else {
    return 'dark';
  }
}

const createStyle = (
  size: string | number,
  variant: string,
  backgroundColor: string,
  color: string,
  borderColor: string,
  rounded: boolean,
) => {
  // const {spacing, colors} = useTheme()
  const _size = SizesBtn[size] || size;
  return StyleSheet.create({
    container: {
      height: _size,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: padding[size] || _size * 0.2,
      backgroundColor,
      borderColor,
      borderWidth: borderColor !== 'rgba(255,255,255,0)' ? 1 : 0,
      borderRadius: rounded ? _size * 0.5 : 4,
    },
    title: {
      color,
      fontSize: titleSizes[size] || _size * 0.36,
      marginHorizontal: 2,
      textDecorationLine: variant === 'link' ? 'underline' : 'none',
    },
  });
};

export default React.memo(Button);
