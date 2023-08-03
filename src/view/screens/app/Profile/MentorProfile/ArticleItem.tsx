import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';

export const ArticleItem = () => {
  const navigation = useNavigation();

  const [comment, setCommentText] = useState<string>('');
  const handleCommentTextChange = (text: string) => {
    setCommentText(text);
    };
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()} className='p-4 pt-8'>
              <Icon src={require('../../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>

        <View className='items-center justify-center bg-blue-400 h-56 w-full'>
            <Text className='font-bold text-white text-3xl'>New test article</Text>
            <Text className='font-bold text-white text-base'>Created by <Text> Yerkin Aliakbar </Text> </Text>
            <Text className='font-bold text-white text-base'>in <Text> Articles </Text> </Text>
            <Text className='font-bold text-white text-base'>30 Jun 2023</Text>
            <View className='flex-row items-center'>
                <Icon src={require('../../../../../../assets/icon/share.png')} size={14}/>
                <Text className='font-bold text-white text-base mx-1'>Share</Text>
            </View>
        </View>

        <View className='p-4 pt-8'>
            <Image source={require('../../../../../../assets/1.jpg')} className='w-full h-56 rounded-2xl' />
            
            <Text className='text-white text-base my-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum praesentium molestias cupiditate, magni quod dolore iste sunt fuga sint maiores eos dolor voluptas et ducimus nisi quidem, sapiente, dolorum quis!</Text>
        </View>
      
        <View className='flex-row px-4 items-center justify-between'>
            <Text className='font-bold text-base text-white'>Comments</Text>
            <View style={{height: 0.5, backgroundColor: 'gray', width: '75%'}}></View>
        </View>

        <View className='px-4 mb-10'>
            <TextInput 
                className='text-white rounded-xl p-3 w-full my-6'
                style={{borderColor: 'gray', borderWidth: 0.5, height: 149, }}
                placeholder="Write..."
                value={comment}
                onChangeText={handleCommentTextChange}
                multiline
            />

            <TouchableOpacity className='bg-custom-Green rounded-lg px-4 py-1 ml-auto'>
                <Text className='text-black text-base font-bold'>Post comment</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
