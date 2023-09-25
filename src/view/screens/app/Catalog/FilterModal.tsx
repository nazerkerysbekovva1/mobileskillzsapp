import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../component/Icon';

import { CourseData } from '../../../../data/client/http-client';

type ModalProps = {
    modalVisible: boolean;
    closeModal: () => void;
    searchData: CourseData[];
    setIsFiltering: any,
    setList: any,
  };
export  const CustomModal: React.FC<ModalProps> = ({
    modalVisible,
    closeModal,
    searchData,
    setIsFiltering,
    setList,
  }) => {


    const [selectedSales, setSelectedSales] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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
    
    const applyFilterButton = (searchData: CourseData[]) => {
        console.log('Selected sales:', selectedSales);
        console.log('Selected categories:', selectedCategories);
        console.log('Selected formats:', selectedFormats);

        const filteredData = applyFilters(searchData);
        setList(filteredData);
        setIsFiltering(true);
        closeModal();
    };

    const resetFilter = () => {
        setSelectedSales([]);        
        setSelectedCategories([]);   
        setSelectedFormats([]);  
        setSelectedFilters([]);    
        setList([]);         
        setIsFiltering(false);
    }

    const sales = ['Бесплатные', 'Скидки'];
    const categories = ['Development', 'Business', 'Marketing', 'Lifestyle', 'Health & Fitness', 'Design', 'Academics'];
    const formats = ['Вебинары', 'Курсы'];

    return (
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
                      <TouchableOpacity onPress={() => applyFilterButton(searchData)} className="mt-5 bg-custom-Green rounded-md items-center py-2">
                          <Text className="font-bold text-black">Применить фильтры</Text>
                      </TouchableOpacity >
  
                      <TouchableOpacity onPress={resetFilter}>
                              <Text className="font-bold text-black text-center">Сбросить все</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Modal>
    );
  };

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