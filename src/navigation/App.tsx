import React from 'react';
import type { ReactElement, PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../page/Splash';
import Route from '../page/Route';
import FlashMessage from 'react-native-flash-message';
import Help from '../page/Help';
import Profile from '../page/User/Profile';
import { WelcomePage } from './WelcomePage';
import { Login } from '../view/screens/auth/Login';
import { Signup } from '../view/screens/auth/Signup';
import MainRoute from '../view/screens/MainRoute';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {

  return (
      <Stack.Navigator>
        {/* <Stack.Screen name="Help" options={{ headerShown: false }} component={Help} /> */}
        <Stack.Screen name="WelcomePage" options={{ headerShown: false }} component={WelcomePage} />
        <Stack.Screen name="WelcomeStack" options={{ headerShown: false }} component={WelcomeStack} />
        <Stack.Screen name="AuthStack" options={{ headerShown: false }} component={AuthStack} />
        <Stack.Screen name="App" options={{ headerShown: false }} component={App} />
      </Stack.Navigator>
  );
}

const WelcomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Route" options={{ headerShown: false }} component={Route} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainRoute" options={{ headerShown: false }} component={MainRoute} />
    </Stack.Navigator>
  );
};

