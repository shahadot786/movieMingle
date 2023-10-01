import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';

const CustomHeader = ({title, navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <AntDesign name="arrowleft" size={20} color={colors.SoftWhite} />
      </Pressable>
      <TitleText text={title} textStyle={styles.headerTitle} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    // backgroundColor: 'transparent',
    backgroundColor: colors.Primary,
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
