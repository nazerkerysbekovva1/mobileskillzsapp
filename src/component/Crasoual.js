import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { Config, Texts } from '../Config';
import FastImage from 'react-native-fast-image'
import { Lng } from '../Language';


export default class Crasoual extends React.Component {
	render() {
		return (
			this.props.data ?
				<View>
					{this.props.title != '' ? <Text style={{ padding: 15, fontWeight: 'bold', fontSize: 20, color: Config.sectionsColor }}>{this.props.title}</Text> : null}
					<View>
						<FlatList
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={this.props.data}
							renderItem={({ item }) =>
								<TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.navigate('Product', { id: item.id }) }}>
									<Card
										imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, width: 242, height: 129 }}
										containerStyle={{ width: 240, height: 218, margin: 5, marginLeft: 20, marginBottom: 10, padding: 0, marginTop: 0, borderRadius: 15, overflow: 'hidden', elevation: 5 }}
										image={{ uri: Config.url + '/' + item.thumbnail }}>
										{(item.type == "webinar" || item.type == "course+webinar") ? <View style={style.live}><Text style={{ color: '#fff', fontWeight: 'bold' }}>{Lng.live}</Text></View> : null}
										<View style={{ padding: 0, margin: 0 }}>
											<Text numberOfLines={1} style={{ marginTop: -5, marginBottom: 0, paddingBottom: 0, fontSize: 16, color: Config.sectionsColor, fontFamily: 'robotobold' }}>
												{item.title}
											</Text>
										</View>
										<View style={{ padding: 0, paddingTop: 3, paddingBottom: 3 }}>
											<Text style={{ color: Config.greenColor, fontSize: 16, fontWeight: 'bold' }}>{item.price == 0 ? 'Free' : item.currency + item.price}</Text>
											<View style={{ height: 3 }} />
											<Text style={{ color: Config.grayColor, fontSize: 16 }}>{item.duration}</Text>
										</View>
									</Card>
								</TouchableOpacity>
							}
						/>
					</View>
					<View style={{ height: 15 }} />
				</View>
				: null
		);
	}

}

let style = StyleSheet.create({
	iconHolder: {
		width: 'auto',
		alignItems: 'flex-start',
		flex: 1
	},
	iconHolderIcon: {
		left: 0,
	},
	iconHolderText: {
		left: 28,
		color: Config.colorIcon
	},
	iconHolderTwo: {
		width: 'auto',
		right: 4,
		alignItems: 'flex-start',
		flex: 1
	},
	iconHolderIconTwo: {
		left: 0,
		top: 10
	},
	iconHolderTextTwo: {
		left: 25,
		color: Config.colorIcon2
	},
	live: {
		backgroundColor: '#1FBD50',
		width: 80,
		height: 40,
		position: 'absolute',
		left: 0,
		top: -130,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomRightRadius: 15,
		elevation: 10
	}
});
