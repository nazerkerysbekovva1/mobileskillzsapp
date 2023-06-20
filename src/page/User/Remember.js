import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Panel from '../../component/Panel';
import Input from '../../component/Input';
import MyButton from '../../component/MyButton';
import {Config} from '../../Config';
import {Lng} from '../../Language';
import {showMessage} from 'react-native-flash-message';

export default class Remember extends React.Component{
    state = {
        email   : null,
        spinner : false
    }
    async _forgetPassword(){
        if(this.state.email == null || this.state.email == '')
            return;

        this.setState({spinner:true});
        let content = await fetch(Config.url + '/api/v' + Config.version + '/user/remember', {
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                email   : this.state.email
            })
        });
        content = await content.json();
        if(content && content.status == '1'){
            showMessage({
                message : Lng.send_successfully,
                type    : 'success'
            });
            this.setState({email:null})
        }else{
            if(content){
                showMessage({
                    message : content.error,
                    type    : 'danger'
                })
            }
        }
        this.setState({spinner:false});
    }

    render(){
        return(
            <ScrollView style={style.body}>
                <View style={{flex: 1,verticalAlign:'center',height:'auto',alignItems:'center', justifyContent:'center'}}>
                    <Panel style={{width:'100%',height:'auto',justifyContent:'center'}} cardStyle={{padding:25,paddingTop:20,paddingBottom:30}}>
                        <Text style={{alignSelf:'center',fontSize:20,fontFamily:'robotobold'}}>{Lng.recover}</Text>
                        <View style={{height:5}}/>
                        <Text style={{alignSelf:'center',fontSize:14,fontFamily:'robotolight',color: Config.grayColor}}>{Lng.simply_email}</Text>
                        <View style={{height:30}}/>
                        <Input onChangeText={(t)=>{this.setState({email:t})}} value={this.state.email} icon={'mail'} placeholder={Lng.email_ph} label={Lng.Email_address}/>
                        <View style={{height:40}}/>
                        <MyButton onPress={()=>{this._forgetPassword()}} label={Lng.Send}/>
                    </Panel>
                    <View style={{height:20}}/>
                    <Text>Your problem solved?</Text>
                    <View style={{height:10}}/>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}><Text style={{fontFamily:'robotobold', fontSize:17}}>{Lng.Back_to_Login}</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

let style = StyleSheet.create({
    body:{
        flex:1,
        padding:20,
        backgroundColor:Config.background,
    }
});
