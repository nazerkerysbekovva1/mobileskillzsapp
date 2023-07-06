import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, StyleSheet } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Catalog } from './Catalog';

const Tab = createMaterialTopTabNavigator();

const Index = () => {
    return(
        <SafeAreaView className='flex-1 bg-black items-center'>
          <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName="Digest"
            screenOptions={({route}) => ({
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'white',
              tabBarIndicatorStyle: 'bg-white',
              tabBarCentered: true,
              tabBarStyle: styles.tabBarStyle,
            })}>
            <Tab.Screen name="Digest" component={Catalog} />
            <Tab.Screen name="Category" component={Catalog} />
            <Tab.Screen name="Webinar" component={Catalog} />
          </Tab.Navigator>
          {}
        </SafeAreaView>
      )
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Catalog" options={{ headerShown: false }} component={Catalog} />
//     </Stack.Navigator>
//   );
};

const styles = StyleSheet.create({
    tabBarStyle: {
      width: 351,
      height: 43,
      backgroundColor: 'transparent',
      borderTopColor: 'white',
      borderTopWidth: 0.2,
    },
  });

export default Index;
