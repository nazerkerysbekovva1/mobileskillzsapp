import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../component/Icon';
import { StackNavigationProp } from '@react-navigation/stack';

import { useMutation, useQuery } from 'react-query';
import { fetchData, Course } from '../../../../data/client/http-client';

import { API_ENDPOINTS } from '../../../../data/client/endpoints';

type PropData = {
    category?: string;
    title?: string;
    image?: any;
    price_string?: string;
    list?: PropData[];
    type?: string;
  };
  
  type Prop = PropData & {
    onPress?: () => void;
    onPressCourseCard?: () => void;
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
  
  type PersonalityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'catalog'>;
  

const ComponentItem: React.FC<Prop> = ({title, image, type, price_string, category}) => {
    const navigation = useNavigation<PersonalityScreenNavigationProp>();

    const handleNavigateToCourseCard = () => {
      navigation.navigate('CourseCard', {
        data: { title, image, price_string },
      });
    };

    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };

    const imageSource = image ? { uri: image } : require("../../../../../assets/default-image.png");

    return(
        <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-64 h-32 mr-4'>
            <Image className='w-full h-full rounded-lg' source={imageSource} />
                <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{category}</Text>
                <Text className='bg-custom-Green px-1 rounded-xl text-black'>{type}</Text>
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

const Component: React.FC<Prop> = ({ title, list }) => {
  const navigation = useNavigation<PersonalityScreenNavigationProp>();

  const handleNavigateToCatalog = () => {
    navigation.navigate('catalog', {
      data: {title, list},
    });
  };
    return(
        <View className='mb-3'>
            <View className='flex-row justify-between items-center mb-3'>
                <Text className='text-xl font-bold text-white'>{title}</Text>
                <TouchableOpacity onPress={() => handleNavigateToCatalog()}>
                    <Icon src={require('../../../../../assets/icon/chevron-right.png')} size={25}/>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
             {list?.map((item, index) => (
                <ComponentItem key={index} title={item.title} price_string={item.price_string} image={item.image} type={item.type} category={item.category}/>
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

  const getBestsellers = (data: Course[]) => {
    const sortedData = data?.filter((value) => value.rate == '5.00');
    const bestsellers = sortedData?.slice(0, 3);
    return bestsellers;
  };

  const getNewestCourses = (data: Course[]) => {
    const sortedData = data.sort((a, b) => b.created_at - a.created_at);
    const newestCourses = sortedData.slice(0, 3);

    return newestCourses;
  };

    const navigation = useNavigation<PersonalityScreenNavigationProp>();

    const handleNavigateToCatalog = (data: PropData, index: number) => {
		navigation.navigate('catalog', {
			data: data,
			// dataList: courseCategoryList,
		});
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


      // const users = [
      //   {
      //     title: 'Интересное',
      //     list: [
      //       {
      //         src: require("../../../../../assets/ava.png"),
      //       },
      //       {
      //         src: require("../../../../../assets/ava.png"),
      //       },
      //       {
      //         src: require("../../../../../assets/ava.png"),
      //       },
      //       {
      //         src: require("../../../../../assets/ava.png"),
      //       },
      //     ]
      //   },
      // ]
      
  return(
    <SafeAreaView className="flex-1 bg-black p-4">
        <ScrollView showsVerticalScrollIndicator={false}>

        {/* {users.map((item, index) => (
            <UserItem key={index} title={item.title} list={item.list} />
        ))}   */}

        {
          isLoading ? ( <Text className='text-xl font-bold text-white'>Loading...</Text> 
          ) :  error ? (<Text className='text-xl font-bold text-white'>error</Text> 
          ) : courseList ? (
            courseList.map((item: any) => (
              <Component key={item.id} title={item.title} list={item.list} />
          )) 
          ) : ( <Text className='text-xl font-bold text-white'>Data is not available</Text> 
        )}
        </ScrollView>
    </SafeAreaView>
  )
};

export default Digest;