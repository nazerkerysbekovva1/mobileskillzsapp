import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from '../../../../component/Icon';


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

export const Search = ( ) => {
  const navigation = useNavigation();
  const [isTyping, setIsTyping] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleTextInputChange = (text: string) => {
    setIsTyping(text.length >= 0);
    setSearchText(text);
  };

  const handleBackPress = () => {
    console.log('button back');
  };

  const handleDeletePress = () => {
    console.log('button delete');
  };

  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const toggleSales = (item: string) => {
      if (selectedSales.includes(item)) {
        setSelectedSales(selectedSales.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedSales([...selectedSales, item]);
      }
    };
    
    const toggleCategories = (item: string) => {
      if (selectedCategories.includes(item)) {
        setSelectedCategories(selectedCategories.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedCategories([...selectedCategories, item]);
      }
    };
    
    const toggleFormats = (item: string) => {
      if (selectedFormats.includes(item)) {
        setSelectedFormats(selectedFormats.filter((selectedItem) => selectedItem !== item));
      } else {
        setSelectedFormats([...selectedFormats, item]);
      }
    };

  const sales = ['Бесплатные', 'Скидки'];
  const categories = ['Разработка', 'Бизнес', 'Маркетинг', 'Лайфстайл', 'Здоровье и фитнес', 'Дизайн', 'Академия'];
  const formats = ['Вебинары', 'Курсы', 'Пакет курсов', 'Конспекты'];

  const handleSearchPress = () => {
    console.log('Selected sales:', selectedSales);
    console.log('Selected categories:', selectedCategories);
    console.log('Selected formats:', selectedFormats);
  };

  const courseCategoryList = [
    {
      title: 'Советуем посмотреть',
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
  ]

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    />
              </View>
              
                {!isTyping && (
                  <TouchableOpacity onPress={handleSearchPress}>
                    <Icon src={require('../../../../../assets/icon/search.png')} size={20} color='black' />
                  </TouchableOpacity>
                )}
                {isTyping && (
                  <TouchableOpacity onPress={handleDeletePress}>
                    <Icon src={require('../../../../../assets/icon/x.png')} size={20} color='black' />
                  </TouchableOpacity>
                )}
            </View>

            {!isTyping && 
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

                  {courseCategoryList.map((item, index) => (
                      <Component key={index} title={item.title} list={item.list} />
                  ))}

                </ScrollView>
              }

        </ScrollView>
    </SafeAreaView>
  );
}