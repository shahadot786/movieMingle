/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import {useHome} from './Utils/useHome';
import AppExitModal from '../../components/modal/AppExitModal';
import LoaderModal from '../../components/helper/LoaderModal';
import MainHeader from '../../components/common/MainHeader';
import ImageSlider from '../../components/common/ImageSlider';
import TitleText from '../../theme/Text/TitleText';
import BigText from '../../theme/Text/BigText';
import MovieSlider from '../../components/common/MovieSlider';
import HeaderText from '../../theme/Text/HeaderText';
import BottomSpacing from '../../theme/Global/BottomSpacing';

const HomeScreen = ({navigation}) => {
  const {
    isAdShown,
    isApplovin,
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    isLoading,
    onIconPressHandler,
    sliderData,
    moviesData,
  } = useHome(navigation);

  const renderLoader = () => {
    return <LoaderModal visible={isLoading} />;
  };

  const renderMoviesByType = (type, size, sortType, ascending) => {
    const moviesCopy = [...Object.values(moviesData)];
    switch (sortType) {
      case 'postedAt':
        moviesCopy.sort((a, b) =>
          ascending ? a.postedAt - b.postedAt : b.postedAt - a.postedAt,
        );
        break;
      case 'postViews':
        moviesCopy.sort((a, b) =>
          ascending ? a.postViews - b.postViews : b.postViews - a.postViews,
        );
        break;
      case 'movieYear':
        moviesCopy.sort((a, b) =>
          ascending ? a.movieYear - b.movieYear : b.movieYear - a.movieYear,
        );
        break;
      case 'rating':
        moviesCopy.sort((a, b) =>
          ascending ? a.rating - b.rating : b.rating - a.rating,
        );
        break;
      default:
        moviesCopy.sort((a, b) =>
          ascending ? a.rating - b.rating : b.rating - a.rating,
        );
    }
    const slicedData = moviesCopy.slice(0, size);
    return (
      <>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 15,
            borderLeftWidth: 5,
            borderLeftColor: colors.Primary,
            paddingLeft: 10,
            marginTop: 20,
          }}>
          <HeaderText text={type} />
          <Pressable style={({pressed}) => [{opacity: pressed ? 0.4 : 1}]}>
            <TitleText text={'See all'} />
          </Pressable>
        </View>
        <MovieSlider
          data={slicedData}
          navigation={navigation}
          horizontal={true}
        />
      </>
    );
  };

  return (
    <ScreenSafeAreaView style={styles.container}>
      {renderLoader()}
      <View style={styles.mainContainer}>
        <MainHeader onIconPressHandler={onIconPressHandler} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {sliderData && sliderData.length > 0 ? (
            <ImageSlider data={sliderData} />
          ) : (
            <LoaderModal visible={true} />
          )}
          {renderMoviesByType('Action', 50, 'postViews', false)}
          {renderMoviesByType('Romance', 40, 'postedAt', false)}
          {renderMoviesByType('Thriller', 40, 'postViews', true)}
          {renderMoviesByType('Sci-Fi', 40, 'movieYear', false)}
          {renderMoviesByType('Adventure', 40, 'rating', false)}
          {renderMoviesByType('Drama', 40, 'postedAt', true)}
          {renderMoviesByType('Crime', 40, 'movieYear', true)}
          {renderMoviesByType('Horror', 40, 'postViews', false)}
          {renderMoviesByType('War', 30, 'rating', false)}
          {renderMoviesByType('Animation', 30, 'movieYear', false)}
          {renderMoviesByType('Mystery', 50, 'rating', true)}
          {renderMoviesByType('Comedy', 50, 'postedAt', true)}
          {renderMoviesByType('Family', 30, 'movieYear', false)}
          {renderMoviesByType('Western', 30, 'postViews', false)}
          {renderMoviesByType('Music', 30, 'postedAt', false)}
          <BottomSpacing />
        </ScrollView>
      </View>
      <AppExitModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        exitAppPressHandler={exitAppPressHandler}
        cancelPressHandler={cancelPressHandler}
      />
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
