import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Config} from '../Config';

export default class MyButton extends React.Component{
    render(){
        return(
            <View style={this.props.containerStyle}>
            <Button onPress={this.props.onPress} buttonStyle={[this.props.style,{elevation:8,borderRadius:60,backgroundColor:Config.secondaryColor,height:55}]} titleStyle={{fontSize:20}} title={this.props.label}/>
            </View>
        )
    }
}
