import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';
import { ComponentItem as CourseItem, ComponentItem2 } from '../../../../component/Course';

import { useMutation, useQuery } from 'react-query';
import { fetchData, CourseData, CourseQuery, userLogin } from '../../../../data/client/http-client';

import { API_ENDPOINTS } from '../../../../data/client/endpoints';

type Prop = CourseData & {
  list?: CourseData[];
  onPress?: () => void;
  onPressCourseCard?: () => void;
};

type RootStackParamList = {
    catalog: {
        data: CourseData;
    };
    CourseCard: {
        data: CourseData;
    };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ComponentItem: React.FC<Prop> = (data) => {
  const navigation = useNavigation<NavigationProp>();

  // console.log('ComponentItem', data);

  const handleNavigateToCourseCard = () => {
    navigation.navigate('CourseCard', {
      data,
    });
  };

  const [activeLike, setActiveLike] = useState(false);
  const toggleLikeVisibility = () => {
      setActiveLike(!activeLike);
  };

  const imageSource = data.image ? { uri: data.image } : require("../../../../../assets/default-image.png");

  return(
      <TouchableOpacity onPress={handleNavigateToCourseCard} className='w-64 h-32 mr-4'>
          <Image className='w-full h-full rounded-lg' source={imageSource} />
              <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{data.category}</Text>
              <Text className='bg-custom-Green px-1 rounded-xl text-black'>{data.type}</Text>
              <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                  <Icon 
                      src={
                          activeLike
                          ? require('../../../../../assets/icon/like-active.png')
                          : require('../../../../../assets/icon/like.png')
                      } 
                      size={24}/>
              </TouchableOpacity>
              <Text className='absolute left-0 bottom-0 m-2 text-white text-small font-bold'>{data.title}</Text>  
              {data.price 
                ? (<View className='absolute right-0 bottom-0 m-2'>
                      {data?.best_ticket_string
                        ? (<View>
                            <Text className='bg-red-500 px-1 rounded-tl-lg rounded-br-lg text-white mb-3'>{data.discount_percent}% скидка</Text>
                            <View className='bg-custom-Green rounded-lg items-center'>
                              <Text className="text-black line-through">{data?.price_string}</Text>
                              <Text className="text-black font-bold">{data?.best_ticket_string}</Text>
                            </View>
                          </View>)
                        : (<Text className='bg-custom-Green px-1 rounded-lg text-black font-bold'>{data.price_string}</Text>)
                      }
                </View>)
                : (<Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-lg text-black font-bold'>Free</Text>)} 
      </TouchableOpacity>
  )
}

const Component: React.FC<Prop> = (data) => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigateToCatalog = (data: CourseData) => {
    navigation.navigate('catalog', {
      data,
    });
  };
    return(
        <View className='mb-3'>
            <View className='flex-row justify-between items-center mb-3'>
                <Text className='text-xl font-bold text-white'>{data.title}</Text>
                <TouchableOpacity onPress={() => handleNavigateToCatalog(data)}>
                    <Icon src={require('../../../../../assets/icon/chevron-right.png')} size={25}/>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
             {data.list?.map((item, index) => (
                <ComponentItem2 key={index} {...item}/>
             ))}
            </ScrollView>
        </View>
    )
}

export const Search = ( ) => {
  const { data: searchData } = useQuery('courses', () => fetchData(API_ENDPOINTS.COURSES));

  // console.log(searchData.data)

  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const navigation = useNavigation<NavigationProp>();
  const [isTyping, setIsTyping] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState<CourseData[]>([]);  

  const handleTextInputChange = (text: string) => {
    setIsTyping(text.length >= 0);
    setSearchText(text);
    handleSearch();
  };

  const handleSearch = () => {
    console.log('Search text:', searchText);
    
    const searchResult = searchData.data.filter((value: CourseData) => 
              value.title?.toLowerCase().includes(searchText.toLowerCase()) || 
              value.label?.toLowerCase().includes(searchText.toLowerCase()) || 
              value.category?.toLowerCase().includes(searchText.toLowerCase())
              );
    
    // console.log('Filtered list:', searchResult);
    setList(searchResult);
  }

  const getFormats = (data: CourseData[], format: string) => {
    const sortedData = data?.filter((value) => value.type === format);
    return sortedData;
  };
  const getFree = (data: CourseData[]) => {
    const sortedData = data?.filter((value) => value.price == 0);
    return sortedData;
  };
  const getDiscounts = (data: CourseData[]) => {
    const sortedData = data?.filter((value) => value.best_ticket_string != null);
    return sortedData;
  };
  
  const applyFilters = (data: CourseData[]) => {
    let filteredData = data;
  
    if (selectedSales.length > 0) {
      if (selectedSales.includes('Бесплатные')) {
        filteredData = getFree(filteredData);
      }
      if (selectedSales.includes('Скидки')) {
        filteredData = getDiscounts(filteredData);
      }
    }

    if (selectedFormats.length > 0) {
      if (selectedFormats.includes('Вебинары')) {
        filteredData = getFormats(filteredData, 'webinar');
      }
      if (selectedFormats.includes('Курсы')) {
        filteredData = getFormats(filteredData, 'course');
      }
    }
  
    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((item: any) =>
        selectedCategories.includes(item.category)
      );
    }
  
    return filteredData;
  };

  const handleBackPress = () => {
    Keyboard.dismiss();
    setSelectedSales([]);        
    setSelectedCategories([]);   
    setSelectedFormats([]);  
    setSelectedFilters([]);    
    setSearchText('');           
    setList(courseList);         
    setIsTyping(false);
  };
  

  const handleDeletePress = () => {
    setSearchText('');
  };

  const toggleSales = (item: string) => {
      if (selectedSales.includes(item)) {
        setSelectedSales(selectedSales.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedSales([...selectedSales, item]);
      }
      setSelectedFilters([...selectedFilters, item]); 
    };
    
    const toggleCategories = (item: string) => {
      if (selectedCategories.includes(item)) {
        setSelectedCategories(selectedCategories.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedCategories([...selectedCategories, item]);
      }
      setSelectedFilters([...selectedFilters, item]); 
    };
    
    const toggleFormats = (item: string) => {
      if (selectedFormats.includes(item)) {
        setSelectedFormats(selectedFormats.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedFormats([...selectedFormats, item]);
      }
      setSelectedFilters([...selectedFilters, item]); 
    };

  const sales = ['Бесплатные', 'Скидки'];
  const categories = ['Development', 'Business', 'Marketing', 'Lifestyle', 'Health & Fitness', 'Design', 'Academics'];
  const formats = ['Вебинары', 'Курсы'];

  const handleSearchPress = (data: CourseQuery[] | undefined) => {
    console.log('Selected sales:', selectedSales);
    console.log('Selected categories:', selectedCategories);
    console.log('Selected formats:', selectedFormats);

    const filteredData = applyFilters(searchData?.data);
    setList(filteredData);
    setIsTyping(true);
    setSearchText(selectedFilters.join(', '));
  };

  const { data: featuredCourses } = useQuery('featuredCourses', () => fetchData(API_ENDPOINTS.FEATURED_COURSES));

  const courseList = [
    {
      title: 'Советуем посмотреть',
      list: featuredCourses?.data,
    },
  ]

  const handleToCatalog = () => {
    navigation.navigate('Catalog');
  }
  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
        <View>
            <View className='flex-row justify-between items-center bg-white rounded-3xl px-3 h-7'>
              <View className='flex-row items-center'>
                {isTyping && (
                  <TouchableOpacity onPress={handleBackPress} className='mr-5'>
                    <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20} color='black' />
                  </TouchableOpacity>
                )}
                  <TextInput 
                    placeholder='Search' 
                    className='text-black p-1 w-60'
                    placeholderTextColor="black"
                    onChangeText={handleTextInputChange}
                    value={searchText}
                    />
              </View>
              
                {!isTyping && (
                  <TouchableOpacity onPress={() => handleSearchPress(searchData)}>
                    <Icon src={require('../../../../../assets/icon/search.png')} size={20} color='black' />
                  </TouchableOpacity>
                )}
                {isTyping && (
                  <TouchableOpacity onPress={handleDeletePress}>
                    <Icon src={require('../../../../../assets/icon/x.png')} size={20} color='black' />
                  </TouchableOpacity>
                )}
            </View>
            
            {isTyping ? (
              <View className='py-5'>
                  <Text className='text-2xl font-bold text-white py-1'>Результаты поиска</Text>
                  {list.length === 0 ? (
                    <View className='items-center justify-center' style={{height: '90%'}}>
                        <Text className='text-white py-1'>По вашему запросу ничего не найдено</Text>
                        <TouchableOpacity onPress={handleToCatalog} className="mt-5 bg-custom-Green rounded-xl items-center py-2 w-48">
                          <Text className="font-bold text-black text-base">Перейти в каталог</Text>
                        </TouchableOpacity >
                    </View> 
                  ) : (
                    <ScrollView showsVerticalScrollIndicator={false} className='mb-20'>
                      {list.map((item, index) => (
                        <CourseItem
                          key={index}
                          {...item}
                        />
                ))}
                    </ScrollView>
                  )}
              </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className='flex-row flex-wrap py-5'>
                    {selectedSales.map((item) => (
                      <Text
                        key={item}
                        className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-black bg-white'
                        onPress={() => toggleSales(item)}
                      >
                        {item}
                      </Text>
                    ))}
                    {sales.map((item) => {
                      if (!selectedSales.includes(item)) {
                        return (
                          <Text
                            key={item}
                            className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-white'
                            onPress={() => toggleSales(item)}
                          >
                            {item}
                          </Text>
                        );
                      }
                      return null;
                    })}
                  </View>

                  <Text className='text-2xl font-bold text-white py-1'>Categories</Text>

                  <View className='flex-row flex-wrap py-5'>
                  {selectedCategories.map((item) => (
                    <Text
                      key={item}
                      className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-black bg-white'
                      onPress={() => toggleCategories(item)}
                    >
                      {item}
                    </Text>
                  ))}
                  {categories.map((item) => {
                    if (!selectedCategories.includes(item)) {
                      return (
                        <Text
                          key={item}
                          className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-white'
                          onPress={() => toggleCategories(item)}
                        >
                          {item}
                        </Text>
                      );
                    }
                    return null;
                  })}
                  </View>

                  <Text className='text-2xl font-bold text-white py-1'>Format</Text>

                  <View className='flex-row flex-wrap py-5'>
                  {selectedFormats.map((item) => (
                    <Text
                      key={item}
                      className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-black bg-white'
                      onPress={() => toggleFormats(item)}
                    >
                      {item}
                    </Text>
                  ))}
                  {formats.map((item) => {
                    if (!selectedFormats.includes(item)) {
                      return (
                        <Text
                          key={item}
                          className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-white'
                          onPress={() => toggleFormats(item)}
                        >
                          {item}
                        </Text>
                      );
                    }
                    return null;
                  })}
                  </View>

                  {courseList.map((item, index) => (
                      <Component 
                        key={index} 
                        title={item.title} 
                        list={item.list} />
                  ))}

                </ScrollView>
              )}

        </View>
    </SafeAreaView>
  );
}