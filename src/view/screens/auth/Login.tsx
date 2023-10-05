import React, { useState, useEffect } from 'react';

import { Image, Text } from 'react-native-elements';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../../component/Icon';
import { Config } from '../../../Config';
import { API_ENDPOINTS } from '../../../data/client/endpoints';

import KeyboardManager from 'react-native-keyboard-manager';
// import {PreviousNextView} from 'react-native-keyboard-manager';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';

import TouchID from 'react-native-touch-id';

import { extract } from '../../../component/Extract';
import { useMutation } from 'react-query';
import { login, forgotPassword, } from '../../../data/client/http-client';

interface NavigationProps {
	navigation: any;
}

interface ApiResponse {
  status: number;
  data?: any; // Adjust the type based on the actual response structure
}

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
}

export const Login: React.FC<NavigationProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const toggleLoginPasswordVisibility = () => {
        setLoginPassword(loginPassword);
        setShowLoginPassword(!showLoginPassword);
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
        console.log('Some other Error Happened:', error);
      }
    }
  };

   const isSignedIn = async() => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(!!isSignedIn){
      getCurrentUserInfo()
    } else{
      console.log('Please Login');
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

    // login
    const mutationLogin = useMutation(login, {
      onSuccess: async () => {
        navigation.navigate("App");
      }
    });

    const handleLogin = async () => {
      try {
        const response = await mutationLogin.mutateAsync({
          username,
          password
        });
        
        /// extract func
        const responseText = await response.text();
        const responseJSON = extract(responseText);
        const responseData = JSON.parse(responseJSON);
        const userAuthToken = responseData.data.token; 
        console.log('token',userAuthToken);

        if (userAuthToken) {
          await AsyncStorage.setItem('userAuthToken', userAuthToken);
          await AsyncStorage.setItem('user_login','1');
          navigation.navigate("App");
        } else {
          console.error('Login error: userAuthToken is missing in the response');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
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

      // biometric authentication
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
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-10 right-0">
                        <Image source={require('../../../../assets/icon/x.png')} className="w-6 h-6"/>
                    </TouchableOpacity>

                    <View className="mt-5">
                        <Text className="text-lg font-bold text-white">Войти в аккаунт</Text>
                        <TextInput 
                            placeholder="Email" 
                            value={username} 
                            onChangeText={setUsername}
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

                        {/* {mutation.isError && 
                              ( <Text className='text-red-500 -mb-3'>An error occurred: {JSON.stringify(mutation.error)}</Text> )} */}
                        {!username || !password &&
                              ( <Text className='text-red-500 -mb-3'>Please fill in all the required fields.</Text> )}
                        <TouchableOpacity 
                          onPress={handleLogin} 
                          className="mt-5 bg-custom-Green rounded-md items-center py-2">
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
                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                        <Text className="text-sm text-custom-Green text-center">Забыли пароль?</Text>
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