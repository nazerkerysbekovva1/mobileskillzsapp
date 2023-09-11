import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile';
import MentorProfile from './MentorProfile'

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