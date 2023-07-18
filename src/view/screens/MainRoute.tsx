import React from 'react';
import { Text } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Catalog from './app/Catalog';
import Search from './app/Search';
import { Icon } from '../../component/Icon';
import { Config } from '../../Config';

const Tab = createBottomTabNavigator();

const MainRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          color = Config.primaryColor;
          if (focused) {
            color = Config.customGreen;
          }
          if (route.name == 'Catalog') return <Icon src={require('../../../assets/icon/grid.png')} size={24} color={color} />;
          if (route.name == 'Search') return <Icon src={require('../../../assets/icon/search.png')} size={24} color={color} />;
          if (route.name == 'My courses') return <Icon src={require('../../../assets/icon/layers.png')} size={24} color={color} />;
          if (route.name == 'Profile') return <Icon src={require('../../../assets/icon/user.png')} size={24} color={color} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          color = Config.primaryColor;
          size = 12;
          if (focused) {
            color = Config.customGreen;
          }
          return <Text style={{ color: color, fontSize: size, marginVertical: size }}>{route.name}</Text>;
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 64,
            backgroundColor: Config.bgColor,
            paddingVertical: 20,
          },
          null,
        ],
      })}
    >
      <Tab.Screen name='Catalog' options={{ headerShown: false }} component={Catalog} />
      <Tab.Screen name='Search' options={{ headerShown: false }} component={Search} />
      <Tab.Screen name='My courses' options={{ headerShown: false }} component={Catalog} />
      <Tab.Screen name='Profile' options={{ headerShown: false }} component={Catalog} />
    </Tab.Navigator>
  );
};

export default MainRoute;
