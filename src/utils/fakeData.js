import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, Button} from 'react-native';
import {firebase} from '@react-native-firebase/database';

function FakeData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueMovieYears, setUniqueMovieYears] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const databaseRef = firebase.database().ref('/Movies');

    const onDataChange = snapshot => {
      const newData = snapshot.val();
      setData(newData);

      // Filter the movies by a specific year (e.g., 2021).
      const filteredMovies = Object.values(newData).filter(
        movie => movie?.movieYear === '2022',
        // movie.genre === 'Action' ||
        // movie.genre1 === 'Action' ||
        // movie.genre2 === 'Action',
      );

      // Set the filtered movies state.
      setFilteredData(filteredMovies);

      // Extract unique movie years from the data
      const uniqueYears = [
        ...new Set(Object.values(newData).map(movie => movie.movieYear)),
      ];
      setUniqueMovieYears(uniqueYears);

      // Extract and collect unique genres from 'genre', 'genre1', and 'genre2' fields
      const allGenres = Object.values(newData).reduce((genres, movie) => {
        genres.add(movie?.genre);
        genres.add(movie?.genre1);
        genres.add(movie?.genre2);
        return genres;
      }, new Set());
      setUniqueGenres(Array.from(allGenres));

      // Determine the length of the main data (total number of movies)
      const mainDataLength = Object.keys(newData).length;
      // console.log(`Total number of movies: ${mainDataLength}`);
    };

    databaseRef.on('value', onDataChange);
    return () => {
      databaseRef.off('value', onDataChange);
    };
  }, []);

  // Filtering function to FakeDataly search query to title, genre1, genre2, genre3, year, and keywords
  filteredData.filter(movie => {
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
  // Sort the filtered data by rating in descending order
  const sortedData = filteredData.sort((a, b) => b.rating - a.rating);
  // console.log({uniqueMovieYears});
  // console.log(filteredData.length, 'filtered data');

  // Limit the displayed items to the first 10
  useEffect(() => {
    setDisplayData(sortedData.slice(0, 10));
  }, [sortedData]);

  return (
    <View>
      <Text>Movie Search</Text>

      {/* Search input */}
      <TextInput
        placeholder="Enter keywords, genre, year, or keywords..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* FakeDataly filters and display filtered and sorted results */}
      <Button title="Search" onPress={() => {}} />
      <FlatList
        data={displayData}
        keyExtractor={item => item?.postedAt.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item?.movieName}</Text>
            <Text>Year: {item?.movieYear}</Text>
            <Text>Description: {item?.description}</Text>
            <Text>Genre: {item?.genre}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default FakeData;
