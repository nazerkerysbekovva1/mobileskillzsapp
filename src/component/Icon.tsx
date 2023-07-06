import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface Props {
    size: number; 
    src: ImageSourcePropType;
    color?: string;
  }

export const Icon: React.FC<Props> = ({ src, size, color }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Image source={src} style={{ width: '100%', height: '100%', tintColor: color }} resizeMode="contain" />
    </View>
  );
};

