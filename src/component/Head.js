import React from 'react';
import {Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class Head extends React.Component{
    leftComponent = ()=>{
        return(
            <Icon name={'menu'} color={'#fff'} onPress={this.props.openDrawer}/>
        )
    }
    rightComponent = (
        <Icon name={'person'} color={'#fff'} onPress={()=>{}}/>
    )
    render() {
        return (
            <Header
                leftComponent={this.leftComponent()}
                centerComponent={{ text: 'Video', style: { color: '#fff' } }}
                rightComponent={this.rightComponent}
            />
        );
    }
}

