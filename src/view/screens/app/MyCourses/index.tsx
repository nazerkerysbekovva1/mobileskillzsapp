import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Courses } from './Courses';
import { Default } from './Default';

import { userLogin } from '../../../../data/client/http-client';

const Stack = createNativeStackNavigator();

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check user login status when the component mounts
    const checkLoginStatus = async () => {
      const loggedIn = await userLogin();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

    return(
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Courses" options={{ headerShown: false }} component={Courses} />
        ) : (
          <Stack.Screen name="Default" options={{ headerShown: false }} component={Default} />
        )}
      </Stack.Navigator>
    )
  };
  
  export default Index;