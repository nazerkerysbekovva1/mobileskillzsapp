import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Icon } from './Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CourseData, userLogin } from '../data/client/http-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    CourseCard: {
      data: CourseData;
    };
  };

  type Prop = CourseData & {
    list?: CourseData[];
    onPress?: () => void;
    onPressCourseCard?: () => void;
  };

  type NavigationProp = StackNavigationProp<RootStackParamList>;
  
export const ComponentItem: React.FC<CourseData> = (data) => {
    const navigation = useNavigation<NavigationProp>();
  
    const imageSource = data.image ? { uri: data.image } : require("../../assets/default-image.png");
  
      const [activeLike, setActiveLike] = useState(data.is_favorite);
      
      useEffect(() => {
          setActiveLike(data.is_favorite);
      }, [data.is_favorite]);
  
      const toggleLikeVisibility = async() => {
        if(await userLogin()){
          setActiveLike(!activeLike);        // POST: set 'is_favorite'
        } else{
          Alert.alert('Message','Please Sign in');
        }
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
                              ? require('../../assets/icon/like-active.png')
                              : require('../../assets/icon/like.png')
                          } 
                          size={24}/>
                  </TouchableOpacity>
                  <Text className='absolute left-0 bottom-0 m-2 text-white text-small font-bold'>{data.title}</Text>   
                  {data.price 
                    ? (<View className='absolute right-0 bottom-0 m-2'>
                          {data?.best_ticket_string
                            ? (<View>
                                <Text className='bg-red-500 px-1 rounded-tl-lg rounded-br-lg text-white mb-3'>{data.discount_percent}% скидка</Text>
                                <View className='bg-custom-Green rounded-lg items-center'>
                                  <Text className="text-black line-through">{data?.price_string}</Text>
                                  <Text className="text-black font-bold">{data?.best_ticket_string}</Text>
                                </View>
                              </View>)
                            : (<Text className='bg-custom-Green px-1 rounded-lg text-black font-bold'>{data.price_string}</Text>)
                          }
                    </View>)
                    : (<Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-lg text-black font-bold'>Free</Text>)} 
          </TouchableOpacity>
      )
  }
  

export const ComponentItem2: React.FC<Prop> = (data) => {
    const navigation = useNavigation<NavigationProp>();

    // console.log('ComponentItem', data);

    const handleNavigateToCourseCard = () => {
      navigation.navigate('CourseCard', {
        data,
      });
    };

    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = async() => {
      if(await userLogin()){
        setActiveLike(!activeLike);        // POST: set 'is_favorite'
      } else{
        Alert.alert('Message','Please Sign in');
      }
  };

    const imageSource = data.image ? { uri: data.image } : require("../../assets/default-image.png");

    return(
        <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-64 h-32 mr-4'>
            <Image className='w-full h-full rounded-lg' source={imageSource} />
                <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.category}</Text>
                <Text className='bg-custom-Green px-1 rounded-xl text-black'>{data.type}</Text>
                <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                    <Icon 
                        src={
                            activeLike
                            ? require('../../assets/icon/like-active.png')
                            : require('../../assets/icon/like.png')
                        } 
                        size={24}/>
                </TouchableOpacity>
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small font-bold'>{data.title}</Text>  
                {data.price 
                  ? (<View className='absolute right-0 bottom-0 m-2'>
                        {data?.best_ticket_string
                          ? (<View>
                              <Text className='bg-red-500 px-1 rounded-tl-lg rounded-br-lg text-white mb-3'>{data.discount_percent}% скидка</Text>
                              <View className='bg-custom-Green rounded-lg items-center'>
                                <Text className="text-black line-through">{data?.price_string}</Text>
                                <Text className="text-black font-bold">{data?.best_ticket_string}</Text>
                              </View>
                            </View>)
                          : (<Text className='bg-custom-Green px-1 rounded-lg text-black font-bold'>{data.price_string}</Text>)
                        }
                  </View>)
                  : (<Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-lg text-black font-bold'>Free</Text>)} 
        </TouchableOpacity>
    )
}