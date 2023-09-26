import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row justify-center items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute left-0'>
              <Icon src={require('../../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <Text className='text-white text-lg font-bold'>Профиль</Text>
        </View>

        <View>

        </View>

        <TouchableOpacity className='mt-32 py-3 rounded-lg border border-white'>
          <Text className='text-white text-base font-bold text-center'>Сохранить данные</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}