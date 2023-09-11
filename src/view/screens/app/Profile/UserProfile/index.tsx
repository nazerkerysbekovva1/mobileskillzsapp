import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './Profile';
import { Default } from './Default';

import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../../../data/client/http-client';

const Stack = createNativeStackNavigator();

const Index = () => {
    return(
      <Stack.Navigator initialRouteName="MainProfile">
        <Stack.Screen name="MainProfile" options={{ headerShown: false }} component={MainProfile} />
        <Stack.Screen name="Default" options={{ headerShown: false }} component={Default} />

        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
      </Stack.Navigator>
    )
  };
  
export default Index;

type Prop = {
    navigate: string;
    name: string;
}

const PropMenu: React.FC<Prop> = ({navigate, name}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.navigate(navigate)} className='flex-row items-center justify-between my-2'>
            <Text className='text-white text-base'>{name}</Text>
            <Icon src={require('../../../../../../assets/icon/fe_arrow-right.png')} size={20}/>
        </TouchableOpacity>
    )
}
const MainProfile = () => {
    const navigation = useNavigation();

    const [isOpen, setIsOpen] = useState(false);

    const settings = [
        {
            name: 'Редактировать профиль',
            navigate: 'Profile'
        },
        {
            name: 'История покупок',
            navigate: ''
        },
        {
            name: 'Мои жетоны',
            navigate: ''
        },
        {
            name: 'Сертификаты',
            navigate: ''
        },
        {
            name: 'Избранные',
            navigate: ''
        },]
    const aboutApp = [
        {
            name: 'Язык',
            navigate: ''
        },
        {
            name: 'О приложении',
            navigate: ''
        },
        {
            name: 'Служба поддержки',
            navigate: ''
        },
        {
            name: 'Условия использования',
            navigate: ''
        },]

        const toggleVisibilityLogout = () => {
            setIsOpen(!isOpen);
          };

          const mutation = useMutation(logout, {
            onSuccess: async () => {
              navigation.navigate("AuthStack");
            }
          });
      
          // logout
        const handleLogout = async () => {
            mutation.mutate()
            
        }

    return(
        <SafeAreaView className='flex-1 bg-black'>
            <ImageBackground className="flex-1 -mb-20" source={require('../../../../../../assets/profile-bg.png')}>
				<View className="m-6 pt-6 flex items-center justify-between">
                    <View className='w-15 h-15 mb-1 rounded-full border border-2 border-black'>
                        <Image source={require('../../../../../../assets/ava.png')} className='w-full h-full rounded-full'/>
                    </View>
                    <Text className='text-lg text-black font-bold'>Мария Иванова</Text>
                    <Text className='text-black'>ivanova.maria@gmail.com</Text>
                    <TouchableOpacity onPress={toggleVisibilityLogout} className='absolute right-0 rounded-full p-1 bg-black'>
                        <Icon src={require('../../../../../../assets/icon/setting2.png')} size={20}/>
                    </TouchableOpacity>
                    {isOpen &&
                        <TouchableOpacity onPress={handleLogout} className='absolute right-7 rounded-lg bg-black p-3'>
                            <Text className='text-white text-base'>Logout</Text>
                        </TouchableOpacity>
                    }
			    </View>
                
                <View className='bg-black h-full rounded-lg py-4 px-10'>
                    <Text className='text-xl text-white font-bold my-2'>Настройки</Text>
                    {settings.map((item, index) => (
                        <PropMenu key={index} navigate={item.navigate} name={item.name}/>
                    ))}

                    <Text className='text-xl text-white font-bold mb-2 mt-4'>Приложение</Text>
                    {aboutApp.map((item, index) => (
                        <PropMenu key={index} navigate={item.navigate} name={item.name}/>
                    ))}

                    <TouchableOpacity className='mt-3'>
                        <Text className='text-white text-base font-bold text-center'>Выйти из аккаунта</Text>
                    </TouchableOpacity>
                    <Text className='mt-2 text-center'>версия 0.0.1</Text>
                </View>
    		</ImageBackground>
        </SafeAreaView>
    )
}