import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { Icon } from '../../../../../component/Icon';
import { useNavigation } from '@react-navigation/native';

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
export const Default = () => {
  const navigation = useNavigation();

  const handleToLogin = () => {
      navigation.navigate('AuthStack');
      console.log('login')
    }
    const aboutApp = [
        {
            name: 'О приложении',
            navigate: ''
        },
        {
            name: 'Служба поддержки',
            navigate: ''
        },]

    return(
        <SafeAreaView className='flex-1 bg-black'>
            <ImageBackground className="flex-1 -mb-20" source={require('../../../../../../assets/profile-bg.png')}>
				      <View className="m-6 pt-6 flex items-center justify-between">
                    <View className='w-15 h-15 mb-1 rounded-full border border-2 border-black'>
                        <Image source={require('../../../../../../assets/default-image.png')} className='w-full h-full rounded-full'/>
                    </View>
                    <Text className='text-lg text-black font-bold'>User Name</Text>
                    <Text className='text-black'>username@gmail.com</Text>
                    <TouchableOpacity className='absolute right-0 rounded-full p-1 bg-black'>
                        <Icon src={require('../../../../../../assets/icon/notification.png')} size={20}/>
                    </TouchableOpacity>
			         </View>
                
                <View className='bg-black h-full rounded-lg py-4 px-10'>
                    <Text className='text-xl text-white font-bold my-2'>Настройки</Text>
                        <PropMenu navigate='dd' name='Уведомления'/>

                    <Text className='text-xl text-white font-bold mb-2 mt-4'>Приложение</Text>
                    {aboutApp.map((item, index) => (
                        <PropMenu key={index} navigate={item.navigate} name={item.name}/>
                    ))}
                    
                    <TouchableOpacity onPress={handleToLogin} className='mt-32 py-3 rounded-lg border border-white'>
                        <Text className='text-white text-base font-bold text-center'>Войти в аккаунт</Text>
                    </TouchableOpacity>
                </View>
    		</ImageBackground>
        </SafeAreaView>
    )
}