import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PropData = {
    nameCatalog?: string;
    title?: string;
    src?: any;
    price?: string;
    format?: string;
    list?: PropData[];
    author?: string;
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

  
export const Basket = () => {
  const navigation = useNavigation();

  const [notificationVisible, setNotificationVisible] = useState(true);
  const [totalCourses, setTotalCourses] = useState(0);

  const Notif = () => {
    
    const handleNotification = () => {
        setNotificationVisible(false);
      };
  
      if (!notificationVisible) {
        return null; 
      }

    return(
        <View className='items-center justify-center p-10'>
            <Image source={require('../../../../assets/icon/Group.png')} className='w-24 h-24 m-3'/>
            <Text className='text-white text-xl font-bold'>Получите свои курсы</Text>
            <Text className='text-white font-bold'>Чтобы проверить  в Google Pay, покупайте каждый курс по отдельности.</Text>
            <TouchableOpacity onPress={handleNotification} className='mt-4'>
                <Text>Ясно</Text>
            </TouchableOpacity>
        </View>
    )
  }
  const Item: React.FC<Prop & { onPressDelete: () => void }> = ({title, price, src, author, onPressDelete }) => {
    return(
        <View className='py-3'>
            <View className='flex-row items-center justify-between'>
                <TouchableOpacity>
                    <Image source={src} className='w-18 h-18 rounded-lg'/>
                </TouchableOpacity>
                <View style={{width: '75%'}}>
                    <Text className='text-white text-base font-bold'>{title}</Text>
                    <Text>{author}</Text>
                    <View className='items-center flex-row'>
                        <Icon src={require('../../../../assets/icon/alarm-clock-check.png')} size={14}/>
                        <Text className='ml-3'>Осталось всего 2 дня по этой цене!</Text>
                    </View>
                </View>
            </View>
            <View className='ml-auto' style={{width: '75%'}}>
                <View className='flex-row justify-between items-center mt-1'>
                    <Text className='text-white font-bold text-3xl'>{price}</Text>
                    <Text>KZT 9,990.00</Text>
                </View>
                <View className='flex-row justify-between py-2 items-center'>
                    <TouchableOpacity className='px-3'>
                        <Text>Cохранить на потом</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDelete} className='px-3'>
                        <Text>Удалить</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className='mt-1 py-1 flex-row bg-white rounded items-center justify-center'>
                    <Text className='text-black text-3xl mr-2'>Buy with</Text>
                    <Icon src={require('../../../../assets/icon/googleIcon.png')} size={20}/>
                    <Text className='text-black text-3xl ml-2'>Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }

  const [courses, setCourses] = useState([
    {
      title: 'Python Django: Rest API Crash Course для начинающих - 2023',
      src: require('../../../../assets/default-image.png'),
      author: 'Arno Pretorious',
      price: 'KZT 8,490.00',
    },
    {
      title: 'Gamification: Motivation Psychology & The Art of Engagement',
      src: require('../../../../assets/default-image.png'),
      author: 'Rob Sutcliffe',
      price: 'KZT 8,490.00',
    },
  ]);

  const handleDeleteCourse = (index: number) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  useEffect(() => {
    setTotalCourses(courses.length);
  }, [courses]);

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
        <View className='flex-row justify-center items-center mb-1'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute left-0'>
              <Icon src={require('../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <Text className='text-white text-lg font-bold'>Корзина</Text>
        </View>
        
        {courses.length <= 0 
            ? ( <View className='justify-between items-center' style={{height: '95%'}}>
                <View className='items-center justify-center' style={{height: '90%'}}>
                    <Icon src={require('../../../../assets/icon/shopping.png')} size={30}/>
                    <Text className='text-white font-bold text-base mt-3'>Добавить курсы</Text>
                    <Text className='text-base'>Ваша корзина пуста</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Category')} className='bg-custom-Green items-center py-3 w-full'>
                    <Text className='text-black font-bold text-lg'>Посмотреть курсы</Text>
                </TouchableOpacity>
            </View> ) 
            : ( <ScrollView showsVerticalScrollIndicator={false}>
                    <Notif />
                    <Text className='text-white text-2xl my-3'>{totalCourses} предмета</Text>
                    {courses.map((item, index) => 
                        <Item 
                            key={index} 
                            title={item.title} 
                            src={item.src} 
                            author={item.author} 
                            price={item.price}
                            onPressDelete={() => handleDeleteCourse(index)}
                        />
                    )}
                </ScrollView> )
        }
    </SafeAreaView>
  );
}