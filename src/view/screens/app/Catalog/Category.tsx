import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../component/Icon';
import { StackNavigationProp } from '@react-navigation/stack';

type PropData = {
  title: string;
  src?: any;
  course: number;
  webinar: number;
};

type Prop = PropData & {
  onPress?: () => void;
}

type RootStackParamList = {
	catalog: {
		data: PropData;
		dataList: PropData[];
	};
};

type PersonalityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'catalog'>;

const ComponentItem: React.FC<Prop> = ({title, src, course, webinar, onPress}) => {
  // const imageSource = src ? { uri: src } : require("../../../../../assets/default-image.png");

  return(
      <TouchableOpacity onPress={onPress} className='w-full h-32 mb-4'>
          <Image className='w-full h-full rounded-lg' source={src} />
              <Text className='absolute left-0 bg-custom-Green px-1 rounded-xl text-black font-bold text-lg m-2'>{title}</Text>
              
              <Text 
                className='absolute right-0 bottom-0 m-2 bg-custom-Green px-2 py-1 rounded-xl text-black text-xs'>
                  {webinar} webinar {'\n'}
                  {course} course
              </Text>
      </TouchableOpacity>
  )
}

export const Category = () => {

  const navigation = useNavigation<PersonalityScreenNavigationProp>();

  const courseCategoryList = [
    {
      title: 'Разработка',
      course: 0,
      webinar: 0, 
      src: require("../../../../../assets/1.jpg"),
      list: [
        {
          nameCatalog: 'Веб разработка',
          title: 'Введение в JavaScript ',
          src: require("../../../../../assets/1.jpg"),
          price: 'Free',
          format: 'course',
        },
        {
          nameCatalog: 'Мобильная разработка',
          title: 'Разработка под iOS',
          src: require("../../../../../assets/2.jpg"),
          price: '29 990 KZT',
          format: 'course',
        },
        {
          nameCatalog: 'Мобильная разработка',
          title: 'Разработка под Android ',
          src: require("../../../../../assets/2.jpg"),
          price: '29 990 KZT',
          format: 'webinar',
        },
        {
          nameCatalog: 'Веб разработка',
          title: 'Введение в JavaScript ',
          src: require("../../../../../assets/1.jpg"),
          price: '29 990 KZT',
          format: 'course',
        },
      ]
    },
    {
      title: 'Бизнес',
      course: 0,
      webinar: 0, 
      src: require("../../../../../assets/2.jpg"),
      list: [],
    },
    {
      title: 'Маркетинг',
      course: 0,
      webinar: 0, 
      src: require("../../../../../assets/3.jpg"),
      list: [],
    },
    {
      title: 'Здоровье и фитнес',
      course: 0,
      webinar: 0, 
      src: require("../../../../../assets/1.jpg"),
      list: [],
    },
    {
      title: 'Лайфстайл',
      course: 0,
      webinar: 0, 
      src: require("../../../../../assets/2.jpg"),
      list: [],
    },
  ]

  // Calculate the sum of courses and webinars for each category
  courseCategoryList.forEach(category => {
    category.course = category.list.filter(item => item.format === 'course').length;
    category.webinar = category.list.filter(item => item.format === 'webinar').length;
  });
  

  const handleNavigateToCatalog = (data: PropData, index: number) => {
		navigation.navigate('catalog', {
			data: data,
			dataList: courseCategoryList,
		});
	};

  return(
    <SafeAreaView className="flex-1 bg-black p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {courseCategoryList.map((data, index) => 
          <ComponentItem 
              key={index}
              title={data.title}
              course={data.course}
              webinar={data.webinar}
              src={data.src}
              onPress={() => handleNavigateToCatalog(data, index)}
          />
          )}
        </ScrollView>
    </SafeAreaView>
  )
};

