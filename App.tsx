import React, {useEffect} from 'react';
import LoginScreen from './source/screens/Home/HomeScreen';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store, persistor} from './source/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginScreen></LoginScreen>
      </PersistGate>
    </Provider>
  );
};

export default App;