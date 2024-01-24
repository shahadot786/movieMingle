import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Text_Size from '../constant/fonts';
import colors from '../constant/colors';

const BigText = props => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[styles.title, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
    color: colors.White,
  },
});

export default BigText;
