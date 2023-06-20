import React from 'react';
import { View, ScrollView } from 'react-native';
import Input from './Input';
import MyButton from './MyButton';


export default class ComponentList extends React.Component {
	render() {
		return (
			<View>
				<Input style={{ padding: 10 }} label={Lng.Email_address} icon={'ios-mail'} />
				<MyButton containerStyle={{ padding: 10 }} text={Lng.login} />
			</View>
		)
	}
}
