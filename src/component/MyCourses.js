import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import {Config} from '../Config';

export default class MyCourses extends React.Component{
    render(){
        return (
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Product',{id:this.props.item.id})}}>
                <Card containerStyle={Style.container}>
                    <FastImage style={Style.image} source={{uri:this.props.item.thumbnail}}/>
                    <View style={Style.text}>
                        <Text numberOfLines={1} style={{fontFamily:'robotobold',fontSize:17,color:Config.sectionsColor}}>{this.props.item.title}</Text>
                        <Text style={{color:Config.greenColor,marginTop:10,fontSize:17,fontFamily:'robotobold'}}>{this.props.item.mode}</Text>
                        <Text style={{color:Config.grayColor,fontSize:17,marginTop:10}}>Sales:{this.props.item.sales}</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        height:115,
        borderRadius:8,
        padding:0,
        margin:10,
        elevation:5
    },
    image:{
        position:'absolute',
        left:-1,
        top:0,
        width:140,
        height: 114,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text:{
        marginLeft:150,
        top: 10,
    }
})
