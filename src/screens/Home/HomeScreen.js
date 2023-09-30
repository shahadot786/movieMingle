/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import {useHome} from './Utils/useHome';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AppExitModal from '../../components/modal/AppExitModal';
import LoaderModal from '../../components/helper/LoaderModal';
import MainHeader from '../../components/common/MainHeader';
import ImageSlider from '../../components/common/ImageSlider';
import TitleText from '../../theme/Text/TitleText';
import BigText from '../../theme/Text/BigText';

const HomeScreen = ({navigation}) => {
  const {
    isAdShown,
    isApplovin,
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    onItemPressHandler,
    sliderData,
    isLoading,
    onIconPressHandler,
  } = useHome(navigation);

  // Check if sliderData is empty or null and set data accordingly
  const renderImageSlider = () => {
    if (!sliderData || sliderData.length === 0) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <BigText text={'Data is loading...'} />
        </View>
      );
    } else {
      return <ImageSlider data={sliderData} />;
    }
  };

  return (
    <ScreenSafeAreaView style={styles.container}>
      <LoaderModal visible={isLoading} />
      {/* main container */}
      <View style={styles.mainContainer}>
        <View style={styles.topView}>
          {/* header */}
          <MainHeader onIconPressHandler={onIconPressHandler} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {renderImageSlider()}
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <TitleText text={''} />
            <BottomSpacingNav />
          </ScrollView>
        </View>
        <AppExitModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          exitAppPressHandler={exitAppPressHandler}
          cancelPressHandler={cancelPressHandler}
        />
      </View>
    </ScreenSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  desText: {
    marginTop: 5,
  },
  mainContainer: {
    flex: 1,
    marginVertical: 10,
  },
  scrollView: {},
  topCardView: {
    justifyContent: 'space-between',
    borderBottomColor: colors.Grey,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    paddingBottom: 5,
  },
  topLogoImage: {
    resizeMode: 'contain',
  },
});
