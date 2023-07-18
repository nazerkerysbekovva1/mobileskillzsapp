import React from 'react';
import {BackHandler, ScrollView, Text, View, ActivityIndicator} from 'react-native';
import {Config} from '../../Config';
import {Button, Header, Icon} from 'react-native-elements';
import Input from '../../component/Input';
import {userData} from '../../Functions';
import {Lng} from '../../Language';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Setting extends React.PureComponent{

    state = {
        data        : null,
        password    : null,
        re_password : null,
        name        : null,
        phone       : null,
        city        : null,
        age         : null,
        spinner     : false
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        let user = await userData();
        this.setState({data:user});
        this.setState({
            name:user.name,
            phone:user.phone,
            age:user.age,
            city:user.city
        })
    }
    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    async _updateData(){
        this.setState({spinner:true});
        let content = await fetch(Config.url + '/api/v' + Config.version + '/user/setting',{
            method  : 'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify({
                token       : this.state.data.token,
                password    : this.state.password,
                re_password : this.state.re_password,
                name        : this.state.name,
                phone       : this.state.phone,
                city        : this.state.city,
                age         : this.state.age
            })
        });

        content = await content.json();
        console.log(content);
        this.setState({spinner:false});
        await AsyncStorage.setItem('user',JSON.stringify(content.data.user));
    }

    render(){
        return(
            this.state.data != null ?
            <View style={{flex:1, backgroundColor: Config.background}}>
                <Header
                    containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                    backgroundColor={'#343871'}
                    leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                    leftContainerStyle={{bottom:14, left:6}}
                    centerComponent={{text:Lng.Settings,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                    centerContainerStyle={{bottom:13}}
                />
                <ScrollView>
                    <View style={{padding:20}}>
                        <Text style={{fontFamily:'robotobold',color:Config.sectionsColor,fontSize:17}}>{Lng.change_pass}</Text>
                        <View style={{height:20}}/>
                        <Input label={Lng.Password}  icon={'key'} password={true}/>
                        <View style={{height:15}}/>
                        <Input label={Lng.re_password} password={true} icon={'key'}/>
                    </View>
                    <View style={{height:10}}/>
                    <View style={{padding:20}}>
                        <Text style={{fontFamily:'robotobold',color:Config.headerBgColor,fontSize:18}}>{Lng.profile}</Text>
                        <View style={{height:20}}/>
                        <Input label={Lng.name} onChangeText={(t)=>{this.setState({name:t})}} value={this.state.name}  icon={'user'}/>
                        <View style={{height:15}}/>
                        <Input label={Lng.phone_number} onChangeText={(t)=>{this.setState({phone:t})}} value={this.state.phone} icon={'phone'}/>
                        <View style={{height:15}}/>
                        <Input label={Lng.city} onChangeText={(t)=>{this.setState({city:t})}} value={this.state.city} icon={'map'}/>
                        <View style={{height:15}}/>
                        <Input label={Lng.age} onChangeText={(t)=>{this.setState({age:t})}} value={this.state.age} icon={'calendar'}/>

                    </View>
                    <View style={{height:70}}/>
                </ScrollView>
                <View style={{position:'absolute',height:60, width:'100%',bottom:0,backgroundColor:'#fff',elevation:10}}>
                    <Button title={Lng.Save} containerStyle={{width:'80%',alignSelf:'center',paddingTop:10}} buttonStyle={{backgroundColor:Config.secondaryColor,borderRadius:25,elevation:5}} onPress={()=>{this._updateData()}}/>
                </View>
                <Spinner visible={this.state.spinner}/>
            </View>
                :
            <View style={{flex:1,justifyContent:'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }
}
