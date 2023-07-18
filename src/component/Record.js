import React from 'react';
import {Text, Card, Icon} from 'react-native-elements';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image'
import {Config} from '../Config';

export default class Record extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
                <Card containerStyle={Style.container}>
                    <FastImage resizeMode={'contain'} style={Style.img} source={{uri:this.props.data.image}}/>
                    <Text style={Style.txt}>{this.props.data.title}</Text>
                    <View style={{left:'33%',top:60,flex:1,flexDirection:'row',position:'absolute',width:28}}>
                        <Icon name={'heart'} type={'feather'} size={22} color={'red'} containerStyle={{top:7}}/>
                        <Text style={Style.txt}>{this.props.data.fans}</Text>
                    </View>
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
        position: 'absolute'
    }
})
