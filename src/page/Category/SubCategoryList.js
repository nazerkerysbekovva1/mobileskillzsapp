import React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import {Config} from '../../Config';
import FastImage from 'react-native-fast-image';
import {Lng} from '../../Language';

export default class SubCategoryList extends React.Component{
    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    render(){
        return(
            this.props.route.params.data != undefined?
                <View style={{backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                        leftContainerStyle={{bottom:14,left: 14}}
                        centerComponent={{text:Lng.back_to_categories,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <FlatList data={this.props.route.params.data} renderItem={({item})=>{
                        return (
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Archive',{catId:item.id,'title':item.title})}} style={Style.item}>
                                {(typeof item.icon === 'string')?
                                <FastImage source={{uri:item.icon}} style={{position:'absolute',left:10,top:10,width:36,height:36}}/>
                                :null}
                                <View style={{paddingLeft:45,paddingTop:2}}>
                                    <Text style={{fontFamily:'robotobold',fontSize:17}}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}/>
                </View>
            :null
        )
    }
}

const Style = StyleSheet.create({
    item:{
        borderBottomWidth:1,
        borderBottomColor:'#cdcdcd',
        padding:13,
        width:'100%',
        height:60
    }
});
