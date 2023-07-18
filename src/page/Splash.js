import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground, Animated, Image } from 'react-native';
import { getData, returnData } from '../Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {

	// async componentDidMount() {
	// 	let data = await getData();

	// 	console.log('Splash data', data)
	// 	if (data) {
	// 		await AsyncStorage.getItem('help').then((help) => {
	// 			console.log(help);
	// 			if (help == '1') {
	// 				this.props.navigation.navigate('Route');
	// 			} else {
	// 				this.props.navigation.navigate('Help');
	// 			}
	// 		});
	// 	}
	// }

	 {
		const fadeAnim = new Animated.Value(1);

		useEffect(() => {
		  const fadeOut = () => {
			Animated.timing(fadeAnim, {
			  toValue: 0,
			  duration: 1000, 
			  useNativeDriver: true,
			}).start(() => {
			  navigation.replace('MainNavigation'); 
			});
		  };
	  
		  const fadeOutTimer = setTimeout(fadeOut, 3000); 
	  
		  return () => clearTimeout(fadeOutTimer);
		}, []);

		return (
			<ImageBackground style={{ flex: 1 }} source={require('../../assets/img/splash.png')}>
				<Animated.View style={{ 
					opacity: fadeAnim,
					transform: [
						{
						scale: fadeAnim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1],
						}),
						},
					],
					}}>
				</Animated.View>
				<ActivityIndicator color={'white'} style={style.loading} />
			</ImageBackground>
		);
	}
}

let style = StyleSheet.create({
	loading: {
		position: 'absolute',
		bottom: 18,
		left: 0,
		right: 0
	}
})

export default Splash;
