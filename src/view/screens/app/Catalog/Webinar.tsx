import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchData, CourseData } from '../../../../data/client/http-client';
import { API_ENDPOINTS } from '../../../../data/client/endpoints';

const ComponentItem: React.FC<CourseData> = (data) => {
  const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");

  const [activeLike, setActiveLike] = useState(data.is_favorite);
  
  useEffect(() => {
      setActiveLike(data.is_favorite);
  }, [data.is_favorite]);

  const toggleLikeVisibility = () => {
      setActiveLike(!activeLike);        // POST: set 'is_favorite'
  };
  return(
      <TouchableOpacity className='w-full h-40 mb-4'>
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

export const Webinar = () => {

  const {data, error, isLoading} = useQuery('webinars', () => fetchData(API_ENDPOINTS.COURSES));
  
  const getWebinars = () => {
    const webinars =  data?.data.filter((val: any) => val.type === 'webinar');
    return webinars;
  }

  return(
    <SafeAreaView className="flex-1 bg-black px-4 pt-2">
         <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
         {
            isLoading ? ( <Text className='text-xl font-bold text-white'>Loading...</Text> 
            ) :  error ? (<Text className='text-xl font-bold text-white'>error</Text> 
            ) : data ? (
              getWebinars().map((item: CourseData, index: number) => 
                <ComponentItem 
                    key={index}
                    category={item.category} 
                    title={item.title} 
                    image={item.image} 
                    price_string={item.price_string} 
                    type={item.type}
                    is_favorite={item.is_favorite}/>
              ) 
            ) : ( <Text className='text-xl font-bold text-white'>Data is not available</Text> 
        )}
        </ScrollView>
    </SafeAreaView>
  )
};

