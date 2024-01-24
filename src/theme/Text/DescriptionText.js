import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Text_Size from '../constant/fonts';
import colors from '../constant/colors';

const DescriptionText = props => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[styles.details, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_9,
    color: colors.White,
  },
});

export default DescriptionText;
