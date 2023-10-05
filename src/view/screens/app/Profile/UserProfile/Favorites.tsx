import React from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../../component/Icon';
import { ComponentItem } from '../../../../../component/Course';
import { fetchUserData, CourseData, userLogin } from '../../../../../data/client/http-client';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../../../../../data/client/endpoints';

type Prop = CourseData & {
    webinar: CourseData;
  };

type RootStackParamList = {
    CourseCard: {
        data: CourseData;
    };
    Category: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Component: React.FC<Prop> = (data) => {
  
      return(
        <ComponentItem  {...data.webinar}/>
      )
  }

export const Favorites = () => {
  const { data } = useQuery('favorites', () => fetchUserData(API_ENDPOINTS.FAVORITES))
  console.log('favorites', data?.data.favorites)

  const navigation = useNavigation<NavigationProp>();

    return(
      <SafeAreaView className='flex-1 bg-black px-4 pt-8'>

        <View className='flex-row justify-center items-center mb-3'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute left-0'>
              <Icon src={require('../../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <Text className='text-white text-lg font-bold'>Избранные</Text>
        </View>

                {data?.data?.favorites?.length > 0 
                ? (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {data?.data.favorites.map((item: Prop, index: number) => (
                      <Component
                        key={index}
                        {...item}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <View className='justify-between items-center' style={{height: '94%'}}>
                      <View className='items-center justify-center' style={{height: '90%'}}>
                          <Icon src={require('../../../../../../assets/icon/shopping.png')} size={30}/>
                          <Text className='text-white font-bold text-base mt-3'>Добавить курсы</Text>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate('Category')} className='bg-custom-Green items-center py-3 w-full'>
                          <Text className='text-black font-bold text-lg'>Посмотреть курсы</Text>
                      </TouchableOpacity>
                  </View>
                )}
        
      </SafeAreaView>

    )
  };