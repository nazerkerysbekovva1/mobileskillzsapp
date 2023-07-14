import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../component/Icon';
import Video from 'react-native-video';

interface Item {
  id: string;
  name: string;
}

export const CourseCard = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);  
  const [showFullText, setShowFullText] = useState(false);
  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const renderItem = ({ item }: { item: Item }) => {
      const isSelected = selectedItem === item.id;
      return (
        <View className='flex-row space-x-4 my-1 items-center'>
          <TouchableOpacity onPress={() => setSelectedItem(item.id)}>
             <Icon
              src={isSelected 
              ? require('../../../../assets/icon/circle-act.png') 
              : require('../../../../assets/icon/circle.png')} 
              size={20} />
          </TouchableOpacity>
          <Text className='text-white'>{item.name}</Text>
        </View>
      );
    };

    const data = [
      { id: '1', name: 'Первый тарифный план (25% скидка) \nДля первых 10 студентов до 5 июля, 2023' },
      { id: '2', name: 'Второй тарифный план (15% скидка) \nДля первых 5 студентов до 7 июля, 2023' },
    ];
  
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const [isOpenPart, setIsOpenPart] = useState(false);
    const toggleDropdownPart = () => {
      setIsOpenPart(!isOpenPart);
    };
     
    const renderDropdown = () => {
      return (
        <View className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center'>
            <Icon src={require('../../../../assets/icon/videosquare.png')} size={20}/>
            <Text className='text-white text-base mx-4'>часть 1</Text>
            <TouchableOpacity className='absolute right-4' onPress={toggleDropdownPart}>
              <Icon
                src={isOpenPart 
                ? require('../../../../assets/icon/arrowup.png') 
                : require('../../../../assets/icon/arrowdown.png')} 
                size={20} />
            </TouchableOpacity>
          </View>

          <View> 
            {isOpenPart && (
              <View className='mt-2'>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod inventore placeat ipsum quo beatae aut molestias voluptatum quaerat, eveniet maiores corrupti molestiae tenetur facilis doloremque omnis repudiandae rem deleniti?</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>01:47 мин</Text>
                  <TouchableOpacity className='bg-custom-Green rounded-xl p-1'>
                    <Text className='text-black font-bold'>Проиграть</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      )
    };
 
      
  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row justify-between items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon src={require('../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Icon src={require('../../../../assets/icon/shopping.png')} size={24}/>
          </TouchableOpacity>
        </View>

        <View className='f-full h-40 items-center border border-white my-4'>  
              <Video
                  source={require('../../../../assets/video/1.mp4')}
                  paused={!isPlaying}  
                  controls={true}  
                  className='w-full h-full'
                  repeat={true}  
              /> 
              <TouchableOpacity onPress={() => setIsPlaying(p => !p)} className='w-9 h-9 absolute rounded-lg bg-custom-Green items-center justify-center top-16'>
                  <Icon src={require('../../../../assets/icon/play.png')} size={14}/>
              </TouchableOpacity>
        </View> 

        <Text className='text-white text-2xl font-bold'>Визуал в Instagram</Text>
        <View className='flex-row justify-between items-center w-half mt-1'>
          <Text>5.0</Text>
          <View className='flex-row'>
          <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
          <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
          <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
          <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
          <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
          </View>
          <Text>(21)</Text>
        </View>
        
        <Text
              className="text-white my-2"
              numberOfLines={showFullText ? undefined : 3}>
            Самый системный и творческий курс по визуалу в Instagram, который научит видеть кадры повсюду, 
            транслировать через фото Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda 
            velit asperiores, delectus quidem ea ratione repellat illum minima, quam recusandae voluptas 
            eveniet eaque ipsa dolorum quasi expedita praesentium et fugit.
            </Text>
            {showFullText ? (
              <TouchableOpacity onPress={toggleTextVisibility}>
                <Text className="text-blue-500">...less</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleTextVisibility}>
                <Text className="text-blue-500">...more</Text>
              </TouchableOpacity>
            )}

          <View className='my-2'>
              <Text className="text-white text-lg">14 990 Тенге</Text>
              <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                />
              <TouchableOpacity className="mt-5 bg-custom-Green rounded-xl items-center py-2">
                  <Text className="font-bold text-black text-base">Купить сейчас</Text>
              </TouchableOpacity >

              <View className='flex-row justify-between'>
                <TouchableOpacity className="mt-5 border border-white rounded-xl items-center py-2 px-5 flex-row w-40 justify-between">
                    <Icon src={require('../../../../assets/icon/shopping.png')} size={20}/>
                    <Text className="font-bold text-white text-base">в корзину</Text>
                </TouchableOpacity >
                <TouchableOpacity className="mt-5 border border-white rounded-xl items-center py-2 px-5 flex-row w-40 justify-between">
                    <Icon src={require('../../../../assets/icon/like.png')} size={20} color='white'/>
                    <Text className="font-bold text-white text-base">в избранное</Text>
                </TouchableOpacity >
              </View>                
          </View>

          <Text className="text-white text-base">Содержание курса</Text>
          <View className='flex-row items-center space-x-1 my-1'>
              <Text className='mr-2'>5 секций</Text>
              <Icon src={require('../../../../assets/icon/dot.png')} size={5}/>
              <Text className='mr-2'>18 лекций</Text>
              <Icon src={require('../../../../assets/icon/dot.png')} size={5}/>
              <Text>12 часов 20 минут</Text>
          </View>

          <View className='py-3 space-y-4'>

            <View className='rounded-xl bg-gray-700 p-2'>
              <View className='flex-row items-center px-2'>
                <Icon src={require('../../../../assets/icon/grid.png')} size={20}/>
                <Text className='text-white text-base mx-4'>Введение</Text>
                <TouchableOpacity className='absolute right-4' onPress={toggleDropdown}>
                  <Icon
                    src={isOpen 
                    ? require('../../../../assets/icon/arrowup.png') 
                    : require('../../../../assets/icon/arrowdown.png')} 
                    size={20} />
                </TouchableOpacity>
              </View>

              <View>
                {isOpen && (
                  <View className='mt-2 space-y-2'>
                    {/* {renderDropdown()}
                    {renderDropdown()} */}
                  </View>
                )}
              </View>
            </View>

            <View className='rounded-xl bg-gray-700 p-2'>
              <View className='flex-row items-center px-2'>
                <Icon src={require('../../../../assets/icon/grid.png')} size={20}/>
                <Text className='text-white text-base mx-4'>Основная часть</Text>
                <TouchableOpacity className='absolute right-4' onPress={toggleDropdown}>
                  <Icon
                    src={isOpen 
                    ? require('../../../../assets/icon/arrowup.png') 
                    : require('../../../../assets/icon/arrowdown.png')} 
                    size={20} />
                </TouchableOpacity>
              </View>

              <View>
                {isOpen && (
                  <View className='mt-2 space-y-2'>
                    {renderDropdown()}
                    {renderDropdown()}
                  </View>
                )}
              </View>
            </View>

          </View>
        
        
        </ScrollView>
    </SafeAreaView>
  );
}