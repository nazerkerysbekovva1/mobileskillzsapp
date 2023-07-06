import React, { useState } from 'react';
import { Image, Text } from 'react-native-elements';
import { View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NavigationProps {
	navigation: any;
}

export const Signup: React.FC<NavigationProps> = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
  
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	  };

    const handleLogin = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
      };
    
      const handleSignInApple = async () => {
        console.log('Sign in with Apple click');
      };
      const handleSignInGoogle = async () => {
        console.log('Sign in with Google click');
      };

      const windowWidth = Dimensions.get('window').width;
      const eyeIconSize = Math.floor(windowWidth / 20);

		return (
			<SafeAreaView className="flex-1 bg-black">
				<View className=" m-8 flex-1 flex-col justify-between py-9">
                    <View className='flex items-center'>
                        <Image source={require('../../../../assets/icon/icon-white.png')} className="w-64 h-15 mt-16 "/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} className="absolute top-10 right-0">
                        <Image source={require('../../../../assets/icon/x.png')} className="w-6 h-6"/>
                    </TouchableOpacity>

                    <View className="mt-5">
                        <Text className="text-lg font-bold text-white">Зарегистрироваться</Text>
                        <TextInput 
                            placeholder="Email" 
                            value={email} 
                            onChangeText={setEmail}
                            placeholderTextColor="black" 
                            className="mt-5 bg-white rounded-md text-black font-bold px-4 py-1"/>
                        <TextInput 
                            placeholder="Пароль" 
                            secureTextEntry={!showLoginPassword} 
                            value={password} 
                            onChangeText={setPassword}
                            placeholderTextColor="black"  
                            className="mt-5 bg-white rounded-md text-black font-bold px-4 py-1"/>
                         <TouchableOpacity
                            className='absolute top-28 right-0 pr-3'
                            onPress={toggleLoginPasswordVisibility}>
                            <Image
                                source={
                                    showLoginPassword
                                    ? require('../../../../assets/icon/eye-on.png')
                                    : require('../../../../assets/icon/eye-off.png')
                                }
                                style={{resizeMode: 'contain', width: eyeIconSize, height: eyeIconSize }}
                            />
                        </TouchableOpacity>
						<TextInput 
                            placeholder="Подтвердить пароль" 
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="black"  
                            className="mt-5 bg-white rounded-md text-black font-bold px-4 py-1"/>
                         <TouchableOpacity
                            className='absolute right-0 pr-3'
                            style={{top: 168}}
                            onPress={toggleConfirmPasswordVisibility}>
                            <Image
                                source={
                                    showConfirmPassword
                                    ? require('../../../../assets/icon/eye-on.png')
                                    : require('../../../../assets/icon/eye-off.png')
                                }
                                style={{resizeMode: 'contain', width: eyeIconSize, height: eyeIconSize }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogin} className="mt-5 bg-custom-Green rounded-md items-center py-2">
                            <Text className="font-bold text-black">Зарегистрироваться</Text>
                        </TouchableOpacity >
                    </View>

                    <View className="mt-5">
                        <View className="flex flex-row items-center">
                            <View className="flex-1 h-px bg-white mx-1"></View>
                            <TouchableOpacity>
                                <Text className="text-base font-bold text-white">Или войдите через</Text>
                            </TouchableOpacity>
                            <View className="flex-1 h-px bg-white mx-1"></View>
                        </View>
                        <View className="flex-row items-center justify-center my-2">
                            <TouchableOpacity onPress={handleSignInGoogle} className="mr-2 w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                <Image source={require('../../../../assets/icon/googleIcon.png')} className='w-6 h-6'/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSignInApple} className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                <Image source={require('../../../../assets/icon/appleIcon.png')} className='w-5 h-6'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text className="text-base font-bold text-custom-Green text-center">Войти в аккаунт</Text>
                    </TouchableOpacity>
                </View>
			</SafeAreaView>
		)

}
