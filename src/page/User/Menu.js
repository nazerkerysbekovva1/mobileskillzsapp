import React from 'react';
import {FlatList, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Config} from '../../Config';
import {Lng} from '../../Language';

export default class Menu extends React.Component{
    state = {
        menus : [
            {index:2,icon:'video', text:Lng.Courses,route:"Courses"},
            {index:3,icon:'bar-chart-2', text:Lng.Financial,route:"Financial"},
            {index:4,icon:'film', text:Lng.Channels,route:"Channel"},
            {index:5,icon:'headphones', text:Lng.support,route:"TicketList"}
        ],
        menusUser : [
            {index:2,icon:'video', text:Lng.Courses,route:"Courses"},
            {index:3,icon:'bar-chart-2', text:Lng.Financial,route:"Financial"},
            {index:5,icon:'headphones', text:Lng.support,route:"TicketList"}
        ]
    }
    render(){
        return(
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={(this.props.vendor == 1)?this.state.menus:this.state.menusUser}
                    renderItem={({item})=>{
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate(item.route)}}>
                            <View style={Style.item}>
                                <Icon size={19} containerStyle={Style.itemIcon} name={item.icon} type={'feather'}/>
                                <Text style={Style.itemText}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}/>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    item: {
        backgroundColor: '#CAD8EF',
        width: 'auto',
        height: 42,
        margin: 5,
        padding: 22,
        paddingTop:10,
        borderRadius: 30,
        elevation:2
    },
    itemIcon:{
        position:'absolute',
        left: 15,
        top:10
    },
    itemText:{
        paddingLeft : 19,
        fontFamily:'robotobold',
        color: Config.primaryColor
    }
})
