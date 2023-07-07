import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Digest } from '../Catalog/Digest';
import { Category } from '../Catalog/Category';
import { Webinar } from '../Catalog/Webinar';
import { Text } from 'react-native-elements';
import { Icon } from '../../../../component/Icon';

const Tab = createMaterialTopTabNavigator();

const Index = () => {
    return(
        <SafeAreaView className='flex-1 bg-black items-center p-8'>
          <View className='w-full flex-row justify-between'>
              <Text className='text-custom-Green font-bold text-lg'>
                Hello, <Text className='text-white font-bold'>NewUser</Text>
              </Text>
              <TouchableOpacity>
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
      width: 351,
      height: 43,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.4,
    },
  });

export default Index;
