import React from 'react';
import {
    ActivityIndicator,
    BackHandler,
    FlatList, Image,
    Linking,
    Modal,
    Picker, ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {Config} from '../../../Config';
import {Button, Card, Header, Icon, Text} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getFinancial, getUserData, returnData, userData} from '../../../Functions';
import Input from '../../../component/Input';
import {showMessage} from 'react-native-flash-message';
import {Lng} from '../../../Language';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Financial extends React.Component{
    state = {
        user        : null,
        data        : null,
        gateway     : [],
        tabIndex    : 0,
        payGateway  : null,
        payPrice    : 0,
        spinner     : false
    }

    constructor(){
        super();
        this.handleOpenURL = this.handleOpenURL.bind(this);
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        Linking.addEventListener('url', this.handleOpenURL)
        let data    = await getFinancial();
        let gateway = await returnData();
        let user    = await userData();
        this.setState({data:data});
        this.setState({gateway: gateway.gateway});
        this.setState({payGateway: gateway.gateway[0]});
        this.setState({user:user});
        if(this.props.route.params.tab != undefined){
            this.setState({tabIndex:this.props.route.params.tab});
        }
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        Linking.removeEventListener('url', this.handleOpenURL);
    }


    async handleOpenURL(event) {
        const route = event.url.replace(/.*?:\/\//g, '');
        console.log(route);
        if(route == 'failed'){
            showMessage({
                message : Lng.purchase_failed,
                type    : 'danger'
            })
        }
        if(route == 'successfully'){
            this.setState({spinner:true});
            await getUserData();
            let user = await userData();
            await this.setState({user:user});
            await this.setState({spinner:false});
            showMessage({
                message : Lng.successfully_done,
                type    : 'success'
            })
        }
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }


    _tabRender = ()=>{
        if(this.state.data != null) {
            if (this.state.tabIndex == 0) {
                return (
                    (this.state.data.sells && this.state.data.sells.length > 0)?
                        <FlatList data={this.state.data.sells} renderItem={({item})=>{
                        return (
                            <TouchableOpacity>
                                <Card containerStyle={{borderRadius:10,marginTop:7,elevation:5,marginBottom:5}}>
                                    <Text numberOfLines={1} style={{fontFamily:'robotobold',fontSize:17,color:Config.sectionsColor}}>{item.title}</Text>
                                    <View style={{height:12}}/>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{width:'50%'}}>
                                            <Text style={{color:Config.greenColor,fontFamily:'robotoregular'}}>Income :{item.currency}{item.income}</Text>
                                        </View>
                                        <View style={{width:'50%',alignItems:'flex-end'}}>
                                            <Text style={{fontFamily:'robotolight',color:Config.grayColor}}>{item.date}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}/>
                    :
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/sales.png')}/>
                        </View>

                )
            }
            if (this.state.tabIndex == 1) {
                return (
                    (this.state.data.documents && this.state.data.documents.length > 0)?
                        <FlatList data={this.state.data.documents} renderItem={({item})=>{
                        let color = item.type == 'add'?Config.greenColor:'red';
                        return (
                            <TouchableOpacity>
                                <Card containerStyle={{borderRadius:12,marginTop:7,elevation:5,marginBottom:5}}>
                                    <Text numberOfLines={1} style={{fontFamily:'robotobold',fontSize:17,color:Config.sectionsColor}}>{item.title}</Text>
                                    <View style={{height:12}}/>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{width:'50%'}}>
                                            <Text style={{color:color,fontFamily:'robotoregular'}}>
                                                {item.type == 'add'?'+':'-'}
                                                {item.currency}{item.amount}
                                            </Text>
                                        </View>
                                        <View style={{width:'50%',alignItems:'flex-end'}}>
                                            <Text style={{fontFamily:'robotolight',color:Config.grayColor}}>{item.date}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}/>
                    :
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/financialdocs.png')}/>
                        </View>
                )

            }
            if(this.state.tabIndex == 2){
                return (
                    <View style={{flex:1}}>
                        <ScrollView>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Card containerStyle={[Style.box,{backgroundColor:'#E359DB'}]}>
                                    <Text style={Style.boxText}>{Lng.Payoutable}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.data.currency}{this.state.data.income}</Text>
                                </Card>
                                <Card containerStyle={[Style.box,{backgroundColor:'#33BFFE'}]}>
                                    <Text style={Style.boxText}>{Lng.Account_charge}</Text>
                                    <View style={{height:10}}/>
                                    <Text style={Style.boxCount}>{this.state.data.currency}{this.state.data.credit}</Text>
                                </Card>
                            </View>
                            <View style={{flex:1,padding:20}}>
                                <Text style={{fontFamily:'robotobold'}}>{Lng.Payment_gateway}</Text>
                                <Picker
                                    selectedValue={this.state.payGateway}
                                    onValueChange={(val)=>{this.setState({payGateway: val})}}
                                    style={{borderWidth:1,borderColor:'gray'}}
                                >
                                    {this.state.gateway.map((item, i) => {
                                        return (< Picker.Item label={item} value={item}/>)
                                    })}
                                </Picker>
                                <View style={{height:10}}/>
                                <Input onChangeText={(amount)=>{this.setState({payPrice:amount})}} label={'Amount'} icon={'credit-card'}/>
                                <View style={{height:10}}/>
                        </View>
                        </ScrollView>
                        <View style={{position:'absolute',height:'auto',width:'100%',bottom:0,left:0,padding:15}}>
                            <Button onPress={()=>{this._walletPay()}} title={'Pay'} titleStyle={{fontSize:20}} buttonStyle={{width:'100%',backgroundColor:Config.secondaryColor,borderRadius:25,elevation:5}}/>
                        </View>
                    </View>
                )

            }
        }else{
            return null;
        }
    }

    _walletPay = () => {
        if(this.state.payPrice == 0 || this.state.payPrice == ''){
            showMessage({
                message : Lng.empty_field,
                type    : "danger"
            });
            return;
        }
        let url = Config.url + '/api/v' + Config.version + '/user/wallet/pay?token=' + this.state.user['token'] + '&type=' + this.state.payGateway + '&price=' + this.state.payPrice;
        Linking.openURL(url);
    }

    render(){
        return(
            this.state.data != null?
                <View style={{flex:1, backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                        backgroundColor={'#343871'}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                        leftContainerStyle={{bottom:14,left:4}}
                        centerComponent={{text:Lng.Financial,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:14}}
                    />
                    <SegmentedControlTab
                        values={[Lng.Sales, Lng.Balance, Lng.charge_account]}
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
                    <Spinner visible={this.state.spinner}/>
                </View>
                :
                <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}

const Style = StyleSheet.create({
    box:{
        borderRadius:15,
        height:120,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    boxText:{
        fontFamily: 'robotobold',
        color:'#fafafa',
        fontSize:18
    },
    boxCount:{
        fontFamily: 'robotobold',
        color:'#fafafa',
        fontSize:16,
        alignSelf:'center'
    },
    row: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 35,
        paddingRight: 35,
        marginBottom:5
    },
    inputWrap: {
        flex: 1,
        marginBottom: 10
    },
    inputWrap2: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    label:{
        fontFamily:'robotobold'
    }
})

