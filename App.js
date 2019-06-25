
import React, { Component } from 'react';
import { StatusBar, AsyncStorage, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from 'native-base';
import { store, persistor } from './store';

import Splash from './src/screens/splash';

console.disableYellowBox = true;

export default class App extends Component {

  componentDidMount() {
    AsyncStorage.setItem('lng', 'es')
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
        >
          <StatusBar
            backgroundColor={Platform.OS === 'ios' ? '#fff' : 'black'}
            barStyle='light-content'
          />
          <Root>
            <Splash />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}