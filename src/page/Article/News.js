import React from 'react';
import {View, ScrollView, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Config} from '../../Config';
import {Text} from 'react-native';
import {returnData} from '../../Functions';
import Post from '../../component/Post';
import {Lng} from '../../Language';

export default class News extends React.Component{

    state = {
        data : null
    }

    async componentDidMount(): void {
        this.setState({data : await returnData()});
    }

    render(){
        return(
            this.state.data != null?

                <ScrollView style={Style.container}>
                    {this.state.data.content.news?
                    <View style={{flex:1}}>
                        <Text style={Style.headTitle}>{Lng.Latest_news}</Text>
                        <View style={{height:15}}/>
                        <FlatList data={this.state.data.content.news} renderItem={({item})=>{
                            return <Post navigation={this.props.navigation} data={item}/>;
                        }}/>
                    </View>
                    :null}
                    {this.state.data.content.article?
                    <View style={{flex:1}}>
                        <View style={{height:25}}/>
                        <Text style={Style.headTitle}>{Lng.Latest_articles}</Text>
                        <View style={{height:15}}/>
                        <FlatList data={this.state.data.content.article} renderItem={({item})=>{
                            return <Post navigation={this.props.navigation} data={item}/>;
                        }}/>
                    </View>
                    :null}
                </ScrollView>
            :
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator/>
                </View>
        )
    }
}

const Style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Config.background,
        padding:15
    },
    headTitle:{
        fontSize:20,
        fontFamily:'robotobold',
        color:Config.sectionsColor,
    }
})


