import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
                            ? require('../../../../../../assets/icon/like-active.png')
                            : require('../../../../../../assets/icon/like.png')
                        } 
                        size={24}/>
                </TouchableOpacity>
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{title}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{price}</Text>
        </TouchableOpacity>
    )
}

export const Mentor = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon src={require('../../../../../../assets/icon/arrow-left.png')} size={20}/>
          </TouchableOpacity>

        <View className='flex-row items-center justify-center space-x-5 my-6'>
            <View className='w-32 h-32 rounded-full'>
              <Image source={require('../../../../../../assets/ava.png')} className='w-full h-full rounded-full'/>
              <TouchableOpacity className='absolute bg-custom-Blue rounded-full p-3 bottom-4 right-4'>
                <Icon src={require('../../../../../../assets/icon/Vector.png')} size={20}/>
              </TouchableOpacity>
            </View>

            <View className='justify-center items-center space-y-3'>
              <Text className='text-base font-bold text-white'>Robert Ransdell</Text>

              <View className='flex-row'>
                <View className='flex-row'>
                  <Icon src={require('../../../../../../assets/icon/star.png')} size={20}/>
                  <Icon src={require('../../../../../../assets/icon/star.png')} size={20}/>
                  <Icon src={require('../../../../../../assets/icon/star.png')} size={20}/>
                  <Icon src={require('../../../../../../assets/icon/star.png')} size={20}/>
                  <Icon src={require('../../../../../../assets/icon/star.png')} size={20} color='white'/>
                </View>
                <Text className='ml-2 p-1 rounded-lg text-white bg-custom-Gray'>4.75</Text>
              </View>

              <View className='flex-row items-center space-x-2'>
                <View className='justify-center items-center space-y-1'>
                  <Text className='font-bold text-white'>0</Text>
                  <Text className='font-bold text-white'>Followers</Text>
                </View>

                <View className='w-mini bg-white h-full'></View>

                <View className='justify-center items-center space-y-1'>
                  <Text className='font-bold text-white'>0</Text>
                  <Text className='font-bold text-white'>Following</Text>
                </View>
              </View>

            </View>
        </View>

      <View className='justify-center items-center pt-4 pb-10 mx-6' style={{borderBottomColor: 'gray', borderBottomWidth: 0.2}}>
        <View className='flex-row justify-center items-center space-x-2 mb-6'>
            <Image source={require('../../../../../../assets/img/m1.png')} className='w-10 h-10'/>
            <Image source={require('../../../../../../assets/img/m2.png')} className='w-10 h-10'/>
            <Image source={require('../../../../../../assets/img/m3.png')} className='w-10 h-10'/>
            <Image source={require('../../../../../../assets/img/m4.png')} className='w-10 h-10'/>
            <Image source={require('../../../../../../assets/img/m5.png')} className='w-10 h-10'/>
            <Image source={require('../../../../../../assets/img/m6.png')} className='w-10 h-10'/>
        </View>

        <TouchableOpacity className='bg-custom-Green rounded-lg justify-center items-center py-2 px-6'>
          <Text className='text-black text-base'>Follow</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-wrap flex-row justify-center '>
        <View className='items-center space-y-1 m-8 mb-2'>
          <Icon src={require('../../../../../../assets/img/students.png')} size={60}/>
          <Text className='font-bold text-white'>7</Text>
          <Text className='text-white'>Students</Text>
        </View>
        <View className='items-center space-y-1 m-8 mb-5'>
          <Icon src={require('../../../../../../assets/img/courses.png')} size={60}/>
          <Text className='font-bold text-white'>7</Text>
          <Text className='text-white'>Students</Text>
        </View>
        <View className='items-center space-y-1 m-8 mb-5'>
          <Icon src={require('../../../../../../assets/img/reviews.png')} size={60}/>
          <Text className='font-bold text-white'>7</Text>
          <Text className='text-white'>Students</Text>
        </View>
        <View className='items-center space-y-1 m-8 mb-5'>
          <Icon src={require('../../../../../../assets/img/meetings.png')} size={60}/>
          <Text className='font-bold text-white'>7</Text>
          <Text className='text-white'>Students</Text>
        </View>
      </View>

      <View  className='px-4'>
          <Tab.Navigator
            initialRouteName="About"
            screenOptions={({route}) => ({
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'white',
              tabBarCentered: true,
              tabBarStyle: styles.tabBarStyle,
              tabBarIndicatorStyle: { backgroundColor: 'white', height: 3, borderRadius: 5, },
              tabBarLabel:({focused, color}) => {
                if(focused) {
                  color = 'white'
                }
                return <Text className='text-white'>{route.name}</Text>
              }
            })}>
            <Tab.Screen name="About" component={About} />
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Articles" component={Articles} />
          </Tab.Navigator>
      </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const About = () => {

  const array = [
    {
      title: 'Education',
      content: [
        'Red Hat Certified Engineer (RHCE)',
        'AWS Certified DevOps Engineer - Professional',
        'Linux Foundation Certified System Administrator',
        'Master of Science in Information Systems (MSIS) from University of Sydney'
      ]
    },
    {
      title: 'Experiences',
      content: [
        'supporting proprietary Unix operating systems including AIX, HP-UX, and Solaris.',
        '10 years of experience working with Linux systems',
      ]
    },
  ]

  const skills = ['Management', 'Web development', 'Mobile development', ]

  const Params = () => {
    return(
      <View>
        {array.map((item, index) => (
          <View key={index} className='my-3'>
            <Text className='text-white mb-5'>{item.title}</Text>
              {item.content.map((item, index) => (
                <View key={index} className='flex-row mb-4 space-x-3'>
                  <Icon src={require('../../../../../../assets/icon/dot.png')} size={8} />
                  <Text className='text-white font-bold text-base -mt-2'>{item}</Text>
                </View>
              ))}
          </View>
        ))}
      </View>
    )
  }

  return(
    <SafeAreaView>
      <Text className='text-white'>Reserve a meeting</Text>

      <View style={{borderTopColor: 'white', borderTopWidth: 0.2}} className='mt-2 py-7'>
        <Params />

        <View className='my-3'>
          <Text className='text-white mb-5'>About</Text>
          <Text className='font-bold text-base'>Robert started his career as a Unix and Linux System Engineer in 1999. Since that time he has utilized his Linux skills at companies such as Xerox, UPS, Hewlett- Packard, and Amazon.com. Additionally, he has acted as a technical consultant and independent contractor for small businesses and Fortune 500 companies.</Text>
        </View>

        <View className='my-3'>
          <Text className='text-white mb-5'>Skills</Text>
            {skills.map((item) => (
              <Text className='py-2 px-3 mb-4 rounded-lg bg-custom-Gray text-lg'>{item}</Text>
            ))}
        </View>

      </View>
    </SafeAreaView>
  )
}

const Courses = () =>{

  const data = [
    {
      nameCatalog: 'Веб разработка',
      title: 'Введение в JavaScript ',
      src: require("../../../../../../assets/1.jpg"),
      price: 'Free',
      format: 'course',
    },
    {
      nameCatalog: 'Мобильная разработка',
      title: 'Разработка под iOS',
      src: require("../../../../../../assets/2.jpg"),
      price: '29 990 KZT',
      format: 'course',
    },
    {
      nameCatalog: 'Мобильная разработка',
      title: 'Разработка под Android ',
      src: require("../../../../../../assets/2.jpg"),
      price: '29 990 KZT',
      format: 'webinar',
    },
    {
      nameCatalog: 'Веб разработка',
      title: 'Введение в JavaScript ',
      src: require("../../../../../../assets/1.jpg"),
      price: '29 990 KZT',
      format: 'course',
    },
  ]

  return(
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => 
            <ComponentItem key={index} nameCatalog={item.nameCatalog} title={item.title} src={item.src} price={item.price} format={item.format}/>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const Articles = () =>{
  const Params = () => {
    return(
      <TouchableOpacity className='bg-gray-500 rounded-2xl mb-6'>
        <Image source={require('../../../../../../assets/1.jpg')} className='w-full h-40' style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}} />
        <View className='h-48 p-5 justify-between'>
          <View>
            <Text className='text-white font-bold text-base mb-2'>New test article</Text>
            <Text className='text-white text-base'>This is a description of an article</Text>
          </View>

          <View className='items-center flex-row justify-between pt-3 px-2' style={{borderTopColor: 'white', borderTopWidth: 0.5}}>
            <View className='flex-row space-x-1 items-center'>
              <Icon src={require('../../../../../../assets/icon/user.png')} size={20}/>
              <Text className='text-white text-lg'>Yerkin Aliakbar</Text>
            </View>
            <View className='flex-row space-x-1 items-center'>
              <Icon src={require('../../../../../../assets/icon/comment.png')} size={20}/>
              <Text className='text-white text-lg'>1</Text>
            </View>
          </View>
        </View>
        
        <View className='flex-row absolute rounded-xl bg-custom-Green items-center py-1 px-2 top-36 right-4'>
          <Icon src={require('../../../../../../assets/icon/calendar.png')} size={13}/>
          <Text className='text-black font-bold px-1'>30 Jun 2023</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView className='mt-2 py-7' style={{borderTopColor: 'white', borderTopWidth: 0.2}}>
      <Params />
      <Params />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 43,
    width: 250,
    backgroundColor: 'transparent',
  },
});