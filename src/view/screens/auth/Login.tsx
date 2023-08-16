import React, { useState, useEffect } from 'react';

import { Image, Text } from 'react-native-elements';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../../component/Icon';

import KeyboardManager from 'react-native-keyboard-manager';
// import {PreviousNextView} from 'react-native-keyboard-manager';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import TouchID from 'react-native-touch-id';

import { login } from '../../../data/client/http-client';

interface NavigationProps {
	navigation: any;
}

// KeyboardManager.setEnable(true);
// KeyboardManager.setEnableAutoToolbar(true);
// KeyboardManager.setToolbarDoneBarButtonItemText('Done');

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
}

export const Login: React.FC<NavigationProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const toggleLoginPasswordVisibility = () => {
        setLoginPassword(loginPassword);
        setShowLoginPassword(!showLoginPassword);
    };
    
  const [firstTime, setFirstTime] = useState(true);

  GoogleSignin.configure({
    webClientId:
      '284738965177-2m0ovbgi5polvea5ipis0cq1og69ebbb.apps.googleusercontent.com',
  });

  const setSignedOutForTesting = async () => {
    AsyncStorage.clear();
  };

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const userData = await login(email, password);
            console.log(userData);
            // await AsyncStorage.setItem('@access_token', userData.token);
            navigation.navigate('App');
            } catch (error) { 
            console.log(error);
          }
      };
    
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

      async function handleSignInGoogle() {
        console.log('Sign in with Google click');
        try {
            if (firstTime) {
              setFirstTime(false);
              await setSignedOutForTesting();
            }
      
            const isSignedIn = await AsyncStorage.getItem('isSignedIn');
            console.log('Checking your sign in status.');
      
            if (isSignedIn) {
              console.log('You are signed in.');
              navigation.navigate('App');
            } else {
              console.log('You are NOT signed in.');
              const {idToken} = await GoogleSignin.signIn();
              const googleCredential = auth.GoogleAuthProvider.credential(idToken);
              const userSignIn = auth().signInWithCredential(googleCredential);
      
              userSignIn.then((re: any) => {
                console.log(re);
                AsyncStorage.setItem('isSignedIn', 'true');
                navigation.navigate('App');
              });
            }
          } catch (error) {
            console.log('Sign-in error:', error);
          }
      };

      function handleBiometricAuthentication() {
        TouchID.authenticate('TouchID is authenticated to demonstrate this reactive component')
          .then((success: any) => {
            console.log('Authentication Success');
            navigation.navigate('App');
          })
          .catch((error: any) => {
            console.log('Authentication Failed');
          });
      };

      const windowWidth = Dimensions.get('window').width;
      const eyeIconSize = Math.floor(windowWidth / 20);

		return (
			<SafeAreaView className="flex-1 bg-black">
				<View className=" m-8 flex-1 flex-col justify-between py-9">
                    <View className='flex items-center'>
                        <Image source={require('../../../../assets/icon/icon-white.png')} className="w-64 h-10 mt-16 "/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} className="absolute top-10 right-0">
                        <Image source={require('../../../../assets/icon/x.png')} className="w-6 h-6"/>
                    </TouchableOpacity>

                    <View className="mt-5">
                        <Text className="text-lg font-bold text-white">Войти в аккаунт</Text>
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

                        <TouchableOpacity onPress={handleLogin} className="mt-5 bg-custom-Green rounded-md items-center py-2">
                            <Text className="font-bold text-black">Войти</Text>
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
                            <TouchableOpacity onPress={handleSignInApple} className="mr-2 w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                <Image source={require('../../../../assets/icon/appleIcon.png')} className='w-5 h-6'/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBiometricAuthentication} className="w-10 h-10 border border-white rounded-full flex items-center justify-center">
                                <Icon src={require('../../../../assets/icon/biometrics.png')} size={27} color='white'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                        <Text className="text-base font-bold text-custom-Green text-center">Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
			</SafeAreaView>
		)

}

const styles = StyleSheet.create({
  signEmailBtn: {
    width: 267,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emailCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: 'black',
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#2A2C2F',
    fontSize: 14,
    fontWeight: 'bold',
  },
})