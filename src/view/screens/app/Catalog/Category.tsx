import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { Icon } from '../../../../component/Icon';

type Prop = {
  title: string;
  src?: any;
  course: number;
  webinar: number;
  onPress?: () => void;
};

const ComponentItem: React.FC<Prop> = ({title, src, course, webinar, onPress}) => {
  // const imageSource = src ? { uri: src } : require("../../../../../assets/default-image.png");

  return(
      <TouchableOpacity className='w-full h-32 mb-4'>
          <Image className='w-full h-full rounded-lg' source={src} />
              <Text className='absolute left-0 bg-custom-Green px-1 rounded-xl text-black font-bold text-lg m-2'>{title}</Text>
              
              <Text 
                className='absolute right-0 bottom-0 m-2 bg-custom-Green px-2 py-1 rounded-xl text-black text-xs'>
                  {webinar} webinar {'\n'}
                  {course} course
              </Text>
      </TouchableOpacity>
  )
}

export const Category = () => {
  return(
    <SafeAreaView className="flex-1 bg-black p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <ComponentItem title='Разработка' course={2} webinar={8} src={require("../../../../../assets/1.jpg")} />
          <ComponentItem title='Бизнес' course={2} webinar={8} src={require("../../../../../assets/1.jpg")} />
          <ComponentItem title='Маркетинг' course={2} webinar={8} src={require("../../../../../assets/1.jpg")} />
          <ComponentItem title='Лайфстайл' course={2} webinar={8} src={require("../../../../../assets/1.jpg")} />
          <ComponentItem title='Здоровье и фитнес' course={2} webinar={8} src={require("../../../../../assets/1.jpg")} />
        </ScrollView>
    </SafeAreaView>
  )
};

