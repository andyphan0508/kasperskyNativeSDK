import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {createContext, useState} from 'react'
import {Appearance} from 'react-native'
import ThemeColors from './colors'
import dimension, {IDimension} from './dimension'
import {IIntents, intents} from './intents'
import shadow from './shadow'

interface IThemes {
  theme: string
  colors: any
  dimension: IDimension
  shadow: any
  // fonts: IFonts
  // shadow: any
  // spacing: IIntents
  intents: IIntents
  toggleTheme: (newTheme: string) => void
}

const DefaultTheme = {
  theme: 'light',
  colors: ThemeColors.light,
  dimension,
  shadow,
  // spacing,
  intents,
  toggleTheme: () => {},
}

export const ThemeContext = createContext<IThemes>(DefaultTheme)

export const ThemeProvider = ({children}: any) => {
  // const curHour = new Date().getHours()
  // const defaultTheme = 'light' //curHour >= 6 && curHour < 18 ? 'light' : 'dark';
  const [theme, setTheme] = useState('light')
  const [colors, setColors] = useState<any>(ThemeColors.light)

  React.useEffect(() => {
    const appearance = Appearance.addChangeListener(({colorScheme}) => {
      // setTheme(colorScheme || 'light')
      // Appearance.getColorScheme()
    })
    AsyncStorage.getItem('@theme').then(t => {
      if (t) toggleTheme(t)
    })
    return () => {
      appearance.remove()
    }
  }, [])

  const toggleTheme = async (newTheme: string) => {
    // if (newTheme) {
    //   let _theme = newTheme
    //   if (newTheme == 'auto') {
    //     const curHour = new Date().getHours()
    //     _theme = curHour >= 6 && curHour < 18 ? 'light' : 'dark'
    //   }
    //   setTheme(_theme)
    //   setColors(ThemeColors[_theme])
    //   StatusBar.setBarStyle(`${_theme}-content` as StatusBarStyle)
    //   await AsyncStorage.setItem('@theme', newTheme)
    //   return
    // }
    // if (theme === 'light') {
    //   setTheme('dark')
    //   setColors(ThemeColors.dark)
    //   StatusBar.setBarStyle('light-content')
    // } else {
    //   setTheme('light')
    //   setColors(ThemeColors.light)
    //   StatusBar.setBarStyle('dark-content')
    // }
  }

  return <ThemeContext.Provider value={{...DefaultTheme, theme, colors, toggleTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  // const theme = React.useContext(ThemeContext)
  return DefaultTheme
}
