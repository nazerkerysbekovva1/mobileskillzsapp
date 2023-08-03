import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Mentor } from './Mentor';

const Stack = createNativeStackNavigator();

const Index = () => {
    return(
      <Stack.Navigator initialRouteName="Mentor">
        <Stack.Screen name="Mentor" options={{ headerShown: false }} component={Mentor} />
      </Stack.Navigator>
    )
  };
  
  export default Index;