import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import metrics from '../../theme/constant/metrics';
import colors from '../../theme/constant/colors';
import {useNavigation} from '@react-navigation/native';
import strings from '../../theme/constant/strings';
import {useAppSelector} from '../../store/store';
import useApplovinInterstitialAd from '../../hooks/Ads/Interstitials/useApplovinInterstitialAd';

const ImageSlider = ({data}) => {
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const {isAdShown, interAdCount} = useAppSelector(state => state.ads);
  const navigation = useNavigation();

  let _count = 0;
  const onItemPressHandler = item => {
    _count++;
    if (isAdShown && isInterstitialReady) {
      if (_count % interAdCount === 0) {
        handleShowInterstitial();
      }
    }
    navigation.navigate(strings.DetailsScreen, {data: item});
  };
  const handleShowInterstitial = async () => {
    await showInterstitial();
  };
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
            onPress={() => onItemPressHandler(item)}
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
