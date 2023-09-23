import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';

import { useQuery } from 'react-query';
import { CourseData, fetchCourse, Comment, FAQS, Chapter, File, Session } from '../../../../data/client/http-client';

const WebinarStatus = {
  NOT_STARTED: 'not_started',
  STARTED: 'started',
  COMPLETED: 'completed',
};


interface DropdownProps {
  titleContent?: string;
  content?: React.ReactNode;
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void; 
}

interface DropdownContentItem {
  titlePart?: string;
  srcIcon?: any;
  about?: string;
  time?: string;
  timeRemaining? : string;
  onPlay?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ titleContent, content, isOpen, setIsOpen }) => {
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className='rounded-xl bg-custom-Gray p-2 mb-4'>
      <View className='flex-row items-center px-2'>
        <Icon src={require('../../../../../assets/icon/grid.png')} size={20}/>
        <Text className='text-white text-base mx-4'>{titleContent}</Text>
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
          </View>
        )}
      </View>
    </View>
  )
}

export const CourseTime = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const Data = route?.params.data;
  let course: any;

  // console.log(Data)
  if(Data.type === 'course'){
    const { data: GetCourse } = useQuery('Course', () => fetchCourse(Data.id));
    course = GetCourse?.data;

  } else if(Data.type === 'webinar'){
    const { data: GetWebinar } = useQuery('Webinar', () => fetchCourse(Data.id));
    course = GetWebinar?.data;

  } else{
    const { data: GetTextLesson } = useQuery('TextLesson', () => fetchCourse(Data.id));
    course = GetTextLesson?.data;

  }

  const [webinarStatus, setWebinarStatus] = useState(WebinarStatus.NOT_STARTED);

    const handleRecheck = () => {
        console.log('handle recheck');
        setWebinarStatus(WebinarStatus.STARTED);
    };

    const handleToWebinar = () => {
      console.log('Login to the webinar');
      setWebinarStatus(WebinarStatus.COMPLETED);
  };
      
  const initialDropdownStates = Array(course?.files_chapters.length).fill(false);
  const [isOpenParts, setIsOpenParts] = useState(initialDropdownStates);

  const initialSessionsStates = Array(course?.session_chapters.length).fill(false);
  const [isOpenPartsOfSession, setIsOpenPartsOfSession] = useState(initialSessionsStates);

  const [isOpenDropdowns, setIsOpenDropdowns] = useState(Array(course?.files_chapters.length).fill(false));
  const toggleDropdown = (index: number) => {
    const newIsOpenDropdowns = [...isOpenDropdowns];
    newIsOpenDropdowns[index] = !newIsOpenDropdowns[index];
    setIsOpenDropdowns(newIsOpenDropdowns);
  };

  const [isOpenFAQs, setIsOpenFAQs] = useState(Array(course?.faqs.length).fill(false));
  const toggleFAQDropdown = (index: number) => {
    const newIsOpenFAQs = [...isOpenFAQs];
    newIsOpenFAQs[index] = !newIsOpenFAQs[index];
    setIsOpenFAQs(newIsOpenFAQs);
  };

  const [isOpenSessions, setIsOpenSessions] = useState(Array(course?.session_chapters.length).fill(false));
  const toggleSessions = (index: number) => {
    const newIsOpenDropdowns = [...isOpenSessions];
    newIsOpenDropdowns[index] = !newIsOpenDropdowns[index];
    setIsOpenSessions(newIsOpenDropdowns);
  };

    const renderDropdownContent = (items: File[]) => {
      return items.map((item, index) => {
        const toggleDropdownPart = () => {
          const newIsOpenParts = [...isOpenParts];
          newIsOpenParts[index] = !newIsOpenParts[index];
          setIsOpenParts(newIsOpenParts);
        };
      return (
        <View key={index} className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center'>
            <Icon src={require('../../../../../assets/icon/clipboardtext.png')} size={20}/>
            <Text className='text-white text-base mx-4 w-3/4'>{item.title}</Text>
            <TouchableOpacity className='absolute right-4' onPress={toggleDropdownPart}>
              <Icon
                src={isOpenParts[index] 
                ? require('../../../../../assets/icon/arrowup.png') 
                : require('../../../../../assets/icon/arrowdown.png')} 
                size={20} />
            </TouchableOpacity>
          </View>

          <View> 
            {isOpenParts[index] && (
              <View className='mt-2'>
                <Text>{item.description}</Text>
                <View className='flex-row justify-between items-center'>
                  <Text>{item.volume}</Text>
                  <TouchableOpacity onPress={() => console.log} className='bg-custom-Green rounded-xl p-1'>
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

    const renderDropdownZoom = (items: Session[]) => {
      return items.map((item, index) => {
        const toggleDropdownPart = () => {
          const newIsOpenParts = [...isOpenPartsOfSession];
          newIsOpenParts[index] = !newIsOpenParts[index];
          setIsOpenPartsOfSession(newIsOpenParts);
        };

        const timeRemaining = (timestamp: number) => {
          const providedTimeMillis = timestamp * 1000;
          const currentTimeMillis = Date.now();
          const timeDifferenceInSeconds = (providedTimeMillis - currentTimeMillis) / 1000;
        
          return timeDifferenceInSeconds;
        }
      return (
        <View key={index} className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center space-between'>

            <View className='flex-row space-x-4'>
              <Icon src={require('../../../../../assets/icon/video.png')} size={20}/>
              <Text className='text-white text-base w-40'>{item.title}</Text>
            </View> 

            <View className='flex-row space-x-2'>
              <Text className='text-white'>{item.date}</Text>
              <TouchableOpacity onPress={toggleDropdownPart}>
                <Icon
                  src={isOpenPartsOfSession[index] 
                  ? require('../../../../../assets/icon/arrowup.png') 
                  : require('../../../../../assets/icon/arrowdown.png')} 
                  size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View> 
            {isOpenPartsOfSession[index] && (
              <View className='mt-2'>
                <Text className='absolute -top-2 right-9 text-white'>{item.date}</Text>
                <Text className='pt-4'>{item.description}</Text>
              </View>
            )}
          </View>
        </View>
        );
      });
    };

      
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

        {course?.files_chapters && 
            <View className='pt-3'>
                {course.files_chapters.map((item: Chapter, index: number) =>
                  <Dropdown 
                    key={index} 
                    titleContent={item.title} 
                    content={renderDropdownContent(item.files)} 
                    isOpen={isOpenDropdowns[index]} 
                    setIsOpen={() => toggleDropdown(index)} 
                    />
                )}
            </View>
          }

          {course?.session_chapters && 
            <View>
                {course.session_chapters.map((item: Chapter, index: number) =>
                    <Dropdown 
                      key={index} 
                      titleContent={item.title} 
                      content={renderDropdownZoom(item.sessions)} 
                      isOpen={isOpenSessions[index]}
                      setIsOpen={() => toggleSessions(index)}
                    />
                )}
            </View>
          }

        </ScrollView>
    </SafeAreaView>
  );
}