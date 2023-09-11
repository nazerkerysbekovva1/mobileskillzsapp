import React, { useState, useEffect } from 'react';

import { Image, Text } from 'react-native-elements';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../../component/Icon';
import { Config } from '../../../Config';
import { API_ENDPOINTS } from '../../../data/client/endpoints';

import { useMutation } from 'react-query';
import { forgotPassword } from '../../../data/client/http-client';
import { useNavigation } from '@react-navigation/native';


export const ForgotPassword = () => {
   const navigation = useNavigation();
   const [emailOrPhone, setEmailOrPhonee] = useState<string>('');

   const mutationForgotPassword = useMutation(forgotPassword, {
        onSuccess: async () => {
            Alert.alert('ForgotPassword:', 'Success')
        }
    });

   const handleForgotPassword = async () => {
        mutationForgotPassword.mutate({username: emailOrPhone});
   }
		return (
			<SafeAreaView className="flex-1 bg-black">
				<View className=" m-8 flex-1 flex-col py-9">
                    <View className='flex items-center'>
                        <Image source={require('../../../../assets/icon/icon-white.png')} className="w-64 h-10 mt-16 "/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-10 right-0">
                        <Image source={require('../../../../assets/icon/x.png')} className="w-6 h-6"/>
                    </TouchableOpacity>

                    <View className="mt-14">
                        <Text className="text-lg font-bold text-white">Password Recovery</Text>
                        <TextInput 
                            placeholder="Email or Phone" 
                            value={emailOrPhone} 
                            onChangeText={setEmailOrPhonee}
                            placeholderTextColor="black" 
                            className="mt-5 bg-white rounded-md text-black font-bold px-4 py-1"/>
                                                
                        <TouchableOpacity 
                          onPress={handleForgotPassword} 
                          className="mt-5 bg-custom-Green rounded-md items-center py-2">
                            <Text className="font-bold text-black">Reset Password</Text>
                        </TouchableOpacity >
                    </View>

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