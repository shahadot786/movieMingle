import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/helper/CustomHeader';

const DetailsScreen = ({route, navigation}) => {
  const {data} = route.params;
  const sliceName =
    data?.movieName.length > 40
      ? data?.movieName.substring(0, 40) + '...'
      : data?.movieName;

  return (
    <ScreenSafeAreaView>
      <CustomHeader title={sliceName} navigation={navigation} />
    </ScreenSafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
