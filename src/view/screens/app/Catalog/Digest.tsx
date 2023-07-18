import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../component/Icon';
import { StackNavigationProp } from '@react-navigation/stack';

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
  

const ComponentItem: React.FC<Prop> = ({nameCatalog, src, price}) => {
    // const imageSource = src ? { uri: src } : require("../../../../../assets/default-image.png");
    const navigation = useNavigation<PersonalityScreenNavigationProp>();

    const handleNavigateToCourseCard = () => {
      navigation.navigate('CourseCard', {
        data: { nameCatalog, src, price },
      });
    };

    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };
    return(
        <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-64 h-32 mr-4'>
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
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{nameCatalog}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{price}</Text>
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
                <ComponentItem key={index} nameCatalog={item.nameCatalog} price={item.price} src={item.src} />
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

export const Digest = () => {
    const navigation = useNavigation<PersonalityScreenNavigationProp>();

    const handleNavigateToCatalog = (data: PropData, index: number) => {
		navigation.navigate('catalog', {
			data: data,
			// dataList: courseCategoryList,
		});
	};

    const courseCategoryList = [
        {
          title: 'Бесплатные курсы',
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
          ]
        },
        {
          title: 'Бестселлеры',
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
              src: require("../../../../../assets/3.jpg"),
              price: '29 990 KZT',
              format: 'webinar',
            },
          ]
        },
        {
          title: 'Рекомендации для вас',
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
              src: require("../../../../../assets/3.jpg"),
              price: '29 990 KZT',
              format: 'webinar',
            },
          ]
        },
        {
          title: 'Курсы со скидкой',
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

        {courseCategoryList.map((item, index) => (
            <Component key={index} title={item.title} list={item.list} />
        ))}
        </ScrollView>
    </SafeAreaView>
  )
};

