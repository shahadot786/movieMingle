/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import AppLovinMAX from 'react-native-applovin-max';
import SplashScreen from '../SplashScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import Routes from '../../../routes/Routes';
import strings from '../../../theme/constant/strings';
import {StoragePermissionProvider} from '../../../hooks/Permission/StoragePermissionProvider';
import {firebase} from '@react-native-firebase/database';
import {useAppDispatch} from '../../../store/store';
import {setMoviesData} from '../../../store/slices/firebase/firebaseSlice';

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

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
    const databaseRef = firebase.database().ref('/Movies');
    const onDataChange = snapshot => {
      const newData = snapshot.val();
      dispatch(setMoviesData(newData));
    };
    databaseRef.on('value', onDataChange);
    return () => {
      databaseRef.off('value', onDataChange);
    };
  }, []);

  useEffect(() => {
    let timer = null;
    if (loading === true) {
      timer = setTimeout(() => {
        return setLoading(false);
      }, 2000);
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
        <StoragePermissionProvider>
          <Routes />
        </StoragePermissionProvider>
      </ToastProvider>
    );
  }
};

export default Splash;
