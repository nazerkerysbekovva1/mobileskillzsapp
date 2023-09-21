import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchWebinarsOfCategory, CourseData } from '../../../../data/client/http-client';
import { CustomModal } from './FilterModal';

type RootStackParamList = {
  CourseCard: {
    data: CourseData;
  };
  Basket: any
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

const ComponentItem: React.FC<CourseData> = (data) => {
  const navigation = useNavigation<NavigationProp>();

  const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");

    const [activeLike, setActiveLike] = useState(data.is_favorite);
    
    useEffect(() => {
        setActiveLike(data.is_favorite);
    }, [data.is_favorite]);

    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);        // POST: set 'is_favorite'
    };

    const handleNavigateToCourseCard = (data: CourseData) => {
      navigation.navigate('CourseCard', {
        data,
      });
    };

    return(
        <TouchableOpacity onPress={() => handleNavigateToCourseCard(data)} className='w-full h-40 mb-4'>
            <Image className='w-full h-full rounded-lg' source={imageSource} />
                    <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.category}</Text>
                    <Text className='absolute left-0 top-6 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.type}</Text>
                <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                    <Icon 
                        src={
                            activeLike
                            ? require('../../../../../assets/icon/like-active.png')
                            : require('../../../../../assets/icon/like.png')
                        } 
                        size={24}/>
                </TouchableOpacity>
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small font-bold'>{data.title}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{data.price_string}</Text>
        </TouchableOpacity>
    )
}

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
  
