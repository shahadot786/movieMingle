import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constant/colors';

const ScreenSafeAreaView = props => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        animated={true}
        hidden={props.hidden}
        backgroundColor={colors.Black}
        barStyle={'light-content'}
      />
      {props.children}
    </SafeAreaView>
  );
};

export default ScreenSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.Black,
  },
});
