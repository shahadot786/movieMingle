import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import colors from '../../../theme/constant/colors';

const adUnitId = '72e22b6b822ab2b6';

const ApplovinMREcAd = () => {
  return (
    <AppLovinMAX.AdView
      adUnitId={adUnitId}
      adFormat={AppLovinMAX.AdFormat.MREC}
      style={[styles.mrec, {backgroundColor: colors.Black}]}
      autoRefresh={true}
      //   onAdLoaded={adInfo => {
      //     console.log('MREC ad loaded from ' + adInfo.networkName);
      //   }}
      //   onAdLoadFailed={errorInfo => {
      //     console.log(
      //       'MREC ad failed to load with error code ' +
      //         errorInfo.code +
      //         ' and message: ' +
      //         errorInfo.message,
      //     );
      //   }}
      //   onAdClicked={adInfo => {
      //     console.log('MREC ad clicked');
      //   }}
      //   onAdExpanded={adInfo => {
      //     console.log('MREC ad expanded');
      //   }}
      //   onAdCollapsed={adInfo => {
      //     console.log('MREC ad collapsed');
      //   }}
      //   onAdRevenuePaid={adInfo => {
      //     console.log('MREC ad revenue paid: ' + adInfo.revenue);
      //   }}
    />
  );
};

const styles = StyleSheet.create({
  mrec: {
    // position: 'absolute',
    // width: metrics.screenWidth,
    height: 'auto',
    bottom: Platform.select({
      ios: 36, // For bottom safe area
      android: 0,
    }),
    marginTop: 5,
  },
});

export default ApplovinMREcAd;
