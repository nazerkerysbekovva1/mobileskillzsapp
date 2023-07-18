import React from 'react';
import {ActivityIndicator, BackHandler, FlatList, Image, View} from 'react-native';
import {Config} from '../../../Config';
import {Header, Icon} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getChannel, getCourses} from '../../../Functions';
import ChannelBox from '../../../component/ChannelBox';
import {Lng} from '../../../Language';

export default class Channel extends React.Component{

    state = {
        data : null
    }

    async componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        let d = await getChannel();
        this.setState({data: d});
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
            this.state.data != null?
                <View style={{flex:1,backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60,paddingLeft:15,paddingRight:15}}
                        backgroundColor={Config.primaryColor}
                        leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={()=>{this.props.navigation.goBack()}} />}
                        leftContainerStyle={{bottom:14, left:14}}
                        centerComponent={{text:Lng.Channel,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                    <View style={{height:10}}/>
                    {(this.state.data.channels && this.state.data.channels.length > 0) ?
                        <FlatList data={this.state.data.channels} renderItem={({item}) => {
                            return (<ChannelBox item={item}/>)
                        }}/>
                        :
                        <View>
                            <Image style={{width:250,height:250,alignSelf:'center',marginTop:40}} source={require('../../../../assets/img/state/channel.png')}/>
                        </View>
                    }
                    <View style={{height:15}}/>
                </View>
                :
                <View style={{justifyContent:'center', flex:1, backgroundColor:Config.background}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}
