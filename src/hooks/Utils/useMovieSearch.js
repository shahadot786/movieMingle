import {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';

function useMovieSearch() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const databaseRef = firebase.database().ref('/Movies');
    const onDataChange = snapshot => {
      const newData = snapshot.val();
      setData(newData);
      setIsLoading(false);
    };
    databaseRef.on('value', onDataChange);
    return () => {
      databaseRef.off('value', onDataChange);
    };
  }, []);

  const filterAndSortData = () => {
    if (searchQuery === '') {
      Alert.alert('Please provide a search query');
    } else {
      const filteredData = Object.values(data).filter(movie => {
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
      setFilteredData(filteredData);
      setDisplayData(sortedData);
    }
  };

  return {
    data,
    filteredData,
    displayData,
    searchQuery,
    setSearchQuery,
    isLoading,
    filterAndSortData,
  };
}

export default useMovieSearch;
