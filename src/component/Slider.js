import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SliderBox } from "react-native-image-slider-box";

export default class Slider extends React.Component{
    render() {
        return (
            <SliderBox
                onCurrentImagePressed={(index)=>{
                    this.props.navigation.navigate('Product',{id:this.props.ids[index]})
                }}
                autoplay
                circleLoop
                dotColor="#FFEE58"
                ImageComponent={FastImage}
                images={this.props.data}
                ImageComponentStyle={{borderRadius: 8,width:'90%',alignSelf:'center',elevation:5,paddingBottom:10}}
            />
        )
    }
}

