import React from 'react'
import {View, Animated, Easing, TouchableWithoutFeedback, TouchableNativeFeedbackProps, TouchableOpacityProps, StyleSheet} from 'react-native'

const radius = 10

type TouchableProps = TouchableNativeFeedbackProps & TouchableOpacityProps

interface RippleEffectProps extends TouchableProps {
  disabled?: boolean
  rippleOpacity?: number
  rippleDuration?: number
  rippleSize?: number
  rippleContainerBorderRadius?: number
  rippleCentered?: boolean
  rippleFades?: boolean
  rippleColor?: string
  onPress?: (e: any) => void
  onPressIn?: (e: any) => void
  onPressOut?: (e: any) => void
  onLongPress?: (e: any) => void
  onLayout?: (e: any) => void
  onRippleAnimation?: () => void
  children?: React.ReactElement
}

const Touchable: React.FC<RippleEffectProps> = ({
  children,
  disabled,
  rippleColor = 'rgb(0, 0, 0)',
  rippleOpacity = 0.3,
  rippleDuration = 500,
  rippleSize = 0,
  rippleContainerBorderRadius = 0,
  rippleCentered = false,
  rippleFades = true,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  onLayout,
  onRippleAnimation
}) => {
  const position = React.useRef(new Animated.ValueXY()).current
  const scale = React.useRef(new Animated.Value(0.5 / radius)).current
  const anim = React.useRef(new Animated.Value(0)).current
  const size = React.useRef({width: 0, height: 0})

  const handlePress = (event: any) => {
    if ('function' === typeof onPress) {
      requestAnimationFrame(() => onPress(event))
    }
    startRipple(event)
  }

  const handleLongPress = (event: any) => {
    if ('function' === typeof onLongPress) {
      requestAnimationFrame(() => onLongPress(event))
    }
    startRipple(event, 1000)
  }

  const handlePressIn = (event: any) => {
    if ('function' === typeof onPressIn) {
      onPressIn(event)
    }
  }

  const handlePressOut = (event: any) => {
    if ('function' === typeof onPressOut) {
      onPressOut(event)
    }
  }

  const startRipple = React.useCallback((event: any, duration = rippleDuration) => {
    const wC = 0.5 * size.current.width
    const hC = 0.5 * size.current.height
    const {locationX, locationY} = rippleCentered ? {locationX: wC, locationY: hC} : event.nativeEvent

    const offsetX = Math.abs(wC - locationX)
    const offsetY = Math.abs(hC - locationY)

    const R = rippleSize > 0 ? 0.5 * rippleSize : Math.sqrt(Math.pow(wC + offsetX, 2) + Math.pow(hC + offsetY, 2))

    position.setValue({x: locationX - radius, y: locationY - radius})

    Animated.parallel([
      Animated.timing(scale, {
        toValue: R / radius,
        easing: Easing.out(Easing.ease),
        duration,
        useNativeDriver: true
      }),
      Animated.timing(anim, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: duration || rippleDuration,
        useNativeDriver: true
      })
    ]).start(() => {
      scale.setValue(0.5 / radius)
      anim.setValue(0)
      if (typeof onRippleAnimation === 'function') {
        onRippleAnimation()
      }
    })
  }, [])

  const handleLayout = React.useCallback((event: any) => {
    const {width, height} = event.nativeEvent.layout
    if (typeof onLayout === 'function') {
      onLayout(event)
    }
    size.current = {width, height}
  }, [])

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={handlePress} onLongPress={handleLongPress} onPressIn={handlePressIn} onPressOut={handlePressOut} onLayout={handleLayout}>
      <Animated.View pointerEvents="box-only">
        {children}
        <View style={[styles.container]}>
          <Animated.View
            style={[
              styles.ripple,
              {
                backgroundColor: rippleColor,
                transform: [...position.getTranslateTransform(), {scale}],
                opacity: rippleFades
                  ? anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [rippleOpacity, 0]
                    })
                  : rippleOpacity
              }
            ]}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute'
  }
})

// Touchable.propTypes = {
//   ...Animated.View.propTypes,
//   ...TouchableWithoutFeedback.propTypes,

//   rippleColor: PropTypes.string,
//   rippleOpacity: PropTypes.number,
//   rippleDuration: PropTypes.number,
//   rippleSize: PropTypes.number,
//   rippleContainerBorderRadius: PropTypes.number,
//   rippleCentered: PropTypes.bool,
//   rippleFades: PropTypes.bool,
//   disabled: PropTypes.bool,

//   onRippleAnimation: PropTypes.func
// }

export default React.memo(Touchable)
