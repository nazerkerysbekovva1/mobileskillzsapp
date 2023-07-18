import React from 'react';
import { Config } from '../Config';
import { ActivityIndicator, FlatList, Modal, ScrollView, Text, View } from 'react-native';
import { getData, returnData } from '../Functions';
import { Card, Header, Icon } from 'react-native-elements';

import { Lng } from '../Language';
import Record from '../component/Record';

export default class More extends React.Component {
	state = {
		data: null,
		modal: false
	}

	async componentDidMount() {
		let d = await returnData();
		this.setState({ data: d });
	}

	render() {
		return (
			this.state.data != null ?
				<View style={{ flex: 1, backgroundColor: Config.background }}>
					<ScrollView style={{ padding: 15 }}>

						<Text style={{ fontFamily: 'robotobold', fontSize: 20, color: Config.sectionsColor }}>{Lng.Course_requests}</Text>
						<View style={{ height: 15 }} />
						<FlatList data={this.state.data.records} renderItem={({ item }) => {
							return (<Record onPress={() => { this.setState({ description: item.description, modal: true }) }} data={item} />)
						}} />
						<View style={{ height: 15 }} />
						<Text style={{ fontFamily: 'robotobold', fontSize: 20, color: Config.sectionsColor }}>{Lng.coming_soon_courses}</Text>
						<View style={{ height: 15 }} />
						<FlatList data={this.state.data.requests} renderItem={({ item }) => {
							return (<Record onPress={() => { this.setState({ description: item.description, modal: true }) }} data={item} />)
						}} />
						<View style={{ height: 20 }} />
					</ScrollView>
					<Modal animationType={'slide'} onRequestClose={() => { this.setState({ modal: false }) }} transparent={true} visible={this.state.modal}>
						<View style={{ flex: 1, padding: 25, paddingTop: 100, paddingBottom: 100, backgroundColor: 'rgba(0,0,0,0.6)' }}>
							<View style={{ flex: 1, backgroundColor: '#fff', elevation: 10, borderColor: Config.colorIcon2, borderWidth: 2, borderRadius: 10 }}>
								<Header
									containerStyle={{ height: 60, justifyContent: 'center' }}
									leftContainerStyle={{ bottom: 14, left: 14 }}
									leftComponent={<Icon name='ios-arrow-back' color='#fff' type='ionicon' onPress={() => { this.setState({ modal: false }) }} />}
								/>
								<View style={{ padding: 15 }}>
									<Text style={{ fontFamily: 'robotobold' }}>{this.state.description}</Text>
								</View>
							</View>
						</View>
					</Modal>
				</View>
				:
				<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Config.background }}>
					<ActivityIndicator />
				</View>
		)
	}
}
