import React from 'react';
import type { ReactElement, PropsWithChildren } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../page/Splash';
import Route from '../page/Route';
import FlashMessage from 'react-native-flash-message';
import Help from '../page/Help';
import Profile from '../page/User/Profile';
import { WelcomePage } from './WelcomePage';
import { AuthStack } from '../view/screens/auth';
import MainRoute from '../view/screens/MainRoute';
import { Basket } from '../view/screens/app/Basket';
import MentorProfile from '../view/screens/app/Profile/MentorProfile';
import { ArticleItem } from '../view/screens/app/Profile/MentorProfile/ArticleItem';

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator initialRouteName='WelcomePage'>
        {/* <Stack.Screen name="Help" options={{ headerShown: false }} component={Help} /> */}
        <Stack.Screen name="WelcomePage" options={{ headerShown: false }} component={WelcomePage} />
        <Stack.Screen name="AuthStack" options={{ headerShown: false }} component={AuthStack} /> 
        <Stack.Screen name="App" options={{ headerShown: false }} component={App} />
        <Stack.Screen name="WelcomeStack" options={{ headerShown: false }} component={WelcomeStack} />
      </Stack.Navigator>
    </QueryClientProvider>
  );
}

export const WelcomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Route" options={{ headerShown: false }} component={Route} />
    </Stack.Navigator>
  );
};

export const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainRoute" options={{ headerShown: false }} component={MainRoute} />
      <Stack.Screen name="Basket" options={{ headerShown: false }} component={Basket} />
      <Stack.Screen name="MentorProfile" options={{ headerShown: false }} component={MentorProfile} />
      <Stack.Screen name="ArticleItem" options={{ headerShown: false }} component={ArticleItem} />
    </Stack.Navigator>
  );
};

