import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
	catalog: {
		data: any;
		dataList: any;
	};
};

type Prop = {
    nameCatalog: string;
    title: string;
    src?: any;
    price?: string;
    format: string;
};

const ComponentItem: React.FC<Prop> = ({nameCatalog, title, src, price, format}) => {
    
    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };
    return(
        <TouchableOpacity className='w-full h-40 mb-4'>
            <Image className='w-full h-full rounded-lg' source={src} />
                    <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{nameCatalog}</Text>
                    <Text className='absolute left-0 top-6 bg-custom-Green px-1 rounded-xl text-black m-2'>{format}</Text>
                <TouchableOpacity onPress={toggleLikeVisibility} className='absolute right-0 bg-custom-Green p-1 rounded-full m-2'>
                    <Icon 
                        src={
                            activeLike
                            ? require('../../../../../assets/icon/like-active.png')
                            : require('../../../../../assets/icon/like.png')
                        } 
                        size={24}/>
                </TouchableOpacity>
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{title}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{price}</Text>
        </TouchableOpacity>
    )
}

type Navigation = StackNavigationProp<RootStackParamList, 'catalog'>;

export const Catalog = ({ route }: { route: any }) => {
    const navigation = useNavigation<Navigation>();

    const data = route?.params?.data;
    const dataList = route?.params?.dataList;

    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedFilter, setSelectedFilter] = useState<null | number>(null);

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
      

    const openModal = () => {
        setModalVisible(true);
      };
    
    const closeModal = () => {
        setModalVisible(false);
      };
    
    const applyFilter = () => {
        // Apply the selected filter
        // Add your logic here
        closeModal();
    };

    const sales = ['Бесплатные', 'Скидки'];
    const categories = ['Разработка', 'Бизнес', 'Маркетинг', 'Лайфстайл', 'Здоровье и фитнес', 'Дизайн', 'Академия'];
    const formats = ['Вебинары', 'Курсы', 'Пакет курсов', 'Конспекты'];

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <View className='flex-row justify-between items-center'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20}/>
        </TouchableOpacity>
        <Text className='text-xl font-bold text-white pb-2'>Catalog</Text>
        <View className='flex-row space-x-2'>
            <TouchableOpacity onPress={openModal}>
                <Icon src={require('../../../../../assets/icon/setting.png')} size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                <Icon src={require('../../../../../assets/icon/shopping.png')} size={24}/>
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
        {data.list.map((item: Prop) => 
            <ComponentItem nameCatalog={item.nameCatalog} title={item.title} src={item.src} price={item.price} format={item.format}/>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
            <View style={styles.filterContainer}>
                <View className='flex-row justify-between items-center'>
                    <TouchableOpacity onPress={closeModal}>
                        <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20} color='black'/>
                    </TouchableOpacity>
                    <Text className='text-xl font-bold text-black'>Filters</Text>
                    <TouchableOpacity onPress={closeModal} >
                        <Icon src={require('../../../../../assets/icon/x.png')} size={20} color='black'/>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='flex-row flex-wrap py-5'>
							{selectedSales.map((item) => (
								<Text
									key={item}
									className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-white bg-black'
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
                      className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-black'
                      onPress={() => toggleSales(item)}
										>
											{item}
										</Text>
									);
								}
								return null;
							})}
                    </View>

                    <Text className='text-2xl font-bold text-black py-1'>Categories</Text>

                    <View className='flex-row flex-wrap py-5'>
							{selectedCategories.map((item) => (
								<Text
									key={item}
									className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-white bg-black'
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
                      className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-black'
                      onPress={() => toggleCategories(item)}
										>
											{item}
										</Text>
									);
								}
								return null;
							})}
                    </View>

                    <Text className='text-2xl font-bold text-black py-1'>Format</Text>

                    <View className='flex-row flex-wrap py-5'>
							{selectedFormats.map((item) => (
								<Text
									key={item}
									className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-black text-white bg-black'
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
                      className='mb-1 mr-3 px-4 py-1 border rounded-2xl border-gray-400 text-black'
                      onPress={() => toggleFormats(item)}
										>
											{item}
										</Text>
									);
								}
								return null;
							})}
                    </View>

                </ScrollView>

                <View className='mt-auto mb-3 space-y-3'>
                    <TouchableOpacity onPress={applyFilter} className="mt-5 bg-custom-Green rounded-md items-center py-2">
                        <Text className="font-bold text-black">Применить фильтры</Text>
                    </TouchableOpacity >

                    <TouchableOpacity onPress={applyFilter}>
                            <Text className="font-bold text-black text-center">Сбросить все</Text>
                    </TouchableOpacity>
                </View>
            </View>
          
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    filterContainer: {
        height: '80%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        marginTop: 'auto',
        padding: 20,
    }
  });
  
