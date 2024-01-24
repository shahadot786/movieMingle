/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

const useBackButtonHandler = navigation => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      setIsModalVisible(true);
      return true;
    }
  };

  const exitAppPressHandler = () => {
    BackHandler.exitApp();
    setIsModalVisible(false);
  };

  const cancelPressHandler = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
  };
};

export default useBackButtonHandler;
