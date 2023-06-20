import React from 'react';
import {ActivityIndicator, BackHandler, FlatList, Image, View} from 'react-native';
import {Config} from '../../../Config';
import {Header, Icon} from 'react-native-elements';
import {getCourses} from '../../../Functions';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Product from '../../../component/Product';
import MyCourses from '../../../component/MyCourses';
import MyPurchases from '../../../component/MyPurchases';
import {Lng} from '../../../Language';

export default class Courses extends React.Component{
    state = {
        data    : null,
        tabIndex: 0,
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        let d = await getCourses();
        let gateway =
        this.setState({data: d});
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    _tabRender = ()=> {
        if (this.state.data != null) {
            if (this.state.tabIndex == 0) {
                if(this.state.data.courses && this.state.data.courses.length > 0) {
                    return (
                        <FlatList data={this.state.data.courses} renderItem={({item}) => {
                            return (
                                <MyCourses navigation={this.props.navigation} item={item}/>
                            )
                        }}/>
                    )
                }else{
                    return(
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/Videos.png')}/>
                        </View>
                    )
                }
            }
            if (this.state.tabIndex == 1) {
                if(this.state.data.purchases && this.state.data.purchases.length > 0) {
                    return (
                        <FlatList data={this.state.data.purchases} renderItem={({item}) => {
                            return (
                                <MyPurchases navigation={this.props.navigation} item={item}/>
                            )
                        }}/>
                    )
                }else{
                    return(
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/bought.png')}/>
                        </View>
                    )
                }
            }
        }
    }

    render(){
        return(
            this.state.data != null?
                <View style={{flex:1,backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack()}} />}
                        leftContainerStyle={{bottom:14, left: 14}}
                        centerComponent={{text:Lng.Courses,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <SegmentedControlTab
                        values={[Lng.My_courses, Lng.My_purchases]}
                        onTabPress={(index)=>{this.setState({tabIndex:index})}}
                        selectedIndex={this.state.tabIndex}
                        firstTabStyle={{borderRadius:0,borderBottomLeftRadius:0}}
                        tabsContainerStyle={{padding:15}}
                        tabStyle={{borderWidth:0,backgroundColor:'transparent',borderRadius:0,padding:24,borderBottomWidth:2,borderBottomColor:'transparent',borderColor:'transparent'}}
                        tabTextStyle={{color:Config.grayColor,paddingBottom:5,fontFamily:'robotobold'}}
                        activeTabStyle={{borderBottomWidth:2,backgroundColor:'transparent',borderBottomColor:Config.primaryColor}}
                        activeTabTextStyle={{color:Config.primaryColor}}
                        lastTabStyle={{borderBottomRightRadius:0}}
                    />
                    {this._tabRender()}
                    <View style={{height:10}}/>
                </View>
                :
                <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}
