/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import strings from '../theme/constant/strings';
import CustomHeader from '../components/common/CustomHeader';
import HomeScreen from '../screens/Home/HomeScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
