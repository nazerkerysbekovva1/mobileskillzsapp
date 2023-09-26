import React, { useState, useEffect } from 'react';
import { Image, Text } from 'react-native-elements';
import { View, TextInput, Dimensions, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Config } from '../../../Config';
import { API_ENDPOINTS } from '../../../data/client/endpoints';

import KeyboardManager from 'react-native-keyboard-manager';
// import {PreviousNextView} from 'react-native-keyboard-manager';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';

import { useMutation } from 'react-query';

import { register } from '../../../data/client/http-client';

interface NavigationProps {
	navigation: any;
}

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
}

export const Signup: React.FC<NavigationProps> = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [full_name, setFull_name] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirmation, setPassword_confirmation] = useState('');
  
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	  };
    
    // google sign in
      const [user, setUser] = useState({})
      useEffect(() => {
        GoogleSignin.configure({
          webClientId: '284738965177-2m0ovbgi5polvea5ipis0cq1og69ebbb.apps.googleusercontent.com',
          offlineAccess: true,
          forceCodeForRefreshToken: true,
        });
        isSignedIn()
      }, [])

      async function handleSignInGoogle() {
        console.log('Sign in with Google click');
        try{
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('due___', userInfo)
          setUser(userInfo);
          navigation.navigate('App');
        } catch(error: any){
          console.log('Message___', error.message);
          if(error.code === statusCodes.SIGN_IN_CANCELLED){
            console.log('User Canceled the Login Flow');
          } else if(error.code === statusCodes.IN_PROGRESS){
            console.log('Signing In');
          } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
            console.log('Play Services Not Avaliable');
          } else{
            console.log('Some other Error Happened');
          }
        }
      };

      const isSignedIn = async() => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if(!!isSignedIn){
          getCurrentUserInfo()
        } else{
          console.log('Please Sign up');
        }
      }

      const getCurrentUserInfo = async() => {
        try{
          const userInfo = await GoogleSignin.signInSilently();
          console.log('edit___', user);
          setUser(userInfo);
        } catch(error: any) {
          if(error.code === statusCodes.SIGN_IN_REQUIRED){
            // Alert.alert('User has not signed in yest');
            console.log('User has not signed in yest')
          } else{
            // Alert.alert('Something went wrong!');
            console.log('Something went wrong!');
          }
        }
      }

      const googleSignOut = async () => {
        try{
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setUser({});
        } catch(error) {
          console.log(error);
        }
      }

    // sign up

    const mutation = useMutation(register, {
        onSuccess: () => {
            navigation.navigate("Login");
        }
    })

    const handleSignup = async () => {
      mutation.mutate({
        email, full_name, password, password_confirmation
       })
    }
    
    // apple sign in
    async function handleSignInApple() {
        console.log('Sign in with Apple click');
        try {
            if (!appleAuth.isSupported) {
              console.log(
                'Apple Sign In is not supported on this device or iOS version.',
              );
              return;
            }
      
            const isSignedIn = await AsyncStorage.getItem('isSignedIn');
      
            if (isSignedIn) {
              navigation.navigate('App');
              return;
            }
      
            const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
      
            const {email, fullName} = appleAuthRequestResponse;
      
            console.log('User Email:', email);
            console.log('User Full Name:', fullName);
            await AsyncStorage.setItem('isSignedIn', 'true');
            navigation.navigate('App');
          } catch (error: any) {
            if (error.code === appleAuth.Error.CANCELED) {
              console.log('Sign-in cancelled');
            } else {
              console.log('Error:', error);
            }
          }
      };

      const windowWidth = Dimensions.get('window').width;
      const eyeIconSize = Math.floor(windowWidth / 20);

		return (
			<SafeAreaView className="flex-1 bg-black">
				<View className="m-8 flex-1 flex-col justify-between py-9">
                    <View className='flex items-center'>
                        <Image source={require('../../../../assets/icon/icon-white.png')} className="w-64 h-10 mt-16"/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-10 right-0">
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
                            placeholder="Full Name" 
                            value={full_name} 
                            onChangeText={setFull_name}
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
                            className='absolute right-0 pr-3'
                            style={{top: 168}}
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
                            value={password_confirmation} 
                            onChangeText={setPassword_confirmation}
                            placeholderTextColor="black"  
                            className="mt-5 bg-white rounded-md text-black font-bold px-4 py-1"/>
                         <TouchableOpacity
                            className='absolute right-0 pr-3'
                            style={{top: 225}}
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

                          {!email || !full_name || !password || password !== password_confirmation &&
                              ( <Text className='text-red-500 -mb-3'>Something wents wrong. please check</Text> )}
                        <TouchableOpacity 
                          onPress={handleSignup} 
                          className="mt-5 bg-custom-Green rounded-md items-center py-2">
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
