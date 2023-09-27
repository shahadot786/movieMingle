import React from 'react';
import Splash from './src/screens/Splash/Utils/Splash';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
};

export default App;
