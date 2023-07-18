import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {BackHandler, ScrollView, View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import UrlWebView from '../../component/UrlWebView';
import {Config} from '../../Config';


export default class Content extends React.Component{
    constructor(props){
        super(props);
    }
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
        return (
            <View style={{flex:1}}>
                <Header
                    containerStyle={{height:60}}
                    backgroundColor={Config.primaryColor}
                    leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                    leftContainerStyle={{bottom:14, left:14}}
                    centerComponent={{text:this.props.route.params.title,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                    centerContainerStyle={{bottom:13}}
                />
                <UrlWebView url={this.props.route.params.url} />
                {this.props.route.params.user?
                    <View style={{height:10}}/>
                :null}
                {this.props.route.params.user?
                    <TouchableOpacity style={style.profileContainer} activeOpacity={1} onPress={() => {this.props.navigation.navigate('Profile',{id:this.props.route.params.user.id})}}>
                        <View style={{padding:10,width:'25%',alignContent:'center',justifyContent:'center'}}>
                            <Image style={{width:'95%',height:'100%',borderRadius:100,borderWidth:3,borderColor:'rgba(0,0,0,0.1)'}} source={{uri:this.props.route.params.user.avatar}}/>
                        </View>
                        <View style={{width:'75%',padding:5}}>
                            <Text>{this.props.route.params.user.name}</Text>
                            <Text style={{fontSize:12,paddingTop:3}}>{this.props.route.params.user.bio.substring(0,130)}...</Text>
                        </View>
                    </TouchableOpacity>
                :null}
            </View>
        )
    }
}

const style = StyleSheet.create({
    profileContainer:{
        height          : 100,
        position        : 'absolute',
        bottom          : 0,
        width           : '100%',
        backgroundColor : '#fcfcfc',
        elevation       : 5,
        flex            : 1,
        flexDirection   : 'row',
        borderTopColor  : '#fdfdfd',
        borderTopWidth  : 4
    }
})
