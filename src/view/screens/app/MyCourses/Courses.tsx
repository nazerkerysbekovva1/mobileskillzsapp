import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';
import Slider from '@react-native-community/slider';

import { fetchUserData, CourseData, userLogin, toggleFavorites } from '../../../../data/client/http-client';
import { useQuery, useMutation } from 'react-query';
import { Alert } from 'react-native';
import { API_ENDPOINTS } from '../../../../data/client/endpoints';

type Prop = CourseData & {
  valueSlider?: number; 
}

type RootStackParamList = {
    CourseCard: {
        data: CourseData;
    };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ComponentItem: React.FC<Prop> = (data) => {
  const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");

  const navigation = useNavigation<NavigationProp>();
  const valueSlider = 3
  const [value, setValue] = useState(valueSlider || 0);

  const handleNavigateToCourseCard = (data: CourseData) => {
    navigation.navigate('CourseCard', {
      data,
    });
  };

  const [activeLike, setActiveLike] = useState(data.is_favorite);
      
  useEffect(() => {
      setActiveLike(data.is_favorite);
  }, [data.is_favorite]);
  
  const mutationFavorites = useMutation(toggleFavorites, {
    onSuccess: async () => {
      console.log('toggle fav')
    }
  });
  const toggleLikeVisibility = async (id: number) => {
    if (await userLogin()) {
      const response = await mutationFavorites.mutateAsync(id);
      if (!response) {
        console.log('error');
      } else {
        setActiveLike(!activeLike); 
      }
    } else {
      Alert.alert('Message', 'Please Sign in');
    }
  };    

  return(
      <TouchableOpacity onPress={() => handleNavigateToCourseCard(data)} className='w-full h-32 mb-4'>
          <Image className='w-full h-full rounded-lg' source={imageSource} />
              <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.category}</Text>
              <Text className='absolute left-0 top-6 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.type}</Text>
              <TouchableOpacity onPress={() => toggleLikeVisibility(data?.id)} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                  <Icon 
                      src={
                          activeLike
                          ? require('../../../../../assets/icon/like-active.png')
                          : require('../../../../../assets/icon/like.png')
                      } 
                      size={24}/>
              </TouchableOpacity>
              <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{data.title}</Text> 
              <Slider
                style={{height: 2, width: '100%',}}
                thumbTintColor="#D8F76E"
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={value}
                onValueChange={value => setValue(value)}
                minimumTrackTintColor="#D8F76E"
                maximumTrackTintColor="#000000"
              />
              {/* <View className='bg-custom-Green h-1 rounded'></View>   */}
      </TouchableOpacity>
  )
}

export const Courses = () => {
  const { data } = useQuery('myCourses', () => fetchUserData(API_ENDPOINTS.MY_COURSES))
  console.log('user courses', data?.data)

  const course = [];

  const navigation = useNavigation();

    return(
      <SafeAreaView className='flex-1 bg-black p-4'>
        <View>
          <Text className='text-2xl font-bold text-white py-5'>Мои курсы</Text>
                {data?.data.webinars.length > 0 
                ? (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {data?.data.webinars.map((item:CourseData, index: number) => (
                      <ComponentItem
                        key={index}
                        {...item}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <View className='justify-between items-center' style={{height: '88%'}}>
                      <View className='items-center justify-center' style={{height: '90%'}}>
                          <Icon src={require('../../../../../assets/icon/shopping.png')} size={30}/>
                          <Text className='text-white font-bold text-base mt-3'>Добавить курсы</Text>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate('Category')} className='bg-custom-Green items-center py-3 w-full'>
                          <Text className='text-black font-bold text-lg'>Посмотреть курсы</Text>
                      </TouchableOpacity>
                  </View>
                )}
        </View>
      </SafeAreaView>

    )
  };