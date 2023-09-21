import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../component/Icon';
import Video from 'react-native-video';

import { CourseData, fetchCourse, Comment, FAQS, Chapter, File } from '../../../data/client/http-client';

interface Item {
  id: string;
  name: string;
}

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
    <View className='rounded-xl bg-custom-Gray p-2 mb-3'>
      <View className='flex-row items-center px-2'>
        <Icon src={require('../../../../assets/icon/grid.png')} size={20}/>
        <Text className='text-white text-base mx-4 w-3/4'>{title}</Text>
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
              {content}
          </View>
        )}
      </View>
    </View>
  )
}

const DropdownFAQItem: React.FC<FAQS> = ({ title, answer }) => {
  const [isOpenPart, setIsOpenPart] = useState(false);

  const toggleDropdownPart = () => {
    setIsOpenPart(!isOpenPart);
  };

  return (
    <View className='p-2 border border-gray-500 rounded-xl mt-2 space-y-2'>
      <View className='flex-row items-center'>
        <Icon src={require('../../../../assets/icon/help-circle.png')} size={20}/>
        <Text className='text-white text-base mx-4 w-2/3'>{title}</Text>
        <TouchableOpacity className='absolute right-4' onPress={toggleDropdownPart}>
          <Icon
            src={isOpenPart 
            ? require('../../../../assets/icon/arrowup.png') 
            : require('../../../../assets/icon/arrowdown.png')} 
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View> 
        {isOpenPart && (
          <View className='mt-2'>
            <Text>{answer}</Text>
          </View>
        )}  
      </View>
    </View>
  );
};

const CourseCard = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  
  const courseData = route?.params.data;

  const { data: GetCourse } = useQuery('Course', () => fetchCourse(courseData.id));
  const course = GetCourse?.data;

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

    const handleBuyNow = () => {
      if (selectedItem) {
        console.log('Selected Item:', selectedItem);
      } else {
        console.log('No item selected.');
      }
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
            <Icon src={require('../../../../assets/icon/clipboardtext.png')} size={20}/>
            <Text className='text-white text-base mx-4 w-3/4'>{item.title}</Text>
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

    const teacherAvatar = course?.teacher?.avatar ? { uri: course?.teacher?.avatar} : require('../../../../assets/ava.png');   
    
    const renderStarRating = (rating: string) => {
      const maxStars = 5;
      const numericRating = parseFloat(rating); 
      const roundedRating = Math.round(numericRating * maxStars) / maxStars;
      const stars = [];
    
      for (let i = 1; i <= maxStars; i++) {
        if (i <= roundedRating) {
          stars.push(
            <Image key={i} source={require('../../../../assets/icon/star.png')} style={{ width: 14, height: 14 }}
            />
          );
        } else {
          stars.push(
            <Image key={i} source={require('../../../../assets/icon/star-0.png')} style={{ width: 14, height: 14, opacity: 0.5 }}
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
              <Icon src={require('../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
              <Icon src={require('../../../../assets/icon/shopping.png')} size={24}/>
          </TouchableOpacity>
        </View>

        <View className='w-full h-40 items-center border border-white my-4'>  
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

        <Text className='text-white text-2xl font-bold'>{course?.title}</Text>
        <View className='flex-row justify-between items-center w-half mt-1'>
          <Text>{course?.rate}</Text>
          <View className='flex-row'>
              {renderStarRating(course?.rate)}
          </View>
          <Text>({course?.reviews_count})</Text>
        </View>
        
        <Text
              className="text-white my-2"
              numberOfLines={showFullText ? undefined : 3}>{course?.description}</Text>
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
              {course?.price 
                ? ( <View>
                  {course?.best_ticket_string
                    ? (<View className='flex-row'>
                      <Text className="text-white text-lg mr-10">{course?.best_ticket_string}</Text>
                      <Text className="text-white text-lg mr-10 line-through">{course?.price_string}</Text>
                    </View>)
                    : (<Text className="text-white text-lg mr-10">{course?.price_string}</Text>)
                  }
                </View>)
                : (<Text className="text-white text-lg mr-10">Free</Text>)
              }
              </View>
              {/* <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                /> */}
              <TouchableOpacity onPress={handleBuyNow} className="mt-5 bg-custom-Green rounded-xl items-center py-2">
                  <Text className="font-bold text-black text-base">Купить сейчас</Text>
              </TouchableOpacity >

              <View className='flex-row justify-between mt-3'>
                <TouchableOpacity className="border border-white rounded-xl items-center py-1 px-5 flex-row w-40 justify-between">
                    <Icon src={require('../../../../assets/icon/shopping.png')} size={20}/>
                    <Text className="font-bold text-white text-base">в корзину</Text>
                </TouchableOpacity >
                <TouchableOpacity className="border border-white rounded-xl items-center py-1 px-5 flex-row w-40 justify-between">
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
          
          {course?.files_chapters && 
            <View className='py-3'>
                {course.files_chapters.map((item: Chapter, index: number) =>
                  <Dropdown key={index} title={item.title} content={renderDropdownContent(item.files)} />
                )}
            </View>
          }

          <View className='p-3 bg-custom-Gray rounded-xl flex-row items center -mt-2 mb-4'>
            <Image source={teacherAvatar} className='w-17 h-17 rounded-lg'/>
            <View className='justify-center mx-3 space-y-1'>
              <Text className='text-base text-white'>{course?.teacher?.full_name}</Text>
              <Text className='text-white'>{course?.teacher?.bio}</Text>
            </View>

            <View className='flex-row top-3 right-3 absolute items-center'>
                <Text className='mr-2 font-bold text-white'>{course?.teacher?.rate}</Text>
                <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
            </View>
            <TouchableOpacity className='flex-row bottom-1 right-3 absolute items-center'>
                <Text className='mr-2 text-white'>5 курсов</Text>
                <Icon src={require('../../../../assets/icon/arrow-right.png')} size={24}/>
            </TouchableOpacity>
          </View>

          <View className='rounded-xl bg-custom-Gray p-2 mb-4'>
            <View className='flex-row items-center px-2'>
              <Icon src={require('../../../../assets/icon/messagequestion.png')} size={20}/>
              <Text className='text-white text-lg font-bold mx-4'>FAQ</Text>
            </View>
              {course?.faqs && 
                  course.faqs.map((item: FAQS, index: number) => (
                    <DropdownFAQItem
                      key={index}
                      title={item.title}
                      answer={item.answer}
                    />
                  ))
              }
          </View>

          {course?.comments && 
            <View className='mt-4'>
              {course?.comments.map((item: Comment, index: number) => 
                (
                <View key={index} className='my-2'>
                  <View className='flex-row justify-between items-center '>
                      <View className='flex-row space-x-4'>
                        {item.user?.avatar ? (
                          <Image source={{uri: item.user?.avatar}} className='w-10 h-10 rounded-lg'/>
                        ): (
                          <Image source={require('../../../../assets/icon/star-0.png')} className='w-10 h-10 rounded-lg'/>
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

export default CourseCard;