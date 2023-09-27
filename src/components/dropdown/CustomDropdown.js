/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Pressable, ScrollView, StyleSheet} from 'react-native';
import metrics from '../../theme/constant/metrics';
import colors from '../../theme/constant/colors';
import DescriptionText from '../../theme/Text/DescriptionText';

const CustomDropdown = ({options, onSelect, selectedValue, placeholder}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = value => {
    onSelect(value);
    toggleDropdown();
  };

  const renderDropdown = () => {
    return (
      <View
        style={[
          styles.dropdownContainer,
          {
            backgroundColor: colors.Grey,
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {options.map(item => (
            <Pressable
              key={item.value}
              style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
              onPress={() => handleSelect(item.value)}>
              <DescriptionText
                text={item.value}
                textStyle={{
                  color: colors.White,
                  paddingVertical: 8,
                  textTransform: 'uppercase',
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: colors.Grey,
          },
          styles.selectButton,
        ]}
        onPress={toggleDropdown}>
        <DescriptionText
          text={selectedValue ? selectedValue : placeholder}
          textStyle={{
            color: colors.White,
            textTransform: 'capitalize',
          }}
        />
      </Pressable>
      {showDropdown && renderDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    paddingHorizontal: 10,
    borderRadius: 5,

    paddingVertical: 15,
  },
  dropdownContainer: {
    borderRadius: 8,
    padding: 8,
    marginTop: 2,
    maxHeight: metrics.screenHeight / 5,
    overflow: 'hidden',
  },
});

export default CustomDropdown;
