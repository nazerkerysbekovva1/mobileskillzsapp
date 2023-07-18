import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Config } from '../Config';
import {  Image } from 'react-native';
import { Lng } from '../Language';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Help extends React.Component {

	state = {
		pages: [
			{
				backgroundColor: Config.onboarding1Color,
				image: <Image style={{ height: 300, width: 300 }} source={require('../../assets/img/onboarding1.png')} />,
				title: Lng.onboarding1,
				subtitle: Lng.onboarding1_sub
			},
			{
				backgroundColor: Config.onboarding2Color,
				image: <Image style={{ height: 300, width: 300 }} source={require('../../assets/img/onboarding2.png')} />,
				title: Lng.onboarding2,
				subtitle: Lng.onboarding2_sub
			},
			{
				backgroundColor: Config.onboarding3Color,
				image: <Image style={{ height: 300, width: 300 }} source={require('../../assets/img/onboarding3.png')} />,
				title: Lng.onboarding3,
				subtitle: Lng.onboarding3_sub
			},
		]
	}

	async goToRoute() {
		await AsyncStorage.setItem('help', '1');
		this.props.navigation.navigate('Route');
	}

	render() {
		return (
			<Onboarding
				pages={this.state.pages}
				onDone={() => {
					this.goToRoute();
				}}
				onSkip={() => {
					this.goToRoute();
				}}
			/>
		)
	}
}
