import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {useEffect, useState} from 'react';
import {toastNotification} from '../../../utils/constants';
import {useAppSelector} from '../../../store/store';
import useBackButtonHandler from '../../../hooks/Utils/useBackButtonHandler';
import useApplovinInterstitialAd from '../../../hooks/Ads/Interstitials/useApplovinInterstitialAd';
import strings from '../../../theme/constant/strings';

export const useHome = navigation => {
  const [sliderData, setSliderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isAdShown, interAdCount} = useAppSelector(state => state.ads);
  const {moviesData} = useAppSelector(state => state.firebase);
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const toast = useToast();
  const netInfoState = useConnectionCheck();

  const {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
  } = useBackButtonHandler(navigation);
  let _count = 0;

  const handleShowInterstitial = async () => {
    await showInterstitial();
  };

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        // Simulate a loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (netInfoState && !netInfoState.isConnected) {
          toast.show('Network is not available!!', toastNotification('normal'));
        }

        // Filter, sort, and limit movies data in one step
        const filteredAndSortedData = Object.values(moviesData)
          .filter(movie => movie?.movieYear === '2022')
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 15);

        setSliderData(filteredAndSortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSliderData();
  }, [moviesData, netInfoState, toast]);

  const onHeaderIconPressHandler = type => {
    if (type === 'search') {
      navigation.navigate(strings.SearchScreen);
    }
  };
  const onSeeAllPressHandler = type => {
    _count++;
    if (isAdShown && isInterstitialReady) {
      if (_count % interAdCount === 0) {
        handleShowInterstitial();
      }
    }
    navigation.navigate(strings.ItemListScreen, {type: type});
  };

  return {
    isAdShown,
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    isLoading,
    onHeaderIconPressHandler,
    sliderData,
    moviesData,
    onSeeAllPressHandler,
  };
};
