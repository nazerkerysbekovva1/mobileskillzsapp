import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Config} from '../Config';

export default class Input extends React.Component{
    render(){
        return(
            <View style={this.props.style}>
                <Text style={style.text}>{this.props.label}</Text>
                <View style={style.inputContainer}>
                    <Icon style={style.inputIcon} color={Config.grayColor} size={24} name={this.props.icon} type={'feather'}/>
                    <TextInput placeholder={this.props.placeholder} value={this.props.value} secureTextEntry={this.props.password} onChangeText={this.props.onChangeText} style={[{color:'#424242',fontFamily:'robotolight',fontSize:18,top:-10,height:44,width:'90%',position:'absolute',marginLeft:'10%'},this.props.inputStyle]}/>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
   text : {
       fontFamily: 'robotobold'
   },
    inputContainer:{
       alignItems:'flex-start',
        marginTop:6,
        borderBottomWidth: 2,
        borderBottomColor: '#CDCDCD',
        paddingBottom:3
    },
    inputIcon: {
        position: 'absolute',
        top: 14,
    }
});
