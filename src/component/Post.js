import React from 'react';
import {Text, Card} from 'react-native-elements';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import {Config} from '../Config';

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Content',{title:this.props.data.title,'url':this.props.data.url,'user':this.props.data.user})}}>
                <Card containerStyle={Style.container}>
                    <FastImage style={Style.img} source={{uri:this.props.data.image}}/>
                    <Text style={Style.txt} numberOfLines={2}>{this.props.data.title}</Text>
                    <Text style={Style.date}>{this.props.data.date}</Text>
                </Card>
            </TouchableOpacity>
            )
    }
}

const Style = StyleSheet.create({
    container:{
        margin:5,
        marginBottom: 10,
        borderRadius:8,
        padding:0,
        height: 101,
        paddingRight:15,
        elevation:5
    },
    img:{
        width:'30%',
        height:100,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        position:'absolute',
    },
    txt:{
        paddingLeft: '33%',
        paddingTop:8,
        lineHeight:20,
        fontFamily:'robotobold',
        fontSize:17,
        color: Config.sectionsColor
    },
    date:{
        left: '33%',
        top:70,
        color:Config.grayColor,
        position: 'absolute',
        fontSize: 17,
    }
})
