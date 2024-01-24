import useApplovinInterstitialAd from '../../../hooks/Ads/Interstitials/useApplovinInterstitialAd';
import {useAppSelector} from '../../../store/store';
import {useEffect, useState} from 'react';
import strings from '../../../theme/constant/strings';

export const useItemList = (navigation, type) => {
  const [filteredData, setFilteredData] = useState();
  const {moviesData} = useAppSelector(state => state.firebase);
  const {isAdShown, interAdCount} = useAppSelector(state => state.ads);
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const moviesCopy = [...Object.values(moviesData)];
    const filteredMovies = moviesCopy.filter(
      movie =>
        movie.genre === type || movie.genre1 === type || movie.genre2 === type,
    );
    const sortedData = filteredMovies.sort((a, b) => b.rating - a.rating);
    setFilteredData(sortedData);
    setIsLoading(false);
  }, [type]);
  let _count = 0;
  const onItemPressHandler = item => {
    if (isAdShown && isInterstitialReady) {
      _count++;
      if (_count % interAdCount === 0) {
        handleShowInterstitial();
      }
    }

    navigation.navigate(strings.DetailsScreen, {data: item});
  };

  const handleShowInterstitial = async () => {
    await showInterstitial();
  };

  return {filteredData, isLoading, isAdShown, onItemPressHandler};
};
