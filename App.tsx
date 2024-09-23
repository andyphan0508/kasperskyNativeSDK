import {name as appName} from './app.json';
import React from 'react';
import {StyleSheet} from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Home from './src/screens/Home';
import AntivirusChecker from './src/screens/AntivirusScanner';
import AppMonitor from './src/screens/AppMonitor';
import CheckRoot from './src/screens/RootScanner';
import About from './src/screens/About';
import WebFilter from './src/screens/WebFilter';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Antivirus" component={AntivirusChecker} />
          <Stack.Screen name="AppMonitor" component={AppMonitor} />
          <Stack.Screen name="Root" component={CheckRoot} />
          <Stack.Screen name="Filter" component={WebFilter} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  sectionTitle: {fontSize: 24, fontWeight: '600'},
  sectionDescription: {marginTop: 8, fontSize: 18, fontWeight: '400'},
  highlight: {fontWeight: '700'},
});

AppRegistry.registerComponent(appName, () => App);

export default App;
