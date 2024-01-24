import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Text_Size from '../constant/fonts';
import colors from '../constant/colors';

const ShortText = props => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[styles.title, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_8,
    color: colors.White,
  },
});

export default ShortText;
