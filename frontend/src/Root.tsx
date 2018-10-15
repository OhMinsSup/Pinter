import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

const preloadedState =
  typeof window === 'undefined' ? undefined : (window as any).__REDUX_STATE__;
const store = configureStore(preloadedState);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
