import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
//import {store} from './src/store/store';
import Index from './src/index';
import appStore from './src/store/ConfigureStore';
//import {PersistGate} from 'redux-persist/es/integration/react';

console.log('State', JSON.stringify(appStore.getState()));
const App = () => {
  return (
    <Provider store={appStore}>
      <Index />
    </Provider>
  );
};

export default App;
