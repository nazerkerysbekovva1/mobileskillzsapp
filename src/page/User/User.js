import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Remember from './Remember';
import Dashboard from './Dashboard';
import Register from './Register';
import TicketList from './Ticket/TicketList';
import TicketReply from './Ticket/TicketReply';
import Courses from './Courses/Courses';
import Financial from './Financial/Financial';
import Product from '../Product/Poroduct';
import Channel from './Channel/Channel';
import Profile from './Profile';
import Content from '../Article/Content';
import Setting from './Setting';

const Stack = createStackNavigator();
export default class User extends React.Component{



    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}} name="Login" component={Login}/>
                <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard}/>
                <Stack.Screen options={{headerShown:false}} name="Remember" component={Remember}/>
                <Stack.Screen options={{headerShown:false}} name="Setting" component={Setting}/>
                <Stack.Screen options={{headerShown:false}} name="Register" component={Register}/>
                <Stack.Screen options={{headerShown:false}} name="TicketList" component={TicketList}/>
                <Stack.Screen options={{headerShown:false}} name="TicketReply" component={TicketReply}/>
                <Stack.Screen options={{headerShown:false}} name="Courses" component={Courses}/>
                <Stack.Screen options={{headerShown:false}} name="Financial" component={Financial}/>
                <Stack.Screen options={{headerShown:false}} name="Product" component={Product}/>
                <Stack.Screen options={{headerShown:false}} name="Channel" component={Channel}/>
                <Stack.Screen options={{headerShown:false}} name="Profile"  component={Profile} />
                <Stack.Screen options={{headerShown:false}} name="Content"  component={Content} />
            </Stack.Navigator>
        )

    }
}
