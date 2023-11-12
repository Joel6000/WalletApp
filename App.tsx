import React from 'react';
import Main from './src/navigators/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/stores/store';

function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
