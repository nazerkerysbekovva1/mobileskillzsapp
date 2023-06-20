import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View, BackHandler} from 'react-native';
import {Config} from '../../Config';
import { StyleSheet } from 'react-native';
import {Avatar, Button, Header, Icon, Text} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getProfile, userData} from '../../Functions';
import Product from '../../component/Product';
import Badge from '../../component/Badge';
import Post from '../../component/Post';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import {Lng} from '../../Language';

export default class Profile extends React.Component{
    state = {
        data    : null,
        tabIndex: 0,
        spinner : false,
        token   : null,
        follow  : 0
    }
    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        let d = await getProfile(this.props.route.params.id);
        this.setState({data:d});
        if(d.follow == 1){
            this.setState({follow:1});
        }
        let token   = await userData();
        if(token != undefined && token.token != undefined){
            this.setState({token:token.token});
        }
    }
    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    async follow(){
        if(this.state.token == null){
            showMessage({
                message : Lng.please_login,
                type    : 'danger'
            })
            return;
        }
        this.setState({spinner:true});
        let content = await fetch(Config.url + '/api/v' + Config.version + '/user/profile/follow', {
            method  : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body    : JSON.stringify({
                'id'    : this.state.data.id,
                'token' : this.state.token
            })
        });
        content = await content.json();
        console.log(content);
        this.setState({spinner:false});
        this.setState({follow:1});
    }
    async unfollow(){
        if(this.state.token == null){
            showMessage({
                message : Lng.please_login,
                type    : 'danger'
            })
            return;
        }
        this.setState({spinner:true});
        let content = await fetch(Config.url + '/api/v' + Config.version + '/user/profile/unfollow', {
            method  : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body    : JSON.stringify({
                'id'    : this.state.data.id,
                'token' : this.state.token
            })
        });
        content = await content.json();
        console.log(content);
        this.setState({spinner:false});
        this.setState({follow:0});
    }
    _renderTab = () => {
        if(this.state.data != null){
            if(this.state.tabIndex == 0){
                return (
                    <Text style={{color:'#A8A8A8',fontFamily:'robotoregular',lineHeight:20}}>{this.state.data.bio}</Text>
                )
            }
            if(this.state.tabIndex == 1){
                return (
                    <FlatList data={this.state.data.videos} renderItem={({item})=>{
                        return (<Product item={item} navigation={this.props.navigation}/>)
                    }}/>
                )
            }
            if(this.state.tabIndex == 2){
                return (
                    <FlatList data={this.state.data.rates} renderItem={({item})=>{
                        return (<Badge item={item} navigation={this.props.navigation}/>)
                    }}/>
                )
            }
            if(this.state.tabIndex == 3){
                return (
                    <FlatList data={this.state.data.articles} renderItem={({item})=>{
                        return (<Post data={item} navigation={this.props.navigation}/>)
                    }}/>
                )
            }
        }else{
            return null;
        }

    }
    render(){
        return (
            this.state.data?
                <View style={{flex:1,backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                        leftContainerStyle={{bottom:14,left:14}}
                        centerComponent={{text:Lng.profile,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <ScrollView >
                    <View style={style.header}>
                        <Avatar
                            size="xlarge"
                            containerStyle={{alignSelf:'center'}}
                            rounded
                            source={{uri:this.state.data.avatar}}
                        />
                        <View style={{height:10}}/>
                        <Text style={{fontSize:20, fontFamily:'robotobold',color:'#fff'}}>{this.state.data.name}</Text>
                        <View style={{height:10}}/>
                        {(this.state.data.follow == '0' && this.state.follow == 0) ?
                            <Button onPress={()=>{this.follow()}} title={Lng.Follow} buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: '#fff',
                                borderWidth: 2,
                                borderRadius: 40,
                                width: 100,
                                paddingTop: 5,
                                paddingBottom: 5,
                            }} titleStyle={{fontSize: 13}}/>
                            :
                            <Button onPress={()=>{this.unfollow()}} title={Lng.unfollow} buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: '#fff',
                                borderWidth: 1,
                                borderRadius: 40,
                                width: 100,
                                paddingTop: 5,
                                paddingBottom: 5
                            }} titleStyle={{fontSize: 13}}/>
                        }
                    </View>
                    <View style={style.whiteBox}>
                        <View style={style.boxIn1}>
                            <Text style={{fontFamily:'robotobold',fontSize:20,justifyContent:'center',textAlign:'center',color:Config.sectionsColor}}>{this.state.data.courses}</Text>
                            <Text style={{fontFamily:'robotoregular',color:Config.grayColor,textAlign:'center'}}>{Lng.Courses}</Text>
                        </View>
                        <View style={style.boxIn2}>
                            <Text style={{fontFamily:'robotobold',fontSize:20,justifyContent:'center',textAlign:'center',color:Config.sectionsColor}}>{this.state.data.duration}</Text>
                            <Text style={{fontFamily:'robotoregular',color:Config.grayColor,textAlign:'center'}}>{Lng.Minutes}</Text>
                        </View>
                        <View style={style.boxIn3}>
                            <Text style={{fontFamily:'robotobold',fontSize:20,justifyContent:'center',textAlign:'center',color:Config.sectionsColor}}>{this.state.data.follower}</Text>
                            <Text style={{fontFamily:'robotoregular',color:Config.grayColor,textAlign:'center'}}>{Lng.Followers}</Text>
                        </View>
                    </View>
                    <View style={{paddingTop:50}}>
                        <SegmentedControlTab
                            values={[Lng.Bio, Lng.Courses, Lng.Badges,Lng.Articles]}
                            onTabPress={(index)=>{this.setState({tabIndex:index})}}
                            selectedIndex={this.state.tabIndex}
                            firstTabStyle={{borderRadius:0,borderBottomLeftRadius:0}}
                            tabsContainerStyle={{padding:15}}
                            tabStyle={{borderWidth:0,backgroundColor:'transparent',borderRadius:0,padding:24,borderBottomWidth:2,borderBottomColor:'transparent',paddingLeft:10,paddingRight:10}}
                            tabTextStyle={{paddingBottom:5,fontFamily:'robotobold',fontSize:14,color:Config.grayColor}}
                            activeTabStyle={{borderBottomWidth:2,backgroundColor:'transparent',borderBottomColor:Config.primaryColor}}
                            activeTabTextStyle={{color:Config.primaryColor}}
                            lastTabStyle={{borderBottomRightRadius:0}}
                        />
                        <View style={{padding:15,paddingTop:5}}>
                            {this._renderTab()}
                        </View>
                    </View>
                </ScrollView>
                    <Spinner visible={this.state.spinner}/>
                </View>
            :
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}

const style = StyleSheet.create({
    header : {
        height: 300,
        width : '100%',
        backgroundColor: Config.primaryColor,
        paddingTop:20,
        alignItems:'center',
    },
    avatar :{
        width: 200,
        height:200,
        borderRadius:200
    },
    whiteBox:{
        width: '80%',
        alignSelf: 'center',
        backgroundColor:'#fff',
        height:70,
        position:'absolute',
        top:265,
        borderRadius:10,
        elevation:8,
        flexDirection:'row',
        flex: 1,
        paddingTop:13
    },
    boxIn1:{
        height:'80%',
        width: '32.33333333333333%',
        justifyContent:'center'
    },
    boxIn2:{
        height:'80%',
        width: '33.33333333333333%',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor: '#E3E3E3',
        justifyContent:'center'
    },
    boxIn3:{
        height:'80%',
        width: '32.33333333333333%',
        justifyContent:'center'
    }
})
