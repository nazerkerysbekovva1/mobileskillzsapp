import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import { fetchData, CourseData } from '../../../../data/client/http-client';
import { API_ENDPOINTS } from '../../../../data/client/endpoints';

import { ComponentItem } from '../../../../component/Course';

type RootStackParamList = {
  CourseCard: {
    data: CourseData;
  };
  Basket: any
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

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
                    {...item}/>
              ) 
            ) : ( <Text className='text-xl font-bold text-white'>Data is not available</Text> 
        )}
        </ScrollView>
    </SafeAreaView>
  )
};

