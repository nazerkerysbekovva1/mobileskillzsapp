import React from 'react';
import { View, TextInput, ScrollView, Text, ActivityIndicator, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '../../component/Slider';
import Crasoual from '../../component/Crasoual';
import { returnData } from '../../Functions';
import { Card, Header, Icon, Image } from 'react-native-elements';
// import SearchHeader from 'react-native-search-header';
import { Config } from '../../Config';
import Product from '../../component/Product';
import FastImage from 'react-native-fast-image';
import { Lng } from '../../Language';

export default class Main extends React.PureComponent {

	state = {
		q: null,
		search: null,
		data: null,
		modalSearch: false
	}

	async componentDidMount() {
		this.setState({ data: await returnData() });
	}
	async search(query) {
		this.setState({ search: null });
		if (query.nativeEvent.text == null || query.nativeEvent.text == '') {
			return;
		}
		let content = await fetch(Config.url + '/api/v' + Config.version + '/product/search?q=' + query.nativeEvent.text);
		content = await content.json();
		if (content != undefined && content.status == '1') {
			this.setState({ search: content.data });
		}
	}
	_render = () => {
		if (this.state.data == null)
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
			)
		else
			return (
				<View style={{ flex: 1 }}>
					<Header
						containerStyle={{ height: 60 }}
						backgroundColor={Config.primaryColor}
						rightComponent={<Icon name='search' color='#fff' type='feather' onPress={() => { this.setState({ modalSearch: true }) }} />}
						rightContainerStyle={{ bottom: 14, right: 14 }}
						leftComponent={<Text style={{ color: '#fff', fontFamily: 'robotobold', width: 200 }} numberOfLines={1}>{Lng.brand}</Text>}
						leftContainerStyle={{ bottom: 13, left: 10 }}
					/>
					<ScrollView style={{ flex: 1, backgroundColor: '#eaeaea' }}>
						{/* <View style={{ height: 220, marginTop: 10 }}>
							<Slider navigation={this.props.navigation} data={this.state.data.content.slider} ids={this.state.data.content.slider_id} />
						</View> */}
						{/* <Crasoual navigation={this.props.navigation} data={this.state.data.content.new} title={Lng.newest_courses} />
						<Crasoual navigation={this.props.navigation} data={this.state.data.content.vip} title={Lng.featured_courses} />
						<Crasoual navigation={this.props.navigation} data={this.state.data.content.popular} title={Lng.most_popular_courses} />
						<Crasoual navigation={this.props.navigation} data={this.state.data.content.sell} title={Lng.most_viewed_courses} /> */}
					</ScrollView>
					{/* <Modal animationType={'slide'} visible={this.state.modalSearch} onRequestClose={() => { this.setState({ modalSearch: false }) }}>
						<View style={{ flex: 1, backgroundColor: Config.background }}>
							<TextInput
								refs={'searchHeader'}
								placeholder={Lng.search}
								// placeholderColor ={Config.grayColor}
								autoFocus={true}
								// onEnteringSearch={(txt)=>{this.setState({q:txt})}}
								onChangeText={(t) => { this.search(t) }}
							// headerBgColor={Config.headerBgColor}
							// iconColor={'#fff'}
							// inputColor={'gray'}
							// visibleInitially={true}
							/>
							{this.state.search == null ?
								<ActivityIndicator style={{ marginTop: 150, alignSelf: 'center' }} />
								:
								<FlatList data={this.state.search} style={{ marginTop: 70, marginBottom: 0 }} renderItem={({ item }) => {
									return (
										<TouchableOpacity onPress={() => { this.setState({ modalSearch: false }); this.props.navigation.navigate('Product', { id: item.id }) }}>
											<Card containerStyle={Style.container}>
												<FastImage style={Style.image} source={{ uri: item.thumbnail }} />
												<View style={Style.text}>
													<Text numberOfLines={1} style={{ fontFamily: 'robotobold', fontSize: 17, color: Config.sectionsColor }}>{item.title}</Text>
													<Text style={{ color: Config.greenColor, marginTop: 10, fontSize: 17 }}>{item.currency}{item.price}</Text>
													<Text style={{ color: Config.grayColor, marginTop: 10, fontSize: 17 }}>{item.duration}</Text>
												</View>
											</Card>
										</TouchableOpacity>
									)
								}} />
							}
						</View>
					</Modal> */}
				</View>
			)
	}

	render() {
		return (
			this._render()
		);
	}
}

const Style = StyleSheet.create({
	container: {
		flex: 1,
		height: 105,
		borderRadius: 8,
		padding: 0,
		margin: 10,
		marginBottom: 13,
		marginTop: 0,
		elevation: 5
	},
	image: {
		position: 'absolute',
		left: -1,
		top: 0,
		width: 140,
		height: 105,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},
	text: {
		marginLeft: 150,
		top: 10,
	}
})

