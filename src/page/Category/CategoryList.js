import React from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import {returnData} from '../../Functions';
import {Card, Header, Icon, Image} from 'react-native-elements';
import {Config} from '../../Config';
import FastImage from 'react-native-fast-image'
import {Lng} from '../../Language';

export default class CategoryList extends React.Component{
    state = {
        data : null
    }

    async componentDidMount() {
        this.setState({data : await returnData()});
    }

    _clickItem = (item) =>{
        if(item.childsCount > 0){
            this.props.navigation.navigate('SubCategoryList',{data:item.childs});
        }else{
            if(item.count <= 0)
                return;

            this.props.navigation.navigate('Archive',{catId:item.id,'title':item.title});
        }

        return;
    }

    render(){
        return(
            this.state.data != null?
                <View style={{backgroundColor:Config.background}}>
                    <Header
                        containerStyle={{height:60}}
                        backgroundColor={Config.primaryColor}
                        centerComponent={{text:Lng.course_categories,numberOfLines:1,style:{color:'#fff',fontFamily:'robotobold'}}}
                        centerContainerStyle={{bottom:13}}
                    />
                <FlatList style={{backgroundColor:Config.background}} data={this.state.data.content.category} renderItem={({item})=>{
                    return (
                        <TouchableOpacity onPress={()=>{this._clickItem(item)}} style={Style.item}>
                            {(typeof item.icon === 'string')?
                            <FastImage source={{uri:item.icon}} style={{position:'absolute',left:10,top:17,width:36,height:36}}/>
                            :null}
                            <View style={{paddingLeft:45}}>
                                <Text style={{fontFamily:'robotobold',fontSize:17,color:Config.sectionsColor}}>{item.title}</Text>
                                <Text style={{fontFamily:'robotolight',fontSize:13,color:Config.grayColor,opacity:0.8}}>{item.count} {Lng.Courses}</Text>
                            </View>
                            {parseInt(item.childsCount) > 0?
                                <Icon containerStyle={{position:'absolute',right:'6%', top:'54%'}} name={'ios-arrow-forward'} type={'ionicon'} color={Config.grayColor}/>
                            :null}
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
    }
});
