import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useQuery, useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../component/Icon';
import Video from 'react-native-video';
import { renderStarRating } from '../../../component/ratingStar';
import { CourseData, fetchCourse, Comment, FAQS, Chapter, File, Session, userLogin, toggleFavorites } from '../../../data/client/http-client';
import { Alert } from 'react-native';

interface Item {
  id: string;
  name: string;
}

interface DropdownProps {
  titleContent?: string;
  content?: React.ReactNode;
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void; 
}

type RootStackParamList = {
  CourseTime: {
    data: CourseData;
  };
  MentorProfile: {
    id: number;
  }
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

const Dropdown: React.FC<DropdownProps> = ({ titleContent, content, isOpen, setIsOpen }) => {
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className='rounded-xl bg-custom-Gray p-2 mb-4'>
      <View className='flex-row items-center px-2'>
        <Icon src={require('../../../../assets/icon/grid.png')} size={20}/>
        <Text className='text-white text-base mx-4 w-3/4'>{titleContent}</Text>
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

const DropdownFAQItem: React.FC<FAQS & DropdownProps> = ({ title, answer, isOpen, setIsOpen }) => {
  const toggleDropdownPart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className='p-2 border border-gray-500 rounded-xl mt-2 space-y-2'>
      <View className='flex-row items-center'>
        <Icon src={require('../../../../assets/icon/help-circle.png')} size={20}/>
        <Text className='text-white text-base mx-4 w-2/3'>{title}</Text>
        <TouchableOpacity className='absolute right-4' onPress={toggleDropdownPart}>
          <Icon
            src={isOpen 
            ? require('../../../../assets/icon/arrowup.png') 
            : require('../../../../assets/icon/arrowdown.png')} 
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View> 
        {isOpen && (
          <View className='mt-2'>
            <Text className='text-white '>{answer}</Text>
          </View>
        )}  
      </View>
    </View>
  );
};

const CourseCard = ({ route }: { route: any }) => {
  const navigation = useNavigation<NavigationProp>();
  
  const Data = route?.params.data;
  let course: any;

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
  // console.log(course);
  // console.log(Data.type)

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

    const handleBuyNow = async(data: CourseData) => {
      if (selectedItem) {
        console.log('Selected Item:', selectedItem);
      } 
      if(await userLogin()){
        navigation.navigate('CourseTime', {
          data,
        });
      } else{
        Alert.alert('Message','Please Sign in');
      }
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
            <Icon src={require('../../../../assets/icon/clipboardtext.png')} size={20}/>
            <Text className='text-white text-base mx-4 w-3/4'>{item.title}</Text>
            <TouchableOpacity className='absolute right-4' onPress={toggleDropdownPart}>
              <Icon
                src={isOpenParts[index] 
                ? require('../../../../assets/icon/arrowup.png') 
                : require('../../../../assets/icon/arrowdown.png')} 
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
              <Icon src={require('../../../../assets/icon/video.png')} size={20}/>
              <Text className='text-white text-base w-40'>{item.title}</Text>
            </View> 

            <View className='flex-row space-x-2'>
              <Text className='text-white'>{item.date}</Text>
              <TouchableOpacity onPress={toggleDropdownPart}>
                <Icon
                  src={isOpenPartsOfSession[index] 
                  ? require('../../../../assets/icon/arrowup.png') 
                  : require('../../../../assets/icon/arrowdown.png')} 
                  size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View> 
            {isOpenPartsOfSession[index] && (
              <View className='mt-2'>
                <Text className='absolute -top-2 right-9 text-white'>{item.date}</Text>
                <Text className='pt-4 text-white '>{item.description}</Text>
              </View>
            )}
          </View>
        </View>
        );
      });
    };

    const teacherAvatar = course?.teacher?.avatar ? { uri: course?.teacher?.avatar} : require('../../../../assets/default-image.png');   
    const imageCover = course?.image_cover ? { uri: course?.image_cover} : require('../../../../assets/default-image.png');   

    const [activeLike, setActiveLike] = useState(course?.is_favorite);
    const [activeBasket, setActiveBasket] = useState(false);
      
      useEffect(() => {
          setActiveLike(course?.is_favorite);
      }, [course?.is_favorite]);
  console.log(course?.is_favorite)
      const mutationFavorites = useMutation(toggleFavorites, {
        onSuccess: async () => {
          console.log('toggle fav')
        }
      });
      const toggleLikeVisibility = async (id: number) => {
        if (await userLogin()) {
          const response = await mutationFavorites.mutateAsync(id);
          if (!response) {
            console.log('error');
          } else {
            setActiveLike(!activeLike); 
          }
        } else {
          Alert.alert('Message', 'Please Sign in');
        }
      };   
      const toggleBasketVisibility = async() => {
        if(await userLogin()){
          setActiveBasket(!activeBasket);        // POST: set 
        } else{
          Alert.alert('Message','Please Sign in');
        }
      };

      const handleNavigateToMentor = (id: number) => {
        navigation.navigate('MentorProfile', {
          id,
        });
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

        <View className='w-full h-48 items-center my-4'>  
              <Image source={imageCover} className='w-full h-full'/>
              <TouchableOpacity className='w-9 h-9 absolute rounded-lg bg-custom-Green items-center justify-center top-20'>
                  <Icon src={require('../../../../assets/icon/play.png')} size={14}/>
              </TouchableOpacity>
        </View> 

        <Text className='text-white text-2xl font-bold'>{course?.title}</Text>

        <View className='flex-row justify-between items-center  mt-1'>
          <View className='flex-row justify-between items-center w-half'>
            <Text>{course?.rate}</Text>
            <View className='flex-row'>
                {renderStarRating(course?.rate)}
            </View>
            <Text>({course?.reviews_count})</Text>
          </View>

          {course?.type === 'webinar' && 
                  <Text className='font-bold text-white'>{new Date(course?.start_date * 1000).toTimeString()}</Text>}
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
              <TouchableOpacity onPress={() => handleBuyNow(course)} className="mt-5 bg-custom-Green rounded-xl items-center py-2">
                  <Text className="font-bold text-black text-base">Купить сейчас</Text>
              </TouchableOpacity >

              {course?.type === 'webinar'
                ? (
                    <TouchableOpacity onPress={() => toggleLikeVisibility(course?.id)} className={activeLike ? "mt-3 bg-custom-Green border rounded-xl items-center justify-center space-x-2 py-1 px-5 flex-row"
                                                                                           : "mt-3 border border-white rounded-xl items-center justify-center space-x-2 py-1 px-5 flex-row"}>
                      <Icon src={require('../../../../assets/icon/like.png')} size={20} color={activeLike ? 'black' : 'white'}/>
                      <Text className={activeLike ? "font-bold text-black text-base"
                                                  : "font-bold text-white text-base"}>в избранное</Text>
                    </TouchableOpacity > 
                ) : (
                    <View className='flex-row justify-between mt-3'>
                      <TouchableOpacity onPress={toggleBasketVisibility} className={activeBasket ? "bg-custom-Green border rounded-xl items-center py-1 px-5 flex-row w-44 justify-between"
                                                                                                 : "border border-white rounded-xl items-center py-1 px-5 flex-row w-44 justify-between"}>
                          <Icon src={require('../../../../assets/icon/shopping.png')} size={20} color={activeBasket ? 'black' : 'white'}/>
                          <Text className={activeBasket ? "font-bold text-black text-base"
                                                      : "font-bold text-white text-base"}>в корзину</Text>
                      </TouchableOpacity >
                        <TouchableOpacity onPress={() => toggleLikeVisibility(course?.id)} className={activeLike ? "bg-custom-Green border rounded-xl items-center py-1 px-5 flex-row w-44 justify-between"
                                                                                               : "border border-white rounded-xl items-center py-1 px-5 flex-row w-44 justify-between"}>
                            <Icon src={require('../../../../assets/icon/like.png')} size={20} color={activeLike ? 'black' : 'white'}/>
                            <Text className={activeLike ? "font-bold text-black text-base"
                                                        : "font-bold text-white text-base"}>в избранное</Text>
                        </TouchableOpacity >
                    </View>
                )}                
          </View>

          {course?.type === 'webinar' 
            ? (<Text className="text-white text-base">Содержание вебинара</Text>)
            : <Text className="text-white text-base">Содержание курса</Text>
          }          
          <View className='flex-row items-center space-x-1 my-1'>
              <Text className='mr-2'>5 секций</Text>
              <Icon src={require('../../../../assets/icon/dot.png')} size={5}/>
              <Text className='mr-2'>18 лекций</Text>
              <Icon src={require('../../../../assets/icon/dot.png')} size={5}/>
              <Text>12 часов 20 минут</Text>
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

          <View className='p-3 bg-custom-Gray rounded-xl flex-row items center mb-4'>
            <Image source={teacherAvatar} className='w-17 h-17 rounded-lg'/>
            <View className='justify-center mx-3 space-y-1'>
              <Text className='text-base text-white'>{course?.teacher?.full_name}</Text>
              <Text className='text-white'>{course?.teacher?.bio}</Text>
            </View>

            <View className='flex-row top-3 right-3 absolute items-center'>
                <Text className='mr-2 font-bold text-white'>{course?.teacher?.rate}</Text>
                <Icon src={require('../../../../assets/icon/star.png')} size={14}/>
            </View>
            <TouchableOpacity onPress={() => handleNavigateToMentor(course?.teacher.id)} className='flex-row bottom-1 right-3 absolute items-center'>
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
                      isOpen={isOpenFAQs[index]} 
                      setIsOpen={() => toggleFAQDropdown(index)} 
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