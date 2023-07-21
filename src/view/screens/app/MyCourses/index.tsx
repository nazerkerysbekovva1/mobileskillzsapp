import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Courses } from './Courses';
import { Default } from './Default';

const Stack = createNativeStackNavigator();

const Index = () => {
  const { isUserLoggedIn } = useAuth();

    return(
      <Stack.Navigator>
        {isUserLoggedIn ? (
          <Stack.Screen name="Courses" options={{ headerShown: false }} component={Courses} />
        ) : (
          <Stack.Screen name="Default" options={{ headerShown: false }} component={Default} />
        )}
      </Stack.Navigator>
    )
  };
  
  export default Index;