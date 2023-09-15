import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchWebinarsOfCategory } from '../../../../data/client/http-client';
import { CustomModal } from './FilterModal';

type RootStackParamList = {
	catalog: {
		data: any;
		dataList: any;
	};
};

type Prop = {
    category: string;
    title: string;
    image?: any;
    price_string?: string;
    type: string;
    is_favorite: boolean;
};

const ComponentItem: React.FC<Prop> = ({category, title, image, price_string, type, is_favorite}) => {
    const imageSource = image ? { uri: image } : require("../../../../../assets/default-image.png");

    const [activeLike, setActiveLike] = useState(is_favorite);
    
    useEffect(() => {
        setActiveLike(is_favorite);
    }, [is_favorite]);

    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);        // POST: set 'is_favorite'
    };
    return(
        <TouchableOpacity className='w-full h-40 mb-4'>
            <Image className='w-full h-full rounded-lg' source={imageSource} />
                    <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{category}</Text>
                    <Text className='absolute left-0 top-6 bg-custom-Green px-1 rounded-xl text-black m-2'>{type}</Text>
                <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                    <Icon 
                        src={
                            activeLike
                            ? require('../../../../../assets/icon/like-active.png')
                            : require('../../../../../assets/icon/like.png')
                        } 
                        size={24}/>
                </TouchableOpacity>
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small font-bold'>{title}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{price_string}</Text>
        </TouchableOpacity>
    )
}

type Navigation = StackNavigationProp<RootStackParamList, 'catalog'>;

export const Catalog = ({ route }: { route: any }) => {
    const navigation = useNavigation<Navigation>();

    const id = route?.params.id;
    const { data, error, isLoading } = useQuery('webinars', () => fetchWebinarsOfCategory(id));
    console.log(data?.data);

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
        {data?.data.webinars.map((item: Prop) => 
            <ComponentItem 
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
  
