import React from 'react';
import {BackHandler, FlatList, Modal, ScrollView, Text, View,Switch} from 'react-native';
import {Button, ButtonGroup, Header, Icon} from 'react-native-elements';
import Product from '../../component/Product';
import { ActivityIndicator } from 'react-native';
import {getCategory} from '../../Functions';
import {Config} from '../../Config';
import {Lng} from '../../Language';



class Archive extends React.PureComponent{
    state = {
        data            : null,
        filter_modal    : false,
        filter_price    : 2,
        filter_type     : 3,
        filter_physical : false,
        filter_support  : false,
        filter_discount : false,
        filter_order    : 0
    }
    constructor(props){
        super(props)
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.setState({data: null});
        this.setState({data : await getCategory(this.props.route.params.catId,
                [{
                    price   : this.state.filter_price,
                    type    : this.state.filter_type,
                    physical: this.state.filter_physical,
                    support : this.state.filter_support,
                    discount: this.state.filter_discount,
                    order   : this.state.filter_order
                }])}
                );
        console.log(this.state.data);
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.setState({data: null});
            this.setState({
                data: await getCategory(this.props.route.params.catId, [{
                    price   : this.state.filter_price,
                    type    : this.state.filter_type,
                    physical: this.state.filter_physical,
                    support : this.state.filter_support,
                    discount: this.state.filter_discount,
                    order   : this.state.filter_order
                }])
            });
        });
    }

    async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        await this._unsubscribe();
    }

    async refreshData(){
        this.setState({data: null});
        this.setState({
            data: await getCategory(this.props.route.params.catId, [{
                price   : this.state.filter_price,
                type    : this.state.filter_type,
                physical: this.state.filter_physical,
                support : this.state.filter_support,
                discount: this.state.filter_discount,
                order   : this.state.filter_order
            }])
        });
    }

    render(){
        return (
            <View style={{backgroundColor:Config.background,flex:1}}>
                <Header
                    containerStyle={{height:60}}
                    backgroundColor={Config.primaryColor}
                    leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack();}} />}
                    leftContainerStyle={{bottom:14,left:14}}
                    centerComponent={{text:this.props.route.params.title,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                    centerContainerStyle={{bottom:13}}
                    rightComponent={<Icon name='filter' color='#fff' type='foundation' onPress={()=>{this.setState({filter_modal:true})}} />}
                    rightContainerStyle={{bottom:14, right: 14}}
                />
                {
                this.state.data != null ?
                    <FlatList style={{marginBottom:5,marginTop:15}} data={this.state.data} renderItem={({item})=>{
                        return (
                            <Product navigation={this.props.navigation} item={item}/>
                        )
                    }}/>
                :
                    <ActivityIndicator style={{alignSelf:'center',top:100}}/>
                }
                <Modal onRequestClose={()=>{this.setState({filter_modal:false})}} animationType={'slide'} visible={this.state.filter_modal}>
                    <View style={{flex:1,padding:10}}>
                        <ScrollView>
                            <ButtonGroup selectedIndex={this.state.filter_price} buttons={[Lng.Paid,Lng.Free,Lng.All]} onPress={(index)=>{this.setState({filter_price:index})}}/>
                            <View style={{height:15}}/>
                            <ButtonGroup selectedIndex={this.state.filter_type} buttons={[Lng.Single,Lng.Webinar,Lng.Course,Lng.All]} onPress={(index)=>{this.setState({filter_type:index})}}/>
                            <View style={{height:13}}/>
                            <View style={{flex:1,flexDirection:'row',padding:12}}>
                                <View style={{flex:1}}><Text>{Lng.Physical}</Text></View>
                                <View style={{flex:1}}><Switch style={{top:4}} value={this.state.filter_physical} onValueChange={(value)=>{this.setState({filter_physical:value})}}/></View>
                            </View>
                            <View style={{height:13}}/>
                            <View style={{flex:1,flexDirection:'row',padding:12}}>
                                <View style={{flex:1}}><Text>{Lng.Support}</Text></View>
                                <View style={{flex:1}}><Switch style={{top:4}} value={this.state.filter_support} onValueChange={(value)=>{this.setState({filter_support:value})}}/></View>
                            </View>
                            <View style={{height:13}}/>
                            <View style={{flex:1,flexDirection:'row',padding:12}}>
                                <View style={{flex:1}}><Text>{Lng.filter_discount}</Text></View>
                                <View style={{flex:1}}><Switch style={{top:4}} value={this.state.filter_discount} onValueChange={(value)=>{this.setState({filter_discount:value})}}/></View>
                            </View>
                            <View style={{height:13}}/>
                            <ButtonGroup buttons={['Newest','Oldest','Ascending Price','Descending Price','Most Sold','Most Popular']} innerBorderStyle={{width:0}} selectedIndex={this.state.filter_order}  buttonStyle={{flexDirection:'column',height:50,borderWidth:0,borderLeftWidth:0,borderRightWidth:0}} textStyle={{textAlign:'left'}} containerStyle={{flexDirection:'column',height:'auto',borderWidth:2}} vertical={true} onPress={(index)=>{this.setState({filter_order:index})}}/>
                        </ScrollView>
                        <Button title={Lng.Filter} onPress={()=>{this.refreshData();this.setState({filter_modal:false});}} style={{position:'absolute',bottom:0,height:30}}/>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default Archive;


