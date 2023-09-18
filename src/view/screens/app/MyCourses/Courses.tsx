import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';
import Slider from '@react-native-community/slider';

type PropData = {
  nameCatalog?: string;
  title?: string;
  src?: any;
  price?: string;
  format?: string;
  list?: PropData[];
};

type Prop = PropData & {
  onPress?: () => void;
  onPressCourseCard?: () => void;
  valueSlider?: number; 
}

type RootStackParamList = {
    catalog: {
        data: PropData;
        // dataList: PropData[];
    };
    CourseCard: {
        data: PropData;
    };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'catalog'>;

const ComponentItem: React.FC<Prop> = ({title, src, valueSlider}) => {
  // const imageSource = src ? { uri: src } : require("../../../../../assets/default-image.png");
  const navigation = useNavigation<NavigationProp>();

  const [value, setValue] = useState(valueSlider || 0);

  const handleNavigateToCourseCard = () => {
    navigation.navigate('CourseCard', {
      data: { title, src },
    });
  };

  const [activeLike, setActiveLike] = useState(false);
  const toggleLikeVisibility = () => {
      setActiveLike(!activeLike);
  };
  return(
      <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-full h-32 mb-4'>
          <Image className='w-full h-full rounded-lg' source={src} />
              <View className='absolute left-0 flex-row space-x-1 m-2'>
                  <Text className='bg-custom-Green px-1 rounded-xl text-black'>Web</Text>
                  <Text className='bg-custom-Green px-1 rounded-xl text-black'>iOS</Text>
              </View>
              <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                  <Icon 
                      src={
                          activeLike
                          ? require('../../../../../assets/icon/like-active.png')
                          : require('../../../../../assets/icon/like.png')
                      } 
                      size={24}/>
              </TouchableOpacity>
              <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{title}</Text> 
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

  const list = [
    {
      nameCatalog: 'Веб разработка',
      title: 'Введение в JavaScript ',
      src: require("../../../../../assets/1.jpg"),
      price: 'Free',
      format: 'course',
      valueSlider: 20,
    },
    {
      nameCatalog: 'Мобильная разработка',
      title: 'Разработка под iOS',
      src: require("../../../../../assets/2.jpg"),
      price: '29 990 KZT',
      format: 'course',
      valueSlider: 80,
    },
    {
      nameCatalog: 'Мобильная разработка',
      title: 'Разработка под Android ',
      src: require("../../../../../assets/3.jpg"),
      price: '29 990 KZT',
      format: 'webinar',
      valueSlider: 50,
    },
  ]
    return(
      <SafeAreaView className='flex-1 bg-black p-4'>
        <View>
          <Text className='text-2xl font-bold text-white py-5'>Мои курсы</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {list.map((item, index) => (
              <ComponentItem
                key={index}
                title={item.title}
                src={item.src}
                valueSlider={item.valueSlider}
              />
             ))}
          </ScrollView>
        </View>
      </SafeAreaView>

    )
  };