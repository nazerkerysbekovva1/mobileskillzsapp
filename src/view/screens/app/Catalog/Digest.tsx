import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, ImageBackground, Text, Image } from 'react-native';
import { Icon } from '../../../../component/Icon';

type Props = {
    title: string;
    onPress?: () => void;
};

type Prop = {
    title: string;
    src?: any;
    price?: string;
};

const ComponentItem: React.FC<Prop> = ({title, src, price}) => {
    // const imageSource = src ? { uri: src } : require("../../../../../assets/default-image.png");
    
    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };
    return(
        <TouchableOpacity className='w-64 h-32 mr-4'>
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
                <Text className='absolute left-0 bottom-0 m-2 text-white text-small'>{title}</Text>   
               <Text className='absolute right-0 bottom-0 m-2 bg-custom-Green px-1 rounded-xl text-black font-bold'>{price} KZT</Text>
        </TouchableOpacity>
    )
}

const Component: React.FC<Props> = ({ title, onPress }) => {
    return(
        <View className='mb-3'>
            <View className='flex-row justify-between items-center mb-3'>
                <Text className='text-xl font-bold text-white'>{title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Icon src={require('../../../../../assets/icon/chevron-right.png')} size={25}/>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
                <ComponentItem title='Введение в JavaScript' price='29 990' src={require("../../../../../assets/1.jpg")} />
                <ComponentItem title='Введение в JavaScript' price='29 990' src={require("../../../../../assets/2.jpg")}/>
                <ComponentItem title='Введение в JavaScript' price='29 990' src={require("../../../../../assets/3.jpg")}/>
            </ScrollView>
        </View>
    )
}

export const Digest = () => {
  return(
    <SafeAreaView className="flex-1 bg-black p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
            <Component title='Бесплатные курсы'/>
            <Component title='Бестселлеры'/>
            <Component title='Рекомендации для вас'/>
            <Component title='Курсы со скидкой'/>
        </ScrollView>
    </SafeAreaView>
  )
};

