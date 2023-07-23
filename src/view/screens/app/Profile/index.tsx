import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MentorProfile from './MentorProfile';
import UserProfile from './UserProfile';

const Stack = createNativeStackNavigator();

const Index = () => {
    return(
      <Stack.Navigator initialRouteName="UserProfile">
        <Stack.Screen name="UserProfile" options={{ headerShown: false }} component={UserProfile} />
        <Stack.Screen name="MentorProfile" options={{ headerShown: false }} component={MentorProfile} />
      </Stack.Navigator>
    )
  };
  
  export default Index;