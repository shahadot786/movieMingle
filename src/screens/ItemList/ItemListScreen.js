import React from 'react';
import {StyleSheet, Pressable, View, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DescriptionText from '../../theme/Text/DescriptionText';
import colors from '../../theme/constant/colors';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/helper/CustomHeader';
import {useItemList} from './Utils/useItemList';
import LoaderModal from '../../components/helper/LoaderModal';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import strings from '../../theme/constant/strings';
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

const ItemListScreen = ({route, navigation}) => {
  const {type} = route.params;
  const {filteredData, isLoading} = useItemList(type);

  const onItemPressHandler = item => {
    navigation.navigate(strings.DetailsScreen, {data: item});
  };

  const formattedData = filteredData?.map(item => ({
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
      <CustomHeader title={type} navigation={navigation} />
      <LoaderModal visible={isLoading} />
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

export default ItemListScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieItem: {
    width: metrics.screenWidth / 2.2,
    margin: 8,
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
