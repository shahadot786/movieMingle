import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/constant/colors';
import DescriptionText from '../../theme/Text/DescriptionText';
import metrics from '../../theme/constant/metrics';
import Text_Size from '../../theme/constant/fonts';

const CustomTextInput = props => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={props.containerStyle}>
      <View>
        <TextInput
          style={[
            styles.defaultInputStyle,
            props.inputStyle,
            isFocused && styles.focusedInput,
            {color: colors.White},
          ]}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={colors.Grey}
          keyboardType={props.keyboardType}
          editable
          multiline
          numberOfLines={10}
          cursorColor={colors.Primary}
          // textAlignVertical={'top'}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.onPasteBtnPressHandler && (
          <>
            {!isFocused && (
              <Pressable
                onPress={() => props.onPasteBtnPressHandler()}
                style={({pressed}) => [
                  {opacity: pressed ? 0.7 : 1},
                  styles.pasteBtn,
                ]}>
                <DescriptionText
                  text={props.value ? 'Clear' : 'Paste'}
                  textStyle={{color: colors.White}}
                />
              </Pressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  defaultInputStyle: {
    height:
      metrics.screenWidth <= 380 ? 40 : metrics.screenWidth <= 600 ? 50 : 60,
    borderWidth: 1,
    borderColor: colors.Grey,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: Text_Size.Text_1,
  },
  focusedInput: {
    borderColor: colors.Green,
  },
  pasteBtn: {
    position: 'absolute',
    right: 20,
    top: 25,
    backgroundColor: colors.Grey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
