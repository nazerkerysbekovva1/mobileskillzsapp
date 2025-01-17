import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from './Search';

const Stack = createNativeStackNavigator();

const Index = () => {
    return(
      <Stack.Navigator initialRouteName="search">
        <Stack.Screen name="search" options={{ headerShown: false }} component={Search} />
      </Stack.Navigator>
    )
  };
  
  export default Index;