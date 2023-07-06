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
import Splash from '../../src/page/Splash';
import Route from '../../src/page/Route';
import FlashMessage from 'react-native-flash-message';
import Help from '../../src/page/Help';
import Profile from '../../src/page/User/Profile';
import { WelcomePage } from '../../src/navigation/WelcomePage';
import { Login } from '../../src/view/screens/auth/Login';
import { Signup } from '../../src/view/screens/auth/Signup';

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
      </Stack.Navigator>
  );
}

export const WelcomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Route" options={{ headerShown: false }} component={Route} />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} />
    </Stack.Navigator>
  );
};

