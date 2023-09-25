import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchWebinarsOfCategory, CourseData, fetchData } from '../../../../data/client/http-client';
import { CustomModal } from './FilterModal';

import { API_ENDPOINTS } from '../../../../data/client/endpoints';
import { ComponentItem } from '../../../../component/Course';

type RootStackParamList = {
  CourseCard: {
    data: CourseData;
  };
  Basket: any;
  Catalog: any;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

export const Catalog = ({ route }: { route: any }) => {
    const navigation = useNavigation<NavigationProp>();

    // webinars Of Category screen
    const id = route?.params.id;
    const { data: webinarsOfCategory, error, isLoading } = useQuery('webinarsOfCategory', () => fetchWebinarsOfCategory(id));

    // courses of main (Digest)
    const data = route?.params.data;
    
    // courses for filtering
    const { data: searchData } = useQuery('courses', () => fetchData(API_ENDPOINTS.COURSES));


    const [modalVisible, setModalVisible] = useState(false);
    
    const [isFilter, setIsFiltering] = useState(false);
    const [list, setList] = useState<CourseData[]>([]); 

    const openModal = () => {
        setModalVisible(true);
      };
    
    const closeModal = () => {
        setModalVisible(false);
      };

    const handleToCatalog = () => {
      navigation.navigate('Catalog');
    }

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

        {isFilter ? (
          <View>
            {list.length === 0 ? (
              <View className='items-center justify-center' style={{height: '95%'}}>
                <Text className='text-white py-1'>По вашему запросу ничего не найдено</Text>
                <TouchableOpacity onPress={handleToCatalog} className="mt-5 bg-custom-Green rounded-xl items-center py-2 w-48">
                  <Text className="font-bold text-black text-base">Перейти в каталог</Text>
                </TouchableOpacity >
              </View> 
                    ) : (
              <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
                  {list.map((item, index) => (
                    <ComponentItem
                      key={index}
                      {...item}
                    />
                  ))}
              </ScrollView>
                    )}
          </View>
        ) : (
          <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
              {webinarsOfCategory && webinarsOfCategory?.data.webinars.map((item: CourseData, index: number) => 
                  <ComponentItem
                    key={index} 
                    {...item}/>
              )}

              {data && data?.list.map((item: CourseData, index: number) => 
                  <ComponentItem
                    key={index} 
                    {...item}/>
              )}
        </ScrollView>
        )}

      <CustomModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        setIsFiltering={setIsFiltering}
        setList={setList}
        searchData={searchData.data}
      />

    </SafeAreaView>
  );
}
  
