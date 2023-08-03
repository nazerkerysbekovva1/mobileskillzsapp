import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';

const WebinarStatus = {
  NOT_STARTED: 'not_started',
  STARTED: 'started',
  COMPLETED: 'completed',
};


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

export const WebinarTime = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [webinarStatus, setWebinarStatus] = useState(WebinarStatus.NOT_STARTED);

    const handleRecheck = () => {
        console.log('handle recheck');
        setWebinarStatus(WebinarStatus.STARTED);
    };

    const handleToWebinar = () => {
      console.log('Login to the webinar');
      setWebinarStatus(WebinarStatus.COMPLETED);
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

      
  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>

        <View className='items-center mb-6'>  
          <View className='flex-row items-center space-x-3 my-4'>
              <Icon src={require('../../../../../assets/img/live_session.png')} size={86}/>
              <View style={{width: '65%'}}>
                <Text className='text-white'>
                  {webinarStatus === "not_started"
                    ? 'Вебинар ещё не начался. \nВебинар начнётся 25 июля в 19:30'
                    : webinarStatus === "started"
                      ? 'Вебинар начался. \nВы можете зайти на вебинар сейчас'
                      : 'Вебинар закончен. \nВы не можете присоединиться'}

                </Text>
              </View>
          </View>
          
          {webinarStatus === "not_started" && (
            <TouchableOpacity onPress={handleRecheck} className='rounded-lg bg-custom-Green py-1 px-2 items-center'>
              <Text className='text-black font-bold'>Проверить снова</Text>
            </TouchableOpacity>
          )}

          {webinarStatus === "started" && (
            <TouchableOpacity onPress={handleToWebinar} className='flex-row rounded-lg bg-custom-Green py-1 px-2 space-x-1 items-center'>
              <Icon src={require('../../../../../assets/icon/video.png')} size={16} color='black' />
              <Text className='text-black font-bold'>Войти в вебинар</Text>
            </TouchableOpacity>
          )}
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

        </ScrollView>
    </SafeAreaView>
  );
}