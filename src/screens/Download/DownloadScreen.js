/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Pressable, Keyboard, ScrollView} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useDownload} from './Utils/useDownload';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import colors from '../../theme/constant/colors';
import ApplovinMREcAd from '../../hooks/Ads/Banner/ApplovinMREcAd';
import BigText from '../../theme/Text/BigText';
import CustomProgressBar from '../../component/progress/CustomProgressBar';

const DownloadScreen = () => {
  const {isAdShown, downloadProgress, currentSize, totalSize, loading} =
    useDownload();
  return (
    <ScreenSafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText
          text={'Download'}
          textStyle={{marginHorizontal: 15, marginTop: 20}}
        />
        <Pressable
          style={{
            flex: 1,
            marginHorizontal: 15,
          }}
          onPress={() => Keyboard.dismiss()}>
          {isAdShown && (
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <ApplovinMREcAd />
            </View>
          )}
          <View>
            {loading === true && (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingTop: 15,
                  borderColor: colors.Grey,
                  marginBottom: 15,
                  marginHorizontal: 15,
                }}>
                <CustomProgressBar
                  progress={downloadProgress}
                  currentSize={currentSize}
                  totalSize={totalSize}
                />
              </View>
            )}
          </View>
          {isAdShown && (
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <ApplovinMREcAd />
            </View>
          )}
        </Pressable>
        <BottomSpacing />
        <BottomSpacing />
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
