import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/helper/CustomHeader';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import {useDetails} from './Utils/useDetails';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import YoutubePlayer from '../../components/common/YoutubePlayer';

const DetailsScreen = ({route, navigation}) => {
  const {isAdShown} = useDetails(navigation);
  const {data} = route.params;
  const sliceName =
    data?.movieName.length > 40
      ? data?.movieName.substring(0, 40) + '...'
      : data?.movieName;

  return (
    <ScreenSafeAreaView>
      <CustomHeader height={40} title={sliceName} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YoutubePlayer videoId={data?.trailerLink} />

        <BottomSpacing />
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        {isAdShown && <ApplovinBannerAd />}
      </View>
    </ScreenSafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
