import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
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
    type: string;
};

const ComponentItem: React.FC<Prop> = ({nameCatalog, title, src, price, type}) => {
    
    const [activeLike, setActiveLike] = useState(false);
    const toggleLikeVisibility = () => {
        setActiveLike(!activeLike);
    };
    return(
        <TouchableOpacity className='w-full h-40 mb-4'>
            <Image className='w-full h-full rounded-lg' source={src} />
                    <Text className='absolute left-0 top-0 bg-custom-Green px-1 rounded-xl text-black m-2'>{nameCatalog}</Text>
                    <Text className='absolute left-0 top-6 bg-custom-Green px-1 rounded-xl text-black m-2'>{type}</Text>
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

  return (
    <SafeAreaView className='flex-1 bg-black p-4 pt-8'>
      <View className='flex-row justify-between items-center'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon src={require('../../../../../assets/icon/arrow-left.png')} size={20}/>
        </TouchableOpacity>
        <Text className='text-xl font-bold text-white pb-2'>Catalog</Text>
        <View className='flex-row space-x-2'>
            <TouchableOpacity>
                <Icon src={require('../../../../../assets/icon/setting.png')} size={24}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon src={require('../../../../../assets/icon/shopping.png')} size={24}/>
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
        {data.list.map((item: Prop) => 
            <ComponentItem nameCatalog={item.nameCatalog} title={item.title} src={item.src} price={item.price} type={item.type}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
