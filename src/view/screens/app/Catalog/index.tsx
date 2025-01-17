import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import  Digest from '../Catalog/Digest';
import Category from '../Catalog/Category';
import { Webinar } from '../Catalog/Webinar';
import { Text } from 'react-native-elements';
import { Icon } from '../../../../component/Icon';
import { Catalog } from './Catalog';
import  CourseCard from '../CourseCard';
import { useNavigation } from '@react-navigation/native';

import { userLogin, fetchUserData } from '../../../../data/client/http-client';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../../../../data/client/endpoints';

const Tab = createMaterialTopTabNavigator();

const MainCatalog = () => {
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const checkLoginStatus = async () => {
        const loggedIn = await userLogin();
        setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);
    
    const { data } = useQuery('user', () =>
      isLoggedIn ? fetchUserData(API_ENDPOINTS.PROFILE_SETTINGS) : null);
    const username = data?.data.user ? data?.data.user.full_name : 'NewUser'

    return(
        <SafeAreaView className='flex-1 bg-black items-center pt-8 px-4'>
          <View className='w-full flex-row justify-between'>
              <Text className='text-custom-Green font-bold text-lg'>
                Hello, <Text className='text-white font-bold'>{username}</Text>
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                  <Icon src={require('../../../../../assets/icon/shopping.png')} size={24}/>
              </TouchableOpacity>
          </View>
          <Tab.Navigator
            initialRouteName="Digest"
            screenOptions={({route}) => ({
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
              tabBarCentered: true,
              tabBarStyle: styles.tabBarStyle,
              tabBarIndicatorStyle: { backgroundColor: 'white', height: 0.4 },
            })}>
            <Tab.Screen name="Digest" component={Digest} />
            <Tab.Screen name="Category" component={Category} />
            <Tab.Screen name="Webinar" component={Webinar} />
          </Tab.Navigator>
        </SafeAreaView>
      )
};

const styles = StyleSheet.create({
    tabBarStyle: {
      width: 381,
      height: 43,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.4,
    },
  });


  
const Stack = createNativeStackNavigator();

const Index = () => {
  return(
    <Stack.Navigator initialRouteName="MainCatalog">
      <Stack.Screen name="MainCatalog" options={{ headerShown: false }} component={MainCatalog} />
      <Stack.Screen name="catalog" options={{ headerShown: false }} component={Catalog} />
      <Stack.Screen name="CourseCard" options={{ headerShown: false }} component={CourseCard} />
    </Stack.Navigator>
  )
};

export default Index;