import React from 'react';
import {View, ScrollView, StyleSheet, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {userLogin} from '../../Functions';
import {Lng} from '../../Language';
import { Config } from '../../Config';
import Panel from '../../component/Panel';
import Input from '../../component/Input';
import MyButton from '../../component/MyButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage, hideMessage }from 'react-native-flash-message';
import Dashboard from './Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Login extends React.Component{

    state = {
        spinner : false,
        username: null,
        password: null,
        login   : false
    }

    async componentDidMount(): void {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            if(await userLogin()){
                this.props.navigation.navigate('Dashboard');
            }
        });
        if(await userLogin()){
            this.props.navigation.navigate('Dashboard');
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    async userLogin(){
        if(this.state.username == null || this.state.password == null){
            showMessage({
                message : "Username Or Password Empty!",
                type    : "danger"
            });
            return;
        }
        this.setState({spinner:true});
        let content = await fetch(Config.url+'/api/v'+Config.version+'/user/login', {
            method  : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body    : JSON.stringify({
                Secret  : Config.secret,
                username: this.state.username,
                password: this.state.password
            })
        })

        content = await content.json();
        this.setState({spinner:false});
        if(content.status == '-1'){
            showMessage({
                message : content.error,
                type    : 'danger'
            })
            return;
        }
        if(content.status == '1'){
            showMessage({
                message : 'successfully login',
                type    : 'info'
            });
            await AsyncStorage.setItem('user_login','1');
            await AsyncStorage.setItem('user',JSON.stringify(content.data.user));
            this.props.navigation.navigate('Dashboard');
        }
    }

    _render(){
        if(this.state.login){
            return <Dashboard/>
        }
        return (<ScrollView style={style.body}>
            <View style={{flex: 1,verticalAlign:'center',height:'100%',alignItems:'center', justifyContent:'center'}}>
                <Panel style={{width:'100%',height:'auto',justifyContent:'center'}} cardStyle={{padding:25,paddingTop:20,paddingBottom:30}}>
                    <Text style={{alignSelf:'center',fontSize:20,fontFamily:'robotobold',color:Config.sectionsColor}}>{Lng.login}</Text>
                    <View style={{height:5}}/>
                    <Text style={{alignSelf:'center',fontSize:14,fontFamily:'robotolight',color: Config.grayColor}}>{Lng.Start_learning}</Text>
                    <View style={{height:30}}/>
                    <Input icon={'mail'} onChangeText={(usr)=>{this.setState({username:usr})}} placeholder={Lng.email_ph} label={Lng.Email_address}/>
                    <View style={{height:30}}/>
                    <Input icon={'key'} onChangeText={(psw)=>{this.setState({password:psw})}} password={true} placeholder={Lng.password_ph} label={Lng.Password}/>
                    <View style={{height:40}}/>
                    <MyButton label={'Login'} onPress={()=>{this.userLogin()}}/>
                    <View style={{height:20}}/>
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Remember')}}><Text>{Lng.forget_password}</Text></TouchableOpacity>
                </Panel>
                <View style={{height:20}}/>
                <Text>Dont`t have an account?</Text>
                <View style={{height:10}}/>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}><Text style={{fontFamily:'robotobold', fontSize:17}}>{Lng.register}</Text></TouchableOpacity>
                <View style={{height:30}}/>
            </View>
            <Spinner visible={this.state.spinner}/>
        </ScrollView>)
    }
    render() {
        return this._render();
    }
}

let style = StyleSheet.create({
    body:{
        flex:1,
        padding:20,
        backgroundColor:Config.background,
    }
});
