import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ComponentItem } from '../../../../../component/Course';
import { useQuery } from 'react-query';
import { fetchUserProfile, Badge, CourseData, Teacher, UserData } from '../../../../../data/client/http-client';
import { renderStarRating } from '../../../../../component/ratingStar';

const Tab = createMaterialTopTabNavigator();

export const Mentor = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const id = route?.params?.id;
  const { data, isLoading, error} = useQuery('users', () => fetchUserProfile(id))
  const userData = data?.data.user;

  const imageSourse = userData?.avatar ? { uri: userData?.avatar } : require("../../../../../../assets/default-image.png");

  const [scrollY, setScrollY] = useState(0);
  const [isScrollViewEnd, setIsScrollViewEnd] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon src={require('../../../../../../assets/icon/arrow-left.png')} size={20}/>
      </TouchableOpacity>

      {isScrollViewEnd && !isScrollingUp ? (
          <Tab.Navigator
            // className='px-4'
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
            <Tab.Screen name="Courses" component={() => Courses(userData)} />
            <Tab.Screen name="Articles" component={Articles} />
          </Tab.Navigator>
          ) : (
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              onScroll={({ nativeEvent }) => {
                const offsetY = nativeEvent.contentOffset.y;
                const contentHeight = nativeEvent.contentSize.height;
                const scrollViewHeight = nativeEvent.layoutMeasurement.height;
                const isScrollingUp = offsetY > scrollY;

                setScrollY(offsetY);

                if (offsetY + scrollViewHeight >= contentHeight) {
                  setIsScrollViewEnd(true);
                } else {
                  setIsScrollViewEnd(false);
                }

                setIsScrollingUp(isScrollingUp);
              }}
              >
                
              <View className='flex-row items-center justify-center space-x-5 my-6'>
                  <View className='w-32 h-32 rounded-full'>
                    <Image source={imageSourse} className='w-full h-full rounded-full'/>
                    <TouchableOpacity className='absolute bg-custom-Blue rounded-full p-3 bottom-4 right-4'>
                      <Icon src={require('../../../../../../assets/icon/Vector.png')} size={20}/>
                    </TouchableOpacity>
                  </View>

                  <View className='justify-center items-center space-y-3'>
                    <Text className='text-base font-bold text-white'>{userData?.full_name}</Text>

                    <View className='flex-row items-center'>
                      <View className='flex-row'>
                        {renderStarRating(userData?.rate)}
                      </View>
                      <Text className='ml-2 p-1 rounded-lg text-white bg-custom-Gray'>{userData?.rate}</Text>
                    </View>

                    <View className='flex-row items-center space-x-2'>
                      <View className='justify-center items-center space-y-1'>
                        <Text className='font-bold text-white'>{userData?.followers.length}</Text>
                        <Text className='font-bold text-white'>Followers</Text>
                      </View>

                      <View className='w-mini bg-white h-full'></View>

                      <View className='justify-center items-center space-y-1'>
                        <Text className='font-bold text-white'>{userData?.following.length}</Text>
                        <Text className='font-bold text-white'>Following</Text>
                      </View>
                    </View>

                  </View>
              </View>
              
                <View className='justify-center items-center pt-4 pb-10 mx-6' style={{borderBottomColor: 'gray', borderBottomWidth: 0.2}}>
                  {userData?.badges &&
                      <View className='flex-row justify-center items-center space-x-2 mb-6'>
                        {userData?.badges.map((item: Badge, index: number) => 
                          <Image key={index} source={{uri: item?.image}} className='w-10 h-10'/>
                        )}
                      </View>
                  } 

                  <TouchableOpacity className='bg-custom-Green rounded-lg justify-center items-center py-2 px-6'>
                    <Text className='text-black text-base'>Follow</Text>
                  </TouchableOpacity>
                </View>

              <View className='flex-wrap flex-row justify-center p-1'>
                <View className='items-center space-y-1 m-8 mb-2'>
                  <Icon src={require('../../../../../../assets/img/students.png')} size={60}/>
                  <Text className='font-bold text-white'>{userData?.students.length}</Text>
                  <Text className='text-white'>Students</Text>
                </View>
                <View className='items-center space-y-1 m-8 mb-5'>
                  <Icon src={require('../../../../../../assets/img/courses.png')} size={60}/>
                  <Text className='font-bold text-white'>{userData?.courses_count}</Text>
                  <Text className='text-white'>Courses</Text>
                </View>
                <View className='items-center space-y-1 m-8 mb-5'>
                  <Icon src={require('../../../../../../assets/img/reviews.png')} size={60}/>
                  <Text className='font-bold text-white'>{userData?.reviews_count}</Text>
                  <Text className='text-white'>Reviews</Text>
                </View>
                <View className='items-center space-y-1 m-8 mb-5'>
                  <Icon src={require('../../../../../../assets/img/meetings.png')} size={60}/>
                  <Text className='font-bold text-white'> </Text>
                  <Text className='text-white'>Meetings</Text>
                </View>
              </View>

            </ScrollView>
          )}
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
    <ScrollView className='bg-black pt-3'>
      <Text className='text-white'>Reserve a meeting</Text>

      <View style={{borderTopColor: 'white', borderTopWidth: 0.2}} className='mt-2 py-7'>
        <Params />

        <View className='my-3'>
          <Text className='text-white mb-5'>About</Text>
          <Text className='font-bold text-base text-white'>Robert started his career as a Unix and Linux System Engineer in 1999. Since that time he has utilized his Linux skills at companies such as Xerox, UPS, Hewlett- Packard, and Amazon.com. Additionally, he has acted as a technical consultant and independent contractor for small businesses and Fortune 500 companies.</Text>
        </View>

        <View className='my-3'>
          <Text className='text-white mb-5'>Skills</Text>
            {skills.map((item) => (
              <Text className='py-2 px-3 mb-4 rounded-lg bg-custom-Gray text-lg text-black'>{item}</Text>
            ))}
        </View>

      </View>
    </ScrollView>
  )
}

const Courses = (userData: UserData) =>{

  return(
      <ScrollView showsVerticalScrollIndicator={false} className='bg-black pt-3'>
        {userData?.webinars.map((item: CourseData, index: number) => 
            <ComponentItem key={index} {...item}/>
        )}
      </ScrollView>
  )
}

const Articles = () =>{
  
  const navigation = useNavigation();

  const Params = () => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate('ArticleItem')} className='bg-gray-500 rounded-2xl mb-6'>
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
    <ScrollView className='py-7 bg-black' style={{borderTopColor: 'white', borderTopWidth: 0.2}}>
      <Params />
      <Params />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 43,
    width: 250,
    backgroundColor: 'transparent',
  },
});