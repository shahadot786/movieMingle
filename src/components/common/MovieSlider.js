import React from 'react';
import {FlatList, Image, StyleSheet, View, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import metrics from '../../theme/constant/metrics';
import colors from '../../theme/constant/colors';
import DescriptionText from '../../theme/Text/DescriptionText';

const formatPostViews = postViews => {
  if (postViews >= 1000000) {
    return `${(postViews / 1000000).toFixed(1)}M`;
  } else if (postViews >= 100) {
    return `${(postViews / 100).toFixed(1)}K`;
  } else {
    return postViews.toString();
  }
};

const MovieSlider = ({data, navigation, horizontal}) => {
  const onItemPressHandler = item => {};
  const renderMovieItem = ({item}) => {
    const formattedRating = item?.rating.toFixed(1);
    const formattedPostViews = formatPostViews(item?.postViews);

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
              text={formattedRating}
              textStyle={styles.ratingText}
            />
          </View>
          <View style={styles.watchContainer}>
            <AntDesign name="eye" size={18} color={colors.Grey} />
            <DescriptionText text={formattedPostViews} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item?.postedAt}
        horizontal={horizontal}
        renderItem={renderMovieItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  movieItem: {
    margin: 10,
    width: metrics.screenWidth / 3,
    borderRadius: 10,
    position: 'relative',
  },
  movieImage: {
    width: '100%',
    height: 250,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the background color and opacity as needed
    borderRadius: 10,
    height: 250,
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

export default MovieSlider;
