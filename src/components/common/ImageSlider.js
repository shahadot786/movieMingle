import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import metrics from '../../theme/constant/metrics';
import colors from '../../theme/constant/colors';

const ImageSlider = ({data}) => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        index={2}
        showPagination
        paginationDefaultColor={colors.Grey}
        paginationActiveColor={colors.Primary}
        paginationStyleItem={{width: 10, height: 10, marginHorizontal: 3}}
        data={data}
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [styles.child, {opacity: pressed ? 0.6 : 1}]}>
            <Image
              source={{uri: `${item?.movieImage}`}}
              style={styles.imageStyle}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  child: {
    justifyContent: 'center',
    width: metrics.screenWidth,
    alignItems: 'center',
  },
  imageStyle: {
    width: metrics.screenWidth - 50,
    height: metrics.screenHeight / 1.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
});

export default ImageSlider;
