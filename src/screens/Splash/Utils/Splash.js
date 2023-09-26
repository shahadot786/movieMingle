/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import AppLovinMAX from 'react-native-applovin-max';
import SplashScreen from '../SplashScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import Routes from '../../../navigation/Routes';
import strings from '../../../theme/constant/strings';

const Splash = () => {
  const [loading, setLoading] = useState(true);

  const initialApplovinAds = useMemo(() => {
    return () => {
      AppLovinMAX.initialize(strings.ApplovinAPIKey)
        .then(configuration => {
          // console.log(configuration, 'start loading ads');
        })
        .catch(error => {});
    };
  }, []);

  useEffect(() => {
    let timer = null;
    if (loading === true) {
      timer = setTimeout(() => {
        return setLoading(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    initialApplovinAds();
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <ToastProvider>
        <Routes />
      </ToastProvider>
    );
  }
};

export default Splash;
