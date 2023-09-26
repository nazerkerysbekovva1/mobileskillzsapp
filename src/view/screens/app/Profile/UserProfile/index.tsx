import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfile } from './EditProfile';
import { UserProfile } from './UserProfile';
import { Default } from './Default';

import { logout, userLogin } from '../../../../../data/client/http-client';

const Stack = createNativeStackNavigator();

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const checkLoginStatus = async () => {
        const loggedIn = await userLogin();
        setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);

    return(
      <Stack.Navigator>
        {isLoggedIn ? (
            <Stack.Screen name="UserProfile" options={{ headerShown: false }} component={UserProfile} />
        ) : (
            <Stack.Screen name="Default" options={{ headerShown: false }} component={Default} />
        )}
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={EditProfile} />
      </Stack.Navigator>
    )
  };
  
export default Index;