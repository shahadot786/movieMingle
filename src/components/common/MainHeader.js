import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import metrics from '../../theme/constant/metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/constant/colors';

const MainHeader = ({onHeaderIconPressHandler}) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.4 : 1}]}
          onPress={() => onHeaderIconPressHandler('search')}>
          <MaterialCommunityIcons
            name="movie-search"
            size={30}
            color={colors.White}
          />
        </Pressable>

        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.4 : 1}]}
          onPress={() => onHeaderIconPressHandler('more')}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color={colors.White}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    left: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 70,
    width: metrics.screenWidth - 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
