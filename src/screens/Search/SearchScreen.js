import {Pressable, StyleSheet, FlatList, View, Image} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomTextInput from '../../components/inputs/CustomTextInput';
import {useSearch} from './Utils/useSearch';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/constant/colors';
import DescriptionText from '../../theme/Text/DescriptionText';
import strings from '../../theme/constant/strings';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import LoaderModal from '../../components/helper/LoaderModal';
import metrics from '../../theme/constant/metrics';
import BigText from '../../theme/Text/BigText';

const formatPostViews = postViews => {
  const updatedPostViews = postViews + 1000;
  if (updatedPostViews >= 1000000) {
    return `${(updatedPostViews / 1000000).toFixed(1)}M`;
  } else if (updatedPostViews >= 100) {
    return `${(updatedPostViews / 100).toFixed(1)}K`;
  } else {
    return updatedPostViews.toString();
  }
};

const SearchScreen = ({navigation}) => {
  const {
    onChangeInputText,
    searchQuery,
    searchData,
    filterAndSortData,
    isLoading,
  } = useSearch();

  const onItemPressHandler = item => {
    navigation.navigate(strings.DetailsScreen, {data: item});
  };

  const formattedData = searchData?.map(item => ({
    ...item,
    formattedRating: item?.rating.toFixed(1),
    formattedPostViews: formatPostViews(item?.postViews),
  }));

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onItemPressHandler(item)}
        style={({pressed}) => [styles.movieItem, {opacity: pressed ? 0.6 : 1}]}>
        <Image source={{uri: item?.movieImage}} style={styles.movieImage} />
        <View style={styles.overlay}>
          <DescriptionText
            text={item?.movieName}
            textStyle={{marginBottom: 10}}
          />
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color={colors.Yellow} />
            <DescriptionText
              text={item?.formattedRating}
              textStyle={styles.ratingText}
            />
          </View>
          <View style={styles.watchContainer}>
            <AntDesign name="eye" size={16} color={colors.Grey} />
            <DescriptionText text={item?.formattedPostViews} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenSafeAreaView>
      <LoaderModal visible={isLoading} />
      <CustomTextInput
        containerStyle={{marginVertical: 5, marginHorizontal: 10}}
        placeholder={'Search with year, name, genre and keywords..'}
        onChangeText={onChangeInputText}
        value={searchQuery}
      />
      <Pressable
        onPress={() => filterAndSortData()}
        style={({pressed}) => [
          {
            position: 'absolute',
            right: 25,
            top: 25,
            zIndex: 999,
            opacity: pressed ? 0.4 : 1,
          },
        ]}>
        <AntDesign name="search1" size={30} color={colors.Black} />
      </Pressable>
      {formattedData.length === 0 && (
        <BigText
          text={'No Data Found'}
          textStyle={{textAlign: 'center', marginTop: 50}}
        />
      )}
      <FlatList
        data={formattedData}
        keyExtractor={item => item?.postedAt}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<BottomSpacingNav />}
      />
    </ScreenSafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieItem: {
    width: metrics.screenWidth / 2.2,
    margin: 5,
    borderRadius: 10,
    position: 'relative',
  },
  movieImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    height: 300,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    position: 'absolute',
    top: 0,
    right: 2,
  },
  watchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    position: 'absolute',
    top: 0,
    left: 2,
    gap: 2,
  },
  ratingText: {
    color: colors.Yellow,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
