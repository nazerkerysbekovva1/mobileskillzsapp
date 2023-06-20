import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Product from '../Product/Poroduct';
import Part from '../Product/Part';
import {Alert, BackHandler} from 'react-native';
import Profile from '../User/Profile';
import Content from '../Article/Content';

const Stack = createStackNavigator();
export default class Index extends React.Component{

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
        )
        return true;
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" options={{headerShown:false}} component={Main} />
                <Stack.Screen name="Product" options={{headerShown:false}} component={Product}  />
                <Stack.Screen name="Part" options={{headerShown:false}} component={Part}  />
                <Stack.Screen name="Profile" options={{headerShown:false}} component={Profile} />
                <Stack.Screen name="Content" options={{headerShown:false}} component={Content} />
            </Stack.Navigator>
        )
    }
}
