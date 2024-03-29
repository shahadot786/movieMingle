/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';

const PrimaryButton = ({
  loading = false,
  title,
  background,
  onPress,
  textAlign,
  disabled,
  minWidth,
  paddingVertical,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={({pressed}) => [
        {
          backgroundColor: disabled ? colors.Grey : background,
          minWidth: minWidth ? minWidth : '30%',
          opacity: pressed ? 0.7 : 1,
          paddingVertical: paddingVertical ? paddingVertical : '3%',
        },
        styles.button,
      ]}>
      <View style={styles.btnView}>
        <TitleText
          text={title}
          textStyle={{
            color: colors.White,
            textAlign: textAlign,
            fontWeight: 500,
            textTransform: 'capitalize',
          }}
        />
        {loading && <ActivityIndicator color={colors.Primary} size={'small'} />}
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: '5%',
    borderRadius: 5,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
