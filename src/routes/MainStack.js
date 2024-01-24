/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import strings from '../theme/constant/strings';
import HomeScreen from '../screens/Home/HomeScreen';
import DownloadScreen from '../screens/Download/DownloadScreen';
import CustomHeader from '../components/helper/CustomHeader';
import ItemListScreen from '../screens/ItemList/ItemListScreen';
import DetailsScreen from '../screens/Details/DetailsScreen';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createNativeStackNavigator();
//custom header for navigation
function CustomHeaderHandler(props) {
  return <CustomHeader title={props.title} navigation={props.navigation} />;
}

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={strings.HomeScreen}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.DownloadScreen}
          component={DownloadScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.ItemListScreen}
          component={ItemListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.DetailsScreen}
          component={DetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.SearchScreen}
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
