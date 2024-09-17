/* Declare Dimensions */
import {
  Dimensions,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const STATUSBAR_DEFAULT_HEIGHT = 20
const STATUSBAR_X_HEIGHT = 40
const STATUSBAR_IP12_HEIGHT = 43
const STATUSBAR_IP12MAX_HEIGHT = 43

const X_WIDTH = 375
const X_HEIGHT = 812

const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const IP12_WIDTH = 390
const IP12_HEIGHT = 844

const IP12MAX_WIDTH = 428
const IP12MAX_HEIGHT = 926

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window')

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT
let isIPhoneX_v = false
let isIPhoneXMax_v = false
let isIPhone12_v = false
let isIPhone12Max_v = false
let isIPhoneWithMonobrow_v = false

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhoneX_v = true
    statusBarHeight = STATUSBAR_X_HEIGHT
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhoneXMax_v = true
    statusBarHeight = STATUSBAR_X_HEIGHT
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhone12_v = true
    statusBarHeight = STATUSBAR_IP12_HEIGHT
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true
    isIPhone12Max_v = true
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT
  }
}

export const isIPhoneX = () => isIPhoneX_v
export const isIPhoneXMax = () => isIPhoneXMax_v
export const isIPhone12 = () => isIPhone12_v
export const isIPhone12Max = () => isIPhone12Max_v
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v

export function getStatusBarHeight(skipAndroid: boolean | undefined) {
  return Platform.select({
    ios: statusBarHeight,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  })
}

export const checkIphone = () => {
  const IS_IPHONE =
    isIPhoneX() || isIPhoneXMax() || isIPhone12() || isIPhone12Max()
  return IS_IPHONE
}

export const checkIphoneXII = () => {
  const IS_IPHONE_XII = isIPhone12_v || isIPhone12Max_v
  return IS_IPHONE_XII
}

const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height

// Cover image ratio -> 25:11
export const scaleCoverHeight = (
  ratio1 = 9,
  ratio2 = 16,
  widthSize = DeviceWidth,
) => widthSize * (ratio1 / ratio2)

export const scaleCoverWidth = (ratio = 1, widthSize = DeviceWidth) =>
  widthSize * ratio

/* Size config used for Text */
export const sizes: sizesType = {
  heading: 32,
  subHeading: 20,
  title: 16,
  subTitle: 14,
  subTitleSB: 14,
  subTitleM: 14,
  body: 14,
  bodyB: 16,
  bodySB: 16,
  bodyM: 16,
  highlight: 16,
  link: 16,
  footnote: 12,
  bodySM: 14,
  header: 20,
  superHeader: 24,
  small: 10,
  codeField: 24,
  medium: 12,
  button: 16,
  buttonSmall: 14,
  input: 16,
}

export type sizesType = {
  heading: 32
  subHeading: 20
  title: 16
  subTitle: 14
  subTitleSB: 14
  subTitleM: 14
  body: 14
  bodyB: 16
  bodySB: 16
  bodyM: 16
  highlight: 16
  link: 16
  footnote: 12
  bodySM: 14
  header: 20
  superHeader: 24
  small: 10
  codeField: 24
  medium: 12
  button: 16
  buttonSmall: 14
  input: 16
}

/* Line Height used for Text */
export const lineHeights = {
  heading: 42,
  subHeading: 32,
  title: 21,
  subTitle: 19,
  subTitleSB: 19,
  subTitleM: 19,
  body: 24,
  bodyB: 24,
  bodySB: 24,
  bodyM: 24,
  highlight: 21,
  link: 21,
  small: 13,
}

export const letterSpacing = {
  heading: 0,
  subHeading: 0,
  title: 0,
  subTitle: 0,
  subTitleSB: 0,
  subTitleM: 0,
  body: 0,
  bodyB: 0,
  bodySB: 0,
  bodyM: 0,
  highlight: 0,
  link: 0,
}

/* Device Dimensions */
export const deviceDimensions = {
  phone: 375,
  smallTablet: 600,
  bigTablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopBigger: 1440,
  totalCols: 10,
  leftCol: 3,
  centerAndRightCol: 7,
}

export type IAvatarSize =
  | 'SubTiny'
  | 'Tiny'
  | 'Small'
  | 'SubBase'
  | 'Base'
  | 'Medium'
  | 'ExtraMedium'
  | 'SubLarge'
  | 'Large'
  | 'ExtraLarge'
  | 'SuperLarge'
  | 'Big'

export type IAvatar = Record<IAvatarSize, number>

export const avatarSizes: IAvatar = {
  SubTiny: 16,
  Tiny: 24,
  Small: 32,
  SubBase: 40,
  Base: 48,
  Medium: 52,
  ExtraMedium: 56,
  SubLarge: 64,
  Large: 80,
  ExtraLarge: 85,
  SuperLarge: 90,
  Big: 200,
}

export const headerHeight = 60
export const bottomBarHeight = 64

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const isWeb = Platform.OS === 'web'

export const resizeImage = (
  h: number = 0,
  w: number = 0,
  mw: number = DeviceHeight,
) => {
  if (w > 0 && h > 0) {
    return (mw * h) / w
  }
  return DeviceWidth * 0.5625 * 0.7
}

export interface ScaledSize {
  width: number
  height: number
  scale: number
  fontScale: number
}

export interface Insets {
  top: number
  bottom: number
  left: number
  right: number
}

export interface IDimension {
  isIPhoneX: () => boolean
  isIPhoneXMax: () => boolean
  isIPhone12: () => boolean
  isIPhone12Max: () => boolean
  isIPhoneWithMonobrow: () => boolean
  getStatusBarHeight: (skipAndroid?: boolean) => number
  checkIphone: () => boolean
  checkIphoneXII: () => boolean
  deviceWidth: number
  deviceHeight: number
  scaleCoverHeight: (
    ratio1?: number,
    ratio2?: number,
    widthSize?: number,
  ) => number
  scaleCoverWidth: (ratio?: number, widthSize?: number) => number
  sizes: sizesType
  lineHeights: {[key: string]: number}
  letterSpacing: {[key: string]: number}
  avatarSizes: IAvatar
  headerHeight: number
  bottomBarHeight: number
  isAndroid: boolean
  isIphone: boolean
  isWeb: boolean
  useSafeAreaInsets: () => Insets
  useWindowDimensions: () => ScaledSize
  resizeImage: (h: number, w: number, mw: number) => number
}

export default {
  isIPhoneX,
  isIPhoneXMax,
  isIPhone12,
  isIPhone12Max,
  isIPhoneWithMonobrow,
  getStatusBarHeight,
  checkIphone,
  checkIphoneXII,
  deviceWidth: DeviceWidth,
  deviceHeight: DeviceHeight,
  scaleCoverHeight,
  scaleCoverWidth,
  sizes,
  lineHeights,
  letterSpacing,
  deviceDimensions,
  avatarSizes,
  headerHeight,
  bottomBarHeight,
  isAndroid,
  isIphone,
  isWeb,
  useSafeAreaInsets,
  useWindowDimensions,
  resizeImage,
}
