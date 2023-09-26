import { View, Image } from 'react-native';


export const renderStarRating = (rating: string) => {
    const maxStars = 5;
    const numericRating = parseFloat(rating); 
    const roundedRating = Math.round(numericRating * maxStars) / maxStars;
    const stars = [];
  
    for (let i = 1; i <= maxStars; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Image key={i} source={require('../../assets/icon/star.png')} style={{ width: 14, height: 14 }}
          />
        );
      } else {
        stars.push(
          <Image key={i} source={require('../../assets/icon/star-0.png')} style={{ width: 14, height: 14, opacity: 0.5 }}
          />
        );
      }
    }
  
    return (
      <View className='flex-row'>
        {stars}
      </View>
    );
  };