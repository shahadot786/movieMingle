import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueMovieYears, setUniqueMovieYears] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
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

  // Function to filter and sort data based on search query
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

      // Sort the filtered data by rating in descending order
      const sortedData = filteredData.sort((a, b) => b.rating - a.rating);
      // Limit the displayed items to the first 10
      // const limitedData = sortedData.slice(0, 10);

      setFilteredData(filteredData);
      setDisplayData(sortedData);
    }
  };
  // console.log(displayData.length);
  // Render loading indicator while data is being fetched
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text>Movie Search</Text>

      {/* Search input */}
      <TextInput
        placeholder="Enter genre, year, or keywords..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* Apply filters and display filtered and sorted results */}
      <Button title="Search" onPress={filterAndSortData} />

      {/* Display the results using VirtualizedList */}
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

export default App;
