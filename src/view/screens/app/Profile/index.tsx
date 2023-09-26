import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile';

const Stack = createNativeStackNavigator();

const Index = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" options={{ headerShown: false }} component={UserProfile} />
      </Stack.Navigator>
    )
  };
  
  export default Index;