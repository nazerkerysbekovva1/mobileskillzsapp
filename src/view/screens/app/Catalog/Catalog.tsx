import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchWebinarsOfCategory, CourseData } from '../../../../data/client/http-client';
import { CustomModal } from './FilterModal';

import { ComponentItem } from '../../../../component/Course';

type RootStackParamList = {
  CourseCard: {
    data: CourseData;
  };
  Basket: any
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

export const Catalog = ({ route }: { route: any }) => {
    const navigation = useNavigation<NavigationProp>();

    // webinars Of Category screen
    const id = route?.params.id;
    const { data: webinarsOfCategory, error, isLoading } = useQuery('webinarsOfCategory', () => fetchWebinarsOfCategory(id));

    // courses of main (Digest)
    const data = route?.params.data;

    const [modalVisible, setModalVisible] = useState(false);


    const openModal = () => {
        setModalVisible(true);
      };
    
    const closeModal = () => {
        setModalVisible(false);
      };
    
    const applyFilter = () => {
        // Apply the selected filter
        // Add your logic here
        closeModal();
    };

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <View className='flex-row justify-between items-center'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20}/>
        </TouchableOpacity>
        <Text className='text-xl font-bold text-white pb-2'>Catalog</Text>
        <View className='flex-row space-x-2'>
            <TouchableOpacity onPress={openModal}>
                <Icon src={require('../../../../../assets/icon/setting.png')} size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                <Icon src={require('../../../../../assets/icon/shopping.png')} size={24}/>
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
        {webinarsOfCategory && webinarsOfCategory?.data.webinars.map((item: CourseData, index: number) => 
            <ComponentItem
              key={index} 
              category={item.category} 
              title={item.title} 
              image={item.image} 
              price_string={item.price_string} 
              type={item.type}
              is_favorite={item.is_favorite}/>
        )}

        {data && data?.list.map((item: CourseData, index: number) => 
            <ComponentItem
              key={index} 
              category={item.category} 
              title={item.title} 
              image={item.image} 
              price_string={item.price_string} 
              type={item.type}
              is_favorite={item.is_favorite}/>
        )}
      </ScrollView>

      <CustomModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        applyFilter={applyFilter}
      />

    </SafeAreaView>
  );
}
  
