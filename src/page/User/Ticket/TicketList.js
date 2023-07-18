import React from 'react';
import {TextInput,StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity, Modal, BackHandler, Image, ScrollView} from 'react-native';
import {Config} from '../../../Config';
import {Button, Card, Header, Icon, Input, Text} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getSupport, userData} from '../../../Functions';
import DocumentPicker from "react-native-document-picker";
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {Lng} from '../../../Language';

export default class TicketList extends React.Component{
    state={
        tabIndex        : 0,
        new             : false,
        data            : null,
        ticketTxt       : null,
        ticketTitle     : null,
        ticketFile      : null,
        token           : null,
        spinner         : false,
        modalReply      : false,
        replyComment    : null,
        replyUser       : null,
        replyId         : null,
        comment         : null,
        content_id      : null,
        user_id         : null,
        messages        : []
    }

    constructor(props){
        super(props);
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        await this._updateData();
        let user = await userData();
        this.setState({token: user['token']});

        // Check Become Vendor
        if(this.props.route.params.mode && this.props.route.params.mode =='vendor') {
            this.setState({new:true,ticketTitle:'Become Vendor'});
        }
        if(this.props.route.params.tab != undefined){
            this.setState({tabIndex:this.props.route.params.tab});
        }
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    async _updateData(){
        this.setState({data:null});
        this.setState({data: await getSupport()});
    }

    async attachFile(){
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.zip,DocumentPicker.types.images,DocumentPicker.types.pdf],
            });
            this.setState({ticketFile:{uri:res.uri,type:res.type,name:res.name}})
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    async sendData(){

        if(this.state.ticketTitle == null || this.state.ticketTitle == ''){
            this.refs.modalFlash.showMessage(Lng.empty_field);
            return;
        }
        if(this.state.ticketTxt == null || this.state.ticketTxt == ''){
            this.refs.modalFlash.showMessage(Lng.empty_field);
            return;
        }
        this.setState({spinner:true});
        let data = new FormData();
        data.append('token',this.state.token);
        data.append('msg',this.state.ticketTxt);
        data.append('title',this.state.ticketTitle);
        data.append('file',this.state.ticketFile);
        let response = await fetch(Config.url + '/api/v' + Config.version + '/user/support/new', {
            method : 'POST',
            body: data
        })

        response = await response.json();
        if(response != undefined && response.status == '1'){
            this.setState({new: false});
            this.setState({spinner:false});
            await this._updateData();
            return;
        }else{
            this.refs.modalFlash.showMessage(response.error);
            this.setState({spinner:false});
            return;
        }
        this.setState({spinner:false});
    }
    async sendSupportReply(){
        this.setState({spinner:true});
        let data = new FormData();
        data.append('token',this.state.token);
        data.append('content_id', this.state.content_id);
        data.append('user_id', this.state.user_id);
        data.append('comment', this.state.comment);
        await fetch(Config.url + '/api/v' + Config.version + '/user/support/content/reply',{
            method : 'POST',
            body   : data
        });
        this.setState({data: await getSupport()});
        this.setState({comment:''})
        this.setState({spinner:false});
        this.setState({modalReply:false});
    }

    _tabRender = ()=>{
        if(this.state.data != null) {
            if (this.state.tabIndex == 0) {
                if(this.state.data.tickets && this.state.data.tickets.length > 0) {
                    return (
                        <FlatList data={this.state.data.tickets} renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('TicketReply', {
                                        messages: item.messages,
                                        id: item.id,
                                        title: item.title,
                                        updateData: () => this._updateData()
                                    })
                                }}>
                                    <Card containerStyle={{
                                        borderRadius: 10,
                                        marginTop: 7,
                                        elevation: 5,
                                        marginBottom: 5
                                    }}>
                                        <Text style={{
                                            fontFamily: 'robotobold',
                                            fontSize: 17,
                                            color: Config.sectionsColor
                                        }}>{item.title}</Text>
                                        <View style={{height: 12}}/>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{width: '50%'}}>
                                                {item.mode == 'open' ? <Text style={{
                                                    color: Config.greenColor,
                                                    fontFamily: 'robotoregular'
                                                }}>{item.mode}</Text> : null}
                                                {item.mode == 'waiting' ? <Text style={{
                                                    color: 'orange',
                                                    fontFamily: 'robotoregular'
                                                }}>{item.mode}</Text> : null}
                                                {item.mode == 'close' ? <Text style={{
                                                    color: 'red',
                                                    fontFamily: 'robotoregular'
                                                }}>{item.mode}</Text> : null}
                                            </View>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                                width: '50%'
                                            }}>
                                                <Text style={{
                                                    fontFamily: 'robotoregular',
                                                    color: Config.grayColor
                                                }}>{item.date}</Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }}/>
                    )
                }else{
                    return(
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/tickets.png')}/>
                        </View>
                    )
                }
            }
            if (this.state.tabIndex == 1) {
                if(this.state.data.comments && this.state.data.comments.length > 0) {
                    return (
                        <FlatList data={this.state.data.comments} renderItem={({item}) => {
                            return (
                                <Card containerStyle={{borderRadius: 10, marginTop: 7, elevation: 5, marginBottom: 5}}>
                                    <Text style={{
                                        fontFamily: 'robotobold',
                                        color: Config.sectionsColor,
                                        fontSize: 17
                                    }}>{item.user}</Text>
                                    <Text style={{
                                        fontFamily: 'robotolight',
                                        color: Config.grayColor,
                                        fontSize: 11
                                    }}>{item.course}</Text>
                                    <View style={{height: 12}}/>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 13, color: Config.sectionsColor}}>{item.comment}</Text>
                                        <View style={{height: 5}}/>
                                        <Text style={{
                                            fontFamily: 'robotolight',
                                            color: Config.grayColor,
                                            fontSize: 11,
                                            textAlign: 'right'
                                        }}>{item.date}</Text>
                                    </View>
                                </Card>
                            )
                        }}/>
                    )
                }else{
                    return(
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/comments.png')}/>
                        </View>
                    )
                }
            }
            if (this.state.tabIndex == 2) {
                if(this.state.data.supports && this.state.data.supports.length > 0) {
                    return (
                        <FlatList data={this.state.data.supports} renderItem={({item}) => {
                            return (
                                <Card containerStyle={{borderRadius: 12, marginTop: 7, elevation: 5, marginBottom: 5}}>
                                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.setState({modalReply:true,replyComment:item.comment,replyUser:item.user,replyId:item.id,user_id:item.user_id,content_id:item.content_id,messages:item.messages})}}>
                                    <Text style={{
                                        fontFamily: 'robotobold',
                                        color: Config.sectionsColor,
                                        fontSize: 17
                                    }}>{item.user}</Text>
                                    <Text style={{
                                        fontFamily: 'robotolight',
                                        color: Config.grayColor,
                                        fontSize: 11
                                    }}>{item.course}</Text>
                                    <View style={{height: 12}}/>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 13, color: Config.sectionsColor}}>{item.comment}</Text>
                                        <View style={{height: 5}}/>
                                        <Text style={{
                                            fontFamily: 'robotolight',
                                            color: Config.grayColor,
                                            fontSize: 11,
                                            textAlign: 'right'
                                        }}>{item.date}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </Card>
                            )
                        }}/>
                    )
                }else{
                    return(
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/productssupport.png')}/>
                        </View>
                    )
                }
            }
        }else{
            return null;
        }
    }

    render(){

        return(
            this.state.data != null?
                <View style={{flex:1, backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                        leftContainerStyle={{bottom:14, left:6}}
                        rightComponent={<Icon name='plus' color='#fff' type='feather' onPress={()=>{this.setState({new:true})}} />}
                        rightContainerStyle={{bottom:14, right:6}}
                        centerComponent={{text:Lng.support,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <SegmentedControlTab
                        values={[Lng.support, Lng.comments, Lng.Students]}
                        onTabPress={(index)=>{this.setState({tabIndex:index})}}
                        selectedIndex={this.state.tabIndex}
                        firstTabStyle={{borderRadius:0,borderBottomLeftRadius:0}}
                        tabsContainerStyle={{padding:15}}
                        tabStyle={{borderWidth:0,backgroundColor:'transparent',borderRadius:0,padding:24,borderBottomWidth:2,borderBottomColor:'transparent'}}
                        tabTextStyle={{color:Config.grayColor,paddingBottom:5,fontFamily:'robotobold'}}
                        activeTabStyle={{borderBottomWidth:2,backgroundColor:'transparent',borderBottomColor:Config.primaryColor}}
                        activeTabTextStyle={{color:Config.primaryColor}}
                        lastTabStyle={{borderBottomRightRadius:0}}
                    />
                    {this._tabRender()}
                    <View style={{height:10}}/>
                    <Modal visible={this.state.new} onRequestClose={()=>{this.setState({new:false})}}>
                        <View style={{flex:1,backgroundColor:Config.background}}>
                            <Header
                                containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                                backgroundColor={Config.primaryColor}
                                leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.setState({new:false});}} />}
                                leftContainerStyle={{bottom:14,left:6}}
                                centerComponent={{text:Lng.new_ticket,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                                centerContainerStyle={{bottom:13}}
                            />
                            <Input onChangeText={(txt)=>{this.setState({ticketTitle:txt})}} value={this.state.ticketTitle} placeholder={'Title...'}/>
                            <View style={{height:5}}/>
                            <Input onChangeText={(txt)=>{this.setState({ticketTxt:txt})}} multiline={true} scrollEnabled={true} containerStyle={{height:'100%',width:'100%',borderWidth:0,flex:1}} inputContainerStyle={{borderBottomWidth:0}} placeholder={Lng.write_message}/>
                            {(this.state.ticketFile != null && this.state.ticketFile.name != undefined)?
                                <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:40,bottom:60,left:0,backgroundColor:'orange'}}>
                                    <View style={{width:'80%',paddingLeft:15,paddingRight:5,paddingTop:10}}>
                                        <Text style={{color:'#fff',fontFamily:'robotobod'}}>{this.state.ticketFile.name}</Text>
                                    </View>
                                    <View style={{width:'20%',paddingLeft:5,paddingRight:15,paddingTop:10}}>
                                        <Icon name={'trash'} size={20} color={'#fff'} onPress={()=>{this.setState({ticketFile:null})}} containerStyle={{alignSelf:'flex-end'}} type={'font-awesome'}/>
                                    </View>
                                </View>
                                :null}
                            <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                                <View style={{width:'60%',paddingLeft:15,paddingRight:5,paddingTop:10}}>
                                    <Button onPress={()=>{this.sendData()}} title={Lng.Send} buttonStyle={{width:'100%',backgroundColor:Config.secondaryColor,borderRadius:20,elevation:5}}/>
                                </View>
                                <View style={{width:'40%',paddingLeft:5,paddingRight:15,paddingTop:10}}>
                                    <Button title={Lng.Attach} onPress={()=>{this.attachFile()}} buttonStyle={{width:'100%',backgroundColor:'orange',borderRadius:20,elevation:5}}/>
                                </View>
                            </View>
                        </View>
                        <FlashMessage type="danger" ref="modalFlash" position="top" />
                        <Spinner visible={this.state.spinner}/>
                    </Modal>
                    <Modal onRequestClose={()=>{this.setState({modalReply:false})}} visible={this.state.modalReply}>
                        <View style={{flex:1,backgroundColor:'#fcfcfc'}}>
                            <FlatList data={this.state.messages} renderItem={({item})=>{return(
                                <Card containerStyle={{borderRadius:10,padding:10}}>
                                    <Text style={{fontSize:18,fontWeight:'bold'}}>{item.user}</Text>
                                    <View style={{height:10,flex:1,width:'100%'}}/>
                                    <Text>{item.comment}</Text>
                                </Card>
                            )}}/>
                            <View style={{height:60,backgroundColor:'#fcfcfc'}}/>
                        </View>
                        <View style={Style.replyBox}>
                            <View style={{width:'80%'}}>
                                <TextInput value={this.state.comment} onChangeText={(txt)=>{this.setState({comment:txt})}} multiline={true} style={{paddingLeft:10,paddingRight:10}}/>
                            </View>
                            <View style={{width:'20%',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.sendSupportReply()}}>
                                <Text style={{color:'grey',textAlign:'center'}}>{Lng.Send}</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <Spinner visible={this.state.spinner}/>
                    </Modal>
                </View>
                :
                <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}

const Style = StyleSheet.create({
    replyBox:{
        backgroundColor:'#E7E8E8',
        flex:1,
        minHeight:50,
        height:'auto',
        position:'absolute',
        elevation:6,
        borderTopColor:'gray',
        bottom:0,
        width:'100%',
        flexDirection:'row'
    }
})

