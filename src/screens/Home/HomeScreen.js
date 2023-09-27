/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import {useHome} from './Utils/useHome';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AppExitModal from '../../component/modal/AppExitModal';
import LoaderModal from '../../component/helper/LoaderModal';
import CustomVideoPlayer from '../Player/Video/CustomVideoPlayer';

const HomeScreen = ({navigation}) => {
  const {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    isLoading,
  } = useHome(navigation);

  return (
    <ScreenSafeAreaView style={styles.container}>
      {/* <LoaderModal visible={isLoading} /> */}
      {/* main container */}
      <View style={styles.mainContainer}>
        <View style={styles.topView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <BottomSpacingNav />
            <BottomSpacing />
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
    marginHorizontal: 15,
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
