import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/database';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const databaseRef = firebase.database().ref('/Movies');

    const onDataChange = snapshot => {
      const newData = snapshot.val();
      setData(newData);
    };

    databaseRef.on('value', onDataChange);
    return () => {
      databaseRef.off('value', onDataChange);
    };
  }, []);

  // console.log(JSON.stringify(data, null, 2));

  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

export default App;
