import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../component/Icon';
import { StackNavigationProp } from '@react-navigation/stack';

import { useMutation, useQuery } from 'react-query';
import { fetchData, CourseData, CourseQuery } from '../../../../data/client/http-client';

import { API_ENDPOINTS } from '../../../../data/client/endpoints';

type Prop = CourseData & {
    list?: CourseData[];
    onPress?: () => void;
    onPressCourseCard?: () => void;
  };
  
  type RootStackParamList = {
      catalog: {
          data: CourseData;
          // dataList: PropData[];
      };
      CourseCard: {
          data: CourseData;
      };
  };
  
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  

const ComponentItem: React.FC<Prop> = (data) => {
    const navigation = useNavigation<NavigationProp>();

    // console.log('ComponentItem', data);

    const handleNavigateToCourseCard = () => {
      navigation.navigate('CourseCard', {
        data,
      });
    };

    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };

    const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");

    return(
        <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-64 h-32 mr-4'>
            <Image className='w-full h-full rounded-lg' source={imageSource} />
                <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.category}</Text>
                <Text className='bg-custom-Green px-1 rounded-xl text-black'>{data.type}</Text>
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

const Component: React.FC<Prop> = (data) => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigateToCatalog = (data: CourseData) => {
    navigation.navigate('catalog', {
      data,
    });
  };
    return(
        <View className='mb-3'>
            <View className='flex-row justify-between items-center mb-3'>
                <Text className='text-xl font-bold text-white'>{data.title}</Text>
                <TouchableOpacity onPress={() => handleNavigateToCatalog(data)}>
                    <Icon src={require('../../../../../assets/icon/chevron-right.png')} size={25}/>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
             {data.list?.map((item, index) => (
                <ComponentItem key={index} {...item}/>
             ))}
            </ScrollView>
        </View>
    )
}

// const UserItem: React.FC<Prop> = ({title, onPress, list}) => {
//     return(
//         <View className='mb-3'>
//             <View className='flex-row justify-between items-center mb-3'>
//                 <Text className='text-xl font-bold text-white'>{title}</Text>
//                 <TouchableOpacity onPress={onPress}>
//                     <Icon src={require('../../../../../assets/icon/chevron-right.png')} size={25}/>
//                 </TouchableOpacity>
//             </View>
//             <ScrollView horizontal>
//              {list?.map((item, index) => (
//                 <TouchableOpacity key={index} onPress={onPress} className='w-24 h-18 mr-4'>
//                     <Image className='w-full h-full rounded-lg' source={item.src} />
//                 </TouchableOpacity>
//              ))}
//             </ScrollView>
//         </View>
//     )
// }

const Digest = () => {

  const { data: featuredCourses, error, isLoading } = useQuery('featuredCourses', () => fetchData(API_ENDPOINTS.FEATURED_COURSES));

  const { data: courses } = useQuery('courses', () => fetchData(API_ENDPOINTS.COURSES));

  const getBestsellers = (data: CourseData[]) => {
    const sortedData = data?.filter((value) => value.rate == '5.00');
    const bestsellers = sortedData?.slice(0, 3);
    return bestsellers;
  };

  const getNewestCourses = (data: CourseQuery[] | undefined) => {
    if (!data || data.length === 0) {
      return []; 
    }
    const sortedData = data.sort((a, b) => b.created_at - a.created_at);
    const newestCourses = sortedData.slice(0, 3);
    return newestCourses;
  };
  

    const courseList = [
        {
          title: 'Рекомендуемые курсы',
          list: featuredCourses?.data,
        },
        {
          title: 'Бестселлеры',
          list: getBestsellers(courses?.data),
        },
        {
          title: 'Новое',
          list: getNewestCourses(courses?.data),
        },
        {
          title: 'Курсы со скидкой',
          list: [
            {
              nameCatalog: 'Веб разработка',
              title: 'Введение в JavaScript ',
              image: "../../../../../assets/1.jpg",
              price_string: 'Free',
              format: 'course',
            },
            {
              nameCatalog: 'Мобильная разработка',
              title: 'Разработка под iOS',
              image: "../../../../../assets/2.jpg",
              price_string: '29 990 KZT',
              format: 'course',
            },
          ]
        },
      ]
      
  return(
    <SafeAreaView className="flex-1 bg-black px-4 pt-4">
        <ScrollView showsVerticalScrollIndicator={false}>

        {/* {users.map((item, index) => (
            <UserItem key={index} title={item.title} list={item.list} />
        ))}   */}

        {
          isLoading ? ( <Text className='text-xl font-bold text-white'>Loading...</Text> 
          ) :  error ? (<Text className='text-xl font-bold text-white'>error</Text> 
          ) : courseList ? (
            courseList.map((item: Prop, index: number) => (
              <Component key={index} {...item}/>
          )) 
          ) : ( <Text className='text-xl font-bold text-white'>Data is not available</Text> 
        )}
        </ScrollView>
    </SafeAreaView>
  )
};

export default Digest;