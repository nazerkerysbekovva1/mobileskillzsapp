import React from 'react';
import {Card} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

export default class Panel extends React.Component{
    render(){
        return(
            <View style={this.props.style}>
                <Card containerStyle={[this.props.cardStyle,style.card]}>
                    {this.props.children}
                </Card>
            </View>
        )
    }
}

const style = StyleSheet.create({
   card:{
       width:'95%',
       height:'auto',
       borderRadius:10,
       elevation:4,
       alignSelf:'center',
   }
});
