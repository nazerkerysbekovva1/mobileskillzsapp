import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default class UrlWebView extends React.Component{
    state={
        webViewHeight:0
    }
    onWebViewMessage = (event: WebViewMessageEvent) => {
        this.setState({webViewHeight: Number(event.nativeEvent.data)})
    }
    _renderLoading = () => {
        return(<View style={{flex:1,justifyContent:'center',height: 300}}><ActivityIndicator/></View>);
    }
    render(){
        return(
            <WebView
                cacheEnabled={true}
                startInLoadingState={true}
                renderLoading={this._renderLoading}
                textZoom={140}
                style={{backgroundColor:'#f2f2f2',height: this.state.webViewHeight}}
                onMessage={this.onWebViewMessage}
                injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
                source={{ uri: this.props.url }} />
        )

    }
}
