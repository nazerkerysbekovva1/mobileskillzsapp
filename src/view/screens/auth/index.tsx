import React from 'react';
import { Login } from './Login';
import { Signup } from './Signup';
import { ForgotPassword } from './ForgotPassword';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
      </Stack.Navigator>
    );
  };