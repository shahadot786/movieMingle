import {useAppSelector} from '../../../store/store';
import {useEffect, useState} from 'react';

export const useItemList = (type, navigation) => {
  const [filteredData, setFilteredData] = useState();
  const {moviesData} = useAppSelector(state => state.firebase);

  useEffect(() => {
    const moviesCopy = [...Object.values(moviesData)];
    const filteredMovies = moviesCopy.filter(
      movie =>
        movie.genre === type || movie.genre1 === type || movie.genre2 === type,
    );
    const sortedData = filteredMovies.sort((a, b) => b.rating - a.rating);
    setFilteredData(sortedData);
  }, [type]);

  return {filteredData};
};
