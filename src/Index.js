

import React from 'react';
import { NetworkProvider } from 'react-native-offline';
import App from './App';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { navigationRef } from './Utils/NavigationService'

import {LogBox} from "react-native";
import Colors from './Utils/Assets/Colors';

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.primary
  },
};

const Root = () => (
  <NavigationContainer theme={MyTheme} ref={navigationRef}>
    <NetworkProvider>
      <App />
    </NetworkProvider>
  </NavigationContainer>
);

export default Root;
