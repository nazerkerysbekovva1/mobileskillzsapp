import React from 'react';
import { View,ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import {Config} from '../../Config';
import {Lng} from '../../Language';
import Panel from '../../component/Panel';
import Input from '../../component/Input';
import MyButton from '../../component/MyButton';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';

export default class Register extends React.Component{

    state = {
        spinner     : false,
        username    : null,
        password    : null,
        rePassword  : null,
        name        : null,
        email       : null,
    }

    async _regiser(){
        if(this.state.username == null
            || this.state.password == null
            || this.state.email == null
            || this.state.name == null
            || this.state.rePassword == null
        ){
            showMessage({
                message : Lng.empty_field,
                type    : 'danger'
            });
            return;
        }
        if(this.state.password != this.state.rePassword){
            showMessage({
                message : Lng.re_password,
                type    : 'danger'
            });
            return;
        }
        this.setState({spinner:true});
        let result = await fetch(Config.url + '/api/v' + Config.version + '/user/register', {
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                username    : this.state.username,
                password    : this.state.password,
                re_password : this.state.rePassword,
                email       : this.state.email,
                name        : this.state.name
            })
        });
        result = await result.json();
        if(result.status && result.status == '1'){
            showMessage({
                message : result.data.description,
                type    : 'success'
            });
            this.props.navigation.navigate('Login');
        }
        if(result.status && result.status != '1'){
            showMessage({
                message : result.error,
                type    : 'danger'
            })
        }
        this.setState({spinner:false});
    }
    render() {
        return (
            <ScrollView style={style.body}>
                <View style={{flex: 1,verticalAlign:'center',height:'auto',alignItems:'center', justifyContent:'center'}}>
                    <Panel style={{width:'100%',height:'auto',justifyContent:'center'}} cardStyle={{padding:25,paddingTop:20,paddingBottom:30}}>
                        <Text style={{alignSelf:'center',fontSize:20,fontFamily:'robotobold'}}>{Lng.register}</Text>
                        <View style={{height:5}}/>
                        <Text style={{alignSelf:'center',fontSize:14,fontFamily:'robotolight',color: Config.grayColor}}>{Lng.enjoy_product}</Text>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({username:t})}} icon={'user'} placeholder={Lng.username_ph} label={Lng.username}/>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({name:t})}} icon={'users'} placeholder={Lng.realname_ph} label={Lng.realname}/>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({email:t})}} icon={'mail'} placeholder={Lng.email_ph} label={Lng.Email_address}/>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({password:t})}} icon={'key'} password={true} placeholder={Lng.password_ph} label={Lng.Password}/>
                        <View style={{height:40}}/>
                        <Input onChangeText={(t)=>{this.setState({rePassword:t})}} icon={'key'} password={true} placeholder={Lng.retype_ph} label={Lng.re_password}/>
                        <View style={{height:40}}/>
                        <MyButton label={Lng.Register} onPress={()=>{this._regiser()}}/>
                    </Panel>
                    <View style={{height:20}}/>
                    <Text>{Lng.Already_have_an_account}</Text>
                    <View style={{height:10}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}><Text style={{fontFamily:'robotobold', fontSize:17}}>{Lng.login}</Text></TouchableOpacity>
                    <View style={{height:50}}/>
                </View>
                <Spinner visible={this.state.spinner}/>
            </ScrollView>
        );
    }
}

let style = StyleSheet.create({
    body:{
        flex:1,
        padding:20,
        backgroundColor:Config.background
    }
});
