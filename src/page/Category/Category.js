import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryList from './CategoryList';
import SubCategoryList from './SubCategoryList';
import Archive from './Archive';
import Product from '../Product/Poroduct';
import {BackHandler} from 'react-native';

const Stack = createStackNavigator();

export default class Category extends React.Component{

    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}} name={'CategoryList'} component={CategoryList}/>
                <Stack.Screen options={{headerShown:false}} name={'SubCategoryList'} component={SubCategoryList}/>
                <Stack.Screen options={{headerShown:false}} name={'Archive'} component={Archive}/>
                <Stack.Screen options={{headerShown:false}} name={'Product'} component={Product}/>
            </Stack.Navigator>
        )
    }
}
