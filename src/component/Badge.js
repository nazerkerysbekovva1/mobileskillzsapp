import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import {Config} from '../Config';
import {SvgCssUri} from 'react-native-svg';

export default class Badge extends React.Component{
    render(){
        return (
            <Card containerStyle={Style.container}>
                <SvgCssUri style={Style.image} uri={this.props.item.image}/>
                <View style={Style.text}>
                    <Text style={{fontFamily:'robotobold',fontSize:17}}>{this.props.item.description}</Text>
                    <Text style={{color:Config.sectionsColor,marginTop:8}}>{this.props.item.text}</Text>
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
        margin:10,
        elevation:5
    },
    image:{
        position:'absolute',
        left:15,
        top:10,
        width: 80,
        height: 80,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text:{
        marginLeft:120,
        top: 20,
    }
})
