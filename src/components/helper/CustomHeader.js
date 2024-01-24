import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/constant/colors';
import DescriptionText from '../../theme/Text/DescriptionText';

const CustomHeader = ({title, navigation, height}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.header, {height: height ? height : 60}]}>
      <Pressable
        onPress={handleGoBack}
        style={({pressed}) => [
          styles.backButton,
          {opacity: pressed ? 0.4 : 1},
        ]}>
        <Ionicons name="arrow-back-circle" size={25} color={colors.SoftWhite} />
      </Pressable>
      <DescriptionText text={title} textStyle={styles.headerTitle} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    // backgroundColor: colors.Primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.White,
    textTransform: 'capitalize',
  },
});
