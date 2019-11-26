import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import './App.css';

import AppRoutes from './routes';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
