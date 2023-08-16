import React from 'react';
import { Image, Text } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NavigationProps {
	navigation: any;
}

export const WelcomePage: React.FC<NavigationProps> = ({ navigation }) => {

		return (
			<SafeAreaView className="flex-1">
				<ImageBackground className="flex-1" source={require('../../assets/welcome.png')}>
					<View className="mx-10 my-5">
						<Image source={require('../../assets/icon/icon-white.png')} className="mt-72 w-64 h-10" style={{tintColor: 'black'}}/>
						<View className="mt-24 space-y-5">
							<Text className="text-black text-2xl font-bold">Короткие лекции по маркетингу, рекламе и продажам </Text>
							<TouchableOpacity onPress={()=>navigation.navigate('AuthStack')} className="rounded-lg bg-black items-center py-3">
								<Text className="text-white">Войти в аккаунт</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>navigation.navigate('WelcomeStack')} className="items-center">
								<Text>Продолжить без входа</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</SafeAreaView>
		)

}
