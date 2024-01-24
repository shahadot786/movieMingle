import {useCallback, useState} from 'react';
import {useAppSelector} from '../../../store/store';
import {Alert} from 'react-native';

export const useSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {moviesData} = useAppSelector(state => state.firebase);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInputText = useCallback(text => {
    setSearchQuery(text);
  }, []);

  const filterAndSortData = () => {
    if (searchQuery === '') {
      Alert.alert('Please provide a search query');
    } else {
      setIsLoading(true);
      const filteredData = Object.values(moviesData).filter(movie => {
        const keywordFilter =
          !searchQuery ||
          movie?.movieName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie?.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie?.genre1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie?.genre2.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie?.movieYear === searchQuery ||
          (movie?.keywords &&
            movie?.keywords.toLowerCase().includes(searchQuery.toLowerCase()));

        return keywordFilter;
      });
      const sortedData = filteredData.sort((a, b) => b.rating - a.rating);
      setSearchData(sortedData);
      setIsLoading(false);
    }
  };

  return {
    searchQuery,
    filterAndSortData,
    searchData,
    onChangeInputText,
    isLoading,
  };
};
