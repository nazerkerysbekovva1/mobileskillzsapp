import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';
import Video from 'react-native-video';

interface DropdownProps {
  title: string;
  content: React.ReactNode;
  webinar: React.ReactNode;
}

interface DropdownContentItem {
  titlePart?: string;
  srcIcon?: any;
  about?: string;
  time?: string;
  timeRemaining? : string;
  onPlay?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, content, webinar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className='rounded-xl bg-custom-Gray p-2 mb-4'>
      <View className='flex-row items-center px-2'>
        <Icon src={require('../../../../../assets/icon/grid.png')} size={20}/>
        <Text className='text-white text-base mx-4'>{title}</Text>
        <TouchableOpacity className='absolute right-4' onPress={toggleDropdown}>
           <Icon
              src={isOpen 
                ? require('../../../../../assets/icon/arrowup.png') 
                : require('../../../../../assets/icon/arrowdown.png')} 
              size={20} />
        </TouchableOpacity>
      </View>

      <View>
        {isOpen && (
          <View className='mt-2 space-y-2'>
            {content}
            {webinar}
          </View>
        )}
      </View>
    </View>
  )
}

export const WebinarCard = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);  
  const [showFullText, setShowFullText] = useState(false);
  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

    const handleEnrollNow = () => {
        console.log('handle Enroll Now');
        navigation.navigate('WebinarTime');
    };
  
    const renderDropdownContent = (items: DropdownContentItem[]) => {
      return items.map((item, index) => {
        const [isOpenPart, setIsOpenPart] = useState(false);
  
        const toggleDropdownPart = () => {
          setIsOpenPart(!isOpenPart);
        };

      return (
        <View key={index} className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center'>
            <Icon src={item.srcIcon} size={20}/>
            <Text className='text-white text-base mx-4'>{item.titlePart}</Text>
            <TouchableOpacity className='absolute right-0' onPress={toggleDropdownPart}>
              <Icon
                src={isOpenPart 
                ? require('../../../../../assets/icon/arrowup.png') 
                : require('../../../../../assets/icon/arrowdown.png')} 
                size={20} />
            </TouchableOpacity>
          </View>

          <View> 
            {isOpenPart && (
              <View className='mt-2'>
                <Text>{item.about}</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>{item.time}</Text>
                  <TouchableOpacity onPress={item.onPlay} className='bg-custom-Green rounded-xl p-1'>
                    <Text className='text-black font-bold'>Проиграть</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        );
      });
    };

    const renderDropdownZoom = (items: DropdownContentItem[]) => {
      return items.map((item, index) => {
        const [isOpenPart, setIsOpenPart] = useState(false);
  
        const toggleDropdownPart = () => {
          setIsOpenPart(!isOpenPart);
        };

      return (
        <View key={index} className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center justify-between'>

            <View className='flex-row space-x-4'>
              <Icon src={item.srcIcon} size={20}/>
              <Text className='text-white text-base mx-4'>{item.titlePart}</Text>
            </View> 

            <View className='flex-row space-x-4'>
              <Text className='text-white'>{item.time}</Text>
              <TouchableOpacity onPress={toggleDropdownPart}>
                <Icon
                  src={isOpenPart 
                  ? require('../../../../../assets/icon/arrowup.png') 
                  : require('../../../../../assets/icon/arrowdown.png')} 
                  size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View> 
            {isOpenPart && (
              <View className='mt-2'>
                <Text className='absolute -top-2 right-9 text-white'>{item.timeRemaining}</Text>
                <Text className='pt-4'>{item.about}</Text>
              </View>
            )}
          </View>
        </View>
        );
      });
    };

    const courseContent = [
      {
        title: 'Введение',
        content: [],
        webinar: [],
      },
      {
        title: 'Основная часть',
        content: [
          {
            titlePart: 'часть 1',
            srcIcon: require('../../../../../assets/icon/videosquare.png'),
            about: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam veritatis velit cum debitis perferendis reprehenderit voluptates libero, amet ea quo expedita aut dolorem tempore illo, sapiente culpa totam et.',
            time: '01:47 мин',
            onPlay: () => {},
          }, 
        ],
        webinar: [
          {
            titlePart: 'Zoom live class',
            srcIcon: require('../../../../../assets/icon/video.png'),
            about: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam veritatis velit cum debitis perferendis reprehenderit voluptates libero, amet ea quo expedita aut dolorem tempore illo, sapiente culpa totam et.',
            time: '25 июля 19:30',
            timeRemaining: '30 мин',
          }
        ]
      },
    ]
 
    const comment = [
      {
        srcIcon: require('../../../../../assets/ava.png'),
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam veritatis velit cum debitis perferendis reprehenderit voluptates libero, amet ea quo expedita aut dolorem tempore illo, sapiente culpa totam et.',
        time: '12.12.2022',
      },
      {
        srcIcon: require('../../../../../assets/ava.png'),
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam veritatis velit cum debitis perferendis ',
        time: '12.12.2022',
      },
      {
        srcIcon: require('../../../../../assets/ava.png'),
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere aperiam veritatis velit cum debitis perferendis reprehenderit voluptates libero, amet ea quo expedita aut dolorem tempore illo, sapiente culpa totam et.',
        time: '12.12.2022',
      },
      {
        srcIcon: require('../../../../../assets/ava.png'),
        comment: 'Lorem, ipsum dolor sit amet consectetur',
        time: '12.12.2022',
      },
    ]
      
  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row justify-between items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
              <Icon src={require('../../../../../assets/icon/shopping.png')} size={24}/>
          </TouchableOpacity>
        </View>

        <View className='w-full h-40 items-center border border-white my-4'>  
              <Video
                  source={require('../../../../../assets/video/1.mp4')}
                  paused={!isPlaying}  
                  controls={true}  
                  className='w-full h-full'
                  repeat={true}  
              /> 
              <TouchableOpacity onPress={() => setIsPlaying(p => !p)} className='w-9 h-9 absolute rounded-lg bg-custom-Green items-center justify-center top-16'>
                  <Icon src={require('../../../../../assets/icon/play.png')} size={14}/>
              </TouchableOpacity>
        </View> 

        <Text className='text-white text-2xl font-bold'>Визуал в Instagram</Text>

        <View className='flex-row justify-between items-center  mt-1'>
          <View className='flex-row justify-between items-center w-half'>
            <Text>5.0</Text>
            <View className='flex-row'>
              <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
              <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
              <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
              <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
              <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
            </View>
            <Text>(21)</Text>
          </View>

          <Text className='font-bold text-white'>25 июля 19:30</Text>
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
              <Text className="text-white text-lg">Бесплатно</Text>
              <TouchableOpacity onPress={handleEnrollNow} className="mt-5 bg-custom-Green rounded-xl items-center py-2">
                  <Text className="font-bold text-black text-base">Записаться сейчас</Text>
              </TouchableOpacity >

                <TouchableOpacity className="mt-3 border border-white rounded-xl items-center justify-center space-x-2 py-1 px-5 flex-row">
                    <Icon src={require('../../../../../assets/icon/like.png')} size={20} color='white'/>
                    <Text className="font-bold text-white text-base">в избранное</Text>
                </TouchableOpacity >
          </View>

          <Text className="text-white text-base">Содержание вебинара</Text>
          <View className='flex-row items-center space-x-1 my-1'>
              <Text className='mr-2'>2 секций</Text>
              <Icon src={require('../../../../../assets/icon/dot.png')} size={5}/>
              <Text className='mr-2'>2 лекций</Text>
              <Icon src={require('../../../../../assets/icon/dot.png')} size={5}/>
              <Text>12 часов 20 минут</Text>
          </View>

          <View className='py-3'>
              {courseContent.map((item, index) =>
                <Dropdown 
                  key={index} 
                  title={item.title} 
                  content={renderDropdownContent(item.content)}
                  webinar={renderDropdownZoom(item.webinar)} 
                />
              )}
          </View>
        
          <View className='p-3 bg-custom-Gray rounded-xl flex-row items center -mt-2'>
            <Image source={require('../../../../../assets/ava.png')} className='w-17 h-17 rounded-lg'/>
            <View className='justify-center mx-3 space-y-1'>
              <Text className='text-base text-white'>Адам Адамов</Text>
              <Text className='text-white'>SMM специалист</Text>
            </View>

            <View className='flex-row top-3 right-3 absolute items-center'>
                <Text className='mr-2 font-bold text-white'>4.7</Text>
                <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
            </View>
            <TouchableOpacity className='flex-row bottom-4 right-3 absolute items-center'>
                <Text className='mr-2 text-white'>5 курсов</Text>
                <Icon src={require('../../../../../assets/icon/arrow-right.png')} size={24}/>
            </TouchableOpacity>
          </View>

          <View className='mt-4'>
          {comment.map((item, index) => 
            (
            <View key={index} className='my-2'>
              <View className='flex-row justify-between items-center '>
                  <View className='flex-row space-x-4'>
                    <Image source={item.srcIcon} className='w-10 h-10 rounded-lg'/>
                    <View className='flex-row items-center'>
                      <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
                      <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
                      <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
                      <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
                      <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
                    </View>
                  </View>
                  <Text className='text-white'>{item.time}</Text>
              </View>
              <Text className='text-white py-1'>{item.comment}</Text>
            </View>
            )
          )}
          </View>

        </ScrollView>
    </SafeAreaView>
  );
}