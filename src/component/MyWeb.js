import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

export default class MyWeb extends React.Component{
    state={
        webViewHeight:0
    }
    onWebViewMessage = (event: WebViewMessageEvent) => {
        this.setState({webViewHeight: Number(event.nativeEvent.data)});
    }
    _renderLoading = () => {
        return(<View style={{flex:1,justifyContent:'center',height: 300}}><ActivityIndicator/></View>);
    }
    render(){
        return(
            <AutoHeightWebView
                startInLoadingState={true}
                renderLoading={this._renderLoading}
                textZoom={250}
                style={{marginBottom:80}}
                scalesPageToFit={true}
                onMessage={this.onWebViewMessage}
                source={{ html: '<div style="padding-left: 20px;padding-right: 15px;"><style>img{width: 100%!important;height: auto !important;display: inline-block;}</style>'+this.props.html+'</div>' }} />
        )

    }
}
