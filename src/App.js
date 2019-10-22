import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';

import { ToastContainer } from 'react-toastify';
import Routes from './routes/index';
import history from './services/history';

import { store, persistor } from './stores/index';

import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
