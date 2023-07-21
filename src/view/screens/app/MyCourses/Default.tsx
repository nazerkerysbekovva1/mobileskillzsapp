import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Default = () => {
    const navigation = useNavigation();

    const handleToLogin = () => {
        navigation.navigate('Login');
      }
    return(
      <SafeAreaView className='flex-1 bg-black p-4'>
            <View className='items-center justify-center' style={{height: '90%'}}>
                <Image source={require('../../../../../assets/icon/default.png')} style={{width: 250, height: 220,  marginVertical: 20}}/>
                <Text className='text-white py-1'>
                    Чтобы увидеть ваши курсы, необходимо 
                    \nвойти в аккаунт
                    \nили зарегистрироваться
                    </Text>
                <TouchableOpacity onPress={handleToLogin} className="mt-5 bg-custom-Green rounded-xl items-center py-2 w-48">
                    <Text className="font-bold text-black text-base">Войти</Text>
                </TouchableOpacity >
            </View> 
      </SafeAreaView>

    )
  };