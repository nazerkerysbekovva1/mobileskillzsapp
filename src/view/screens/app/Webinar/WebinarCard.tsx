import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';
import Video from 'react-native-video';

import { useQuery } from 'react-query';
import { CourseData, fetchCourse, Comment, FAQS, Chapter, File, Session } from '../../../../data/client/http-client';

interface DropdownProps {
  title: string;
  content: React.ReactNode;
}


const Dropdown: React.FC<DropdownProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className='rounded-xl bg-custom-Gray p-2 mb-4'>
      <View className='flex-row items-center px-2'>
        <Icon src={require('../../../../../assets/icon/grid.png')} size={20}/>
        <Text className='text-white text-base mx-4 w-3/4'>{title}</Text>
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

export const WebinarCard = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const webinarData = route?.params.data;

  const { data: GetWebinar } = useQuery('Webinar', () => fetchCourse(webinarData.id));
  const webinar = GetWebinar?.data;
console.log('GetWebinar',GetWebinar)

  const [isPlaying, setIsPlaying] = useState(false);  
  const [showFullText, setShowFullText] = useState(false);
  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

    const handleEnrollNow = () => {
        console.log('handle Enroll Now');
        navigation.navigate('WebinarTime');
    };
  
    const renderDropdownContent = (items: File[]) => {
      return items.map((item, index) => {
        const [isOpenPart, setIsOpenPart] = useState(false);

        const toggleDropdownPart = () => {
          setIsOpenPart(!isOpenPart);
        };
      return (
        <View key={index} className='p-2 border border-gray-500 rounded-xl'>
          <View className='flex-row items-center'>
            <Icon src={require('../../../../../assets/icon/videosquare.png')} size={20}/>
            <Text className='text-white text-base mx-4'>{item.title}</Text>
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
        const [isOpenPart, setIsOpenPart] = useState(false);

        const toggleDropdownPart = () => {
          setIsOpenPart(!isOpenPart);
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
                <Text className='absolute -top-2 right-9 text-white'>{item.date}</Text>
                <Text className='pt-4'>{item.description}</Text>
              </View>
            )}
          </View>
        </View>
        );
      });
    };

    const teacherAvatar = webinar?.teacher?.avatar ? { uri: webinar?.teacher?.avatar} : require('../../../../../assets/ava.png');   
    
    const renderStarRating = (rating: string) => {
      const maxStars = 5;
      const numericRating = parseFloat(rating); 
      const roundedRating = Math.round(numericRating * maxStars) / maxStars;
      const stars = [];
    
      for (let i = 1; i <= maxStars; i++) {
        if (i <= roundedRating) {
          stars.push(
            <Image key={i} source={require('../../../../../assets/icon/star.png')} style={{ width: 14, height: 14 }}
            />
          );
        } else {
          stars.push(
            <Image key={i} source={require('../../../../../assets/icon/star-0.png')} style={{ width: 14, height: 14, opacity: 0.5 }}
            />
          );
        }
      }
    
      return (
        <View className='flex-row'>
          {stars}
        </View>
      );
    };
      
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

        <Text className='text-white text-2xl font-bold'>{webinar?.title}</Text>

        <View className='flex-row justify-between items-center  mt-1'>
          <View className='flex-row justify-between items-center w-half'>
            <Text>{webinar?.rate}</Text>
            <View className='flex-row'>
                {renderStarRating(webinar?.rate)}
            </View>
            <Text>({webinar?.reviews_count})</Text>
          </View>

          <Text className='font-bold text-white'>{new Date(webinar?.start_date * 1000).toTimeString()}</Text>
        </View>
        
        <Text
              className="text-white my-2"
              numberOfLines={showFullText ? undefined : 3}>{webinar?.description}</Text>
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
              <View className='flex-row'>
                {webinar?.price 
                  ? ( <View>
                    {webinar?.best_ticket_string
                      ? (<View className='flex-row'>
                        <Text className="text-white text-lg mr-10">{webinar?.best_ticket_string}</Text>
                        <Text className="text-white text-lg mr-10 line-through">{webinar?.price_string}</Text>
                      </View>)
                      : (<Text className="text-white text-lg mr-10">{webinar?.price_string}</Text>)
                    }
                  </View>)
                  : (<Text className="text-white text-lg mr-10">Free</Text>)
                }
              </View>
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

          {webinar?.files_chapters && 
            <View className='pt-3'>
                {webinar.files_chapters.map((item: Chapter, index: number) =>
                    <Dropdown 
                      key={index} 
                      title={item.title} 
                      content={renderDropdownContent(item.files)}
                    />
                )}
            </View>
          }

          {webinar?.session_chapters && 
            <View>
                {webinar.session_chapters.map((item: Chapter, index: number) =>
                    <Dropdown 
                      key={index} 
                      title={item.title} 
                      content={renderDropdownZoom(item.sessions)} 
                    />
                )}
            </View>
          }
        
        <View className='p-3 bg-custom-Gray rounded-xl flex-row items center mb-4'>
            <Image source={teacherAvatar} className='w-17 h-17 rounded-lg'/>
            <View className='justify-center mx-3 space-y-1'>
              <Text className='text-base text-white'>{webinar?.teacher?.full_name}</Text>
              <Text className='text-white'>{webinar?.teacher?.bio}</Text>
            </View>

            <View className='flex-row top-3 right-3 absolute items-center'>
                <Text className='mr-2 font-bold text-white'>{webinar?.teacher?.rate}</Text>
                <Icon src={require('../../../../../assets/icon/star.png')} size={14}/>
            </View>
            <TouchableOpacity className='flex-row bottom-1 right-3 absolute items-center'>
                <Text className='mr-2 text-white'>5 курсов</Text>
                <Icon src={require('../../../../../assets/icon/arrow-right.png')} size={24}/>
            </TouchableOpacity>
          </View>

          {webinar?.comments && 
            <View className='mt-4'>
              {webinar?.comments.map((item: Comment, index: number) => 
                (
                <View key={index} className='my-2'>
                  <View className='flex-row justify-between items-center '>
                      <View className='flex-row space-x-4'>
                        {item.user?.avatar ? (
                          <Image source={{uri: item.user?.avatar}} className='w-10 h-10 rounded-lg'/>
                        ): (
                          <Image source={require('../../../../../assets/icon/star-0.png')} className='w-10 h-10 rounded-lg'/>
                        )}
                        
                        <View className='flex-row items-center'>
                            {renderStarRating(String(item.user?.rate))}
                        </View>
                      </View>
                      <Text className='text-white'>{new Date(item?.create_at * 1000).toLocaleDateString('en-GB')}</Text>
                  </View>
                  <Text className='text-white py-1'>{item.comment}</Text>
                </View>
                )
              )}
            </View>

          }

        </ScrollView>
    </SafeAreaView>
  );
}