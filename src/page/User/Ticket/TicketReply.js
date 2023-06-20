import React from 'react';
import {ActivityIndicator, BackHandler, FlatList, Linking, Modal, View} from 'react-native';
import {Config} from '../../../Config';
import {Button, Card, Header, Icon, Input, Text} from 'react-native-elements';
import {getMessages, userData} from '../../../Functions';
import DocumentPicker from 'react-native-document-picker';
import FlashMessage from 'react-native-flash-message';
import {Lng} from '../../../Language';

export default class TicketReply extends React.Component{

    state = {
        reply    : false,
        replyTxt : null,
        replyFile: null,
        username : null,
        token    : null,
        data     : null
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.setState({data: this.props.route.params.messages});
        let user = await userData();
        this.setState({username:user['name']});
        this.setState({token:user['token']});
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    async refreshData(){
        this.setState({data: null});
        let messages = await getMessages(this.props.route.params.id);
        this.setState({data : messages.messages});
    }
    async attachFile(){
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.zip,DocumentPicker.types.images,DocumentPicker.types.pdf],
            });
            this.setState({replyFile:{uri:res.uri,type:res.type,name:res.name}})
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    async sendReply(){
        if(this.state.replyTxt == null || this.state.replyTxt == ''){
            this.refs.modalFlash.showMessage('Empty field!');
            return;
        }

        let data = new FormData();
        data.append('token',this.state.token);
        data.append('msg',this.state.replyTxt);
        data.append('ticket',this.props.route.params.id);
        data.append('file',this.state.replyFile);
        let response = await fetch(Config.url+'/api/v'+Config.version+'/user/support/reply', {
            method  : 'POST',
            body    : data
        });

        response = await response.json();
        if(response != undefined && response.status == '1'){
            this.refreshData();
            this.props.route.params.updateData();
            this.setState({reply: false});
        }else{
            this.refs.modalFlash.showMessage(response.error);
            return;
        }
    }
    async closeTicket(id){
        let data;
        data = await fetch(Config.url + '/api/v' + Config.version + '/user/support/action', {
            method : 'POST',
            headers: {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body: JSON.stringify({
                token   : this.state.token,
                secret  : Config.secret,
                id      : id,
                action  : 'close'
            })
        })

        data = await data.json();
        if(data != undefined && data.status == '1'){
            this.props.route.params.updateData();
            this.props.navigation.goBack();
        }else{
            console.log(data);
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
                    leftContainerStyle={{bottom:14,left:6}}
                    centerComponent={{text:this.props.route.params.title,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                    centerContainerStyle={{bottom:13}}
                />
                <FlatList data={this.state.data} renderItem={({item})=>{
                    return(
                        <Card containerStyle={{borderRadius:8,marginTop:7}}>
                            {item.mode == 'user'?<Text style={{fontFamily: 'robotobold'}}>{this.state.username}</Text>:null}
                            {item.mode == 'admin'?<Text style={{fontFamily: 'robotobold',color:Config.grayColor,fontSize:17}}>Staff</Text>:null}
                            <Text>{item.msg}</Text>
                            {item.attach != null?<Icon name={'paperclip'} containerStyle={{alignSelf:'flex-end'}} size={16} onPress={()=>{Linking.openURL(item.attach)}} type={'font-awesome'}/>:null}
                        </Card>
                    )
                }}/>
                <View style={{height:70}}/>
                <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                    <View style={{width:'60%',paddingLeft:15,paddingRight:5,paddingTop:10}}>
                        <Button onPress={()=>{this.setState({reply:true})}} title={'Reply'} buttonStyle={{width:'100%',backgroundColor:Config.secondaryColor,borderRadius:20,elevation:5}}/>
                    </View>
                    <View style={{width:'40%',paddingLeft:5,paddingRight:15,paddingTop:10}}>
                        <Button title={Lng.close} buttonStyle={{width:'100%',backgroundColor:'#FF4B4B',borderRadius:20,elevation:5}} onPress={()=>{this.closeTicket(this.props.route.params.id)}}/>
                    </View>
                </View>
                <Modal onRequestClose={()=>{this.setState({reply:false})}} visible={this.state.reply}>
                    <View style={{flex:1,backgroundColor:Config.background}}>
                        <Header
                            containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                            backgroundColor={Config.primaryColor}
                            leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.setState({reply:false});}} />}
                            leftContainerStyle={{bottom:14,left:6}}
                            centerComponent={{text:Lng.reply_message,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                            centerContainerStyle={{bottom:13}}
                        />
                        <Input onChangeText={(txt)=>{this.setState({replyTxt:txt})}} multiline={true} scrollEnabled={true} containerStyle={{height:'100%',width:'100%',borderWidth:0,flex:1}} inputContainerStyle={{borderBottomWidth:0}} placeholder={Lng.write_message}/>
                        {(this.state.replyFile != null && this.state.replyFile.name != undefined)?
                            <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:40,bottom:60,left:0,backgroundColor:'orange'}}>
                                <View style={{width:'80%',paddingLeft:15,paddingRight:5,paddingTop:10}}>
                                    <Text style={{color:'#fff',fontFamily:'robotobold'}}>{this.state.replyFile.name}</Text>
                                </View>
                                <View style={{width:'20%',paddingLeft:5,paddingRight:15,paddingTop:10}}>
                                    <Icon name={'trash'} size={20} color={'#fff'} onPress={()=>{this.setState({replyFile:null})}} containerStyle={{alignSelf:'flex-end'}} type={'font-awesome'}/>
                                </View>
                            </View>
                        :null}
                        <View style={{elevation:4,flex:1, flexDirection:'row',position:'absolute',width:'100%',height:60,bottom:0,left:0,backgroundColor:'#fff'}}>
                            <View style={{width:'60%',paddingLeft:15,paddingRight:5,paddingTop:10}}>
                                <Button onPress={()=>{this.sendReply()}} title={Lng.Send} buttonStyle={{width:'100%',backgroundColor:Config.secondaryColor,borderRadius:20,elevation:5}}/>
                            </View>
                            <View style={{width:'40%',paddingLeft:5,paddingRight:15,paddingTop:10}}>
                                <Button title={Lng.Attach} onPress={()=>{this.attachFile()}} buttonStyle={{width:'100%',backgroundColor:'orange',borderRadius:20,elevation:5}}/>
                            </View>
                        </View>
                    </View>
                    <FlashMessage type="danger" ref="modalFlash" position="top" />
                </Modal>
            </View>
            :
            <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                <ActivityIndicator/>
            </View>
        )
    }
}
