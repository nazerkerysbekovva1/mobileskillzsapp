import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../component/Icon';
import { StackNavigationProp } from '@react-navigation/stack';

import { useMutation, useQuery } from 'react-query';
import { fetchData } from '../../../../data/client/http-client';

import { API_ENDPOINTS } from '../../../../data/client/endpoints';

type PropData = {
  title: string;
  image?: any;
  webinar: number;
};

type Prop = PropData & {
  onPress?: () => void;
}

type RootStackParamList = {
	catalog: {
    id: number;
	};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ComponentItem: React.FC<Prop> = (data) => {
  const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");


  return(
      <TouchableOpacity onPress={data.onPress} className='w-full h-32 mb-4'>
          <Image className='w-full h-full rounded-lg' source={imageSource} />
              <Text className='absolute left-0 bg-custom-Green px-1 rounded-xl text-black font-bold text-lg m-2'>{data.title}</Text>
              
              <Text 
                className='absolute right-0 bottom-0 m-2 bg-custom-Green px-2 py-1 rounded-xl text-black text-xs'>
                  {data.webinar} webinar
              </Text>
      </TouchableOpacity>
  )
}

const Category = () => {

  const navigation = useNavigation<NavigationProp>();

  const { data, error, isLoading } = useQuery('categories', () => fetchData(API_ENDPOINTS.CATEGORIES));
  // console.log(data.data);

  // const courseCategoryList = [
  //   {
  //     title: 'Разработка',
  //     course: 0,
  //     webinar: 0, 
  //     src: require("../../../../../assets/1.jpg"),
  //     list: [
  //       {
  //         nameCatalog: 'Веб разработка',
  //         title: 'Введение в JavaScript ',
  //         src: require("../../../../../assets/1.jpg"),
  //         price: 'Free',
  //         format: 'course',
  //       },
  //       {
  //         nameCatalog: 'Мобильная разработка',
  //         title: 'Разработка под iOS',
  //         src: require("../../../../../assets/2.jpg"),
  //         price: '29 990 KZT',
  //         format: 'course',
  //       },
  //       {
  //         nameCatalog: 'Мобильная разработка',
  //         title: 'Разработка под Android ',
  //         src: require("../../../../../assets/2.jpg"),
  //         price: '29 990 KZT',
  //         format: 'webinar',
  //       },
  //       {
  //         nameCatalog: 'Веб разработка',
  //         title: 'Введение в JavaScript ',
  //         src: require("../../../../../assets/1.jpg"),
  //         price: '29 990 KZT',
  //         format: 'course',
  //       },
  //     ]
  //   },
  //   {
  //     title: 'Бизнес',
  //     course: 0,
  //     webinar: 0, 
  //     src: require("../../../../../assets/2.jpg"),
  //     list: [],
  //   },
  //   {
  //     title: 'Маркетинг',
  //     course: 0,
  //     webinar: 0, 
  //     src: require("../../../../../assets/3.jpg"),
  //     list: [],
  //   },
  //   {
  //     title: 'Здоровье и фитнес',
  //     course: 0,
  //     webinar: 0, 
  //     src: require("../../../../../assets/1.jpg"),
  //     list: [],
  //   },
  //   {
  //     title: 'Лайфстайл',
  //     course: 0,
  //     webinar: 0, 
  //     src: require("../../../../../assets/2.jpg"),
  //     list: [],
  //   },
  // ]

  // Calculate the sum of courses and webinars for each category
  // courseCategoryList.forEach(category => {
  //   category.course = category.list.filter(item => item.format === 'course').length;
  //   category.webinar = category.list.filter(item => item.format === 'webinar').length;
  // });
  

  const handleNavigateToCatalog = (id: number) => {
		navigation.navigate('catalog', {
			id: id,
		});
	};

  return(
    <SafeAreaView className="flex-1 bg-black px-4 pt-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.data.categories.map((item: any, index: number) => 
          <ComponentItem 
              key={index}
              title={item.title}
              webinar={item.webinars_count}
              image={item.image}
              onPress={() => handleNavigateToCatalog(item.id)}
          />
          )}
        </ScrollView>
    </SafeAreaView>
  )
};

export default Category;