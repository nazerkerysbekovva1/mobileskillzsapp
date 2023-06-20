import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import {Config} from '../Config';

export default class ChannelBox extends React.Component{
    render(){
        return (
            <Card containerStyle={Style.container}>
                <FastImage style={Style.image} source={{uri:this.props.item.thumbnail}}/>
                <View style={Style.text}>
                    <Text numberOfLines={1} style={{fontFamily:'robotobold',fontSize:15}}>{this.props.item.title}</Text>
                    <Text style={{color:Config.greenColor,marginTop:10}}>{this.props.item.mode}</Text>
                    <Text style={{color:Config.grayColor,marginTop:10}}>Contents:{this.props.item.contents}</Text>
                </View>
            </Card>
        );
    }
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        height:105,
        borderRadius:8,
        padding:0,
        margin:10
    },
    image:{
        position:'absolute',
        left:-1,
        top:0,
        width:140,
        height: 105,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text:{
        marginLeft:150,
        top: 10,
    }
})
