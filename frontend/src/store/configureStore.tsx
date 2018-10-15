import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import modules from './modules';

const isDev = process.env.NODE_ENV === 'development';
const devTools = isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const middlewares = [loggerMiddleware, thunkMiddleware];

const configure = (preloadedState?: any) =>
  createStore(
    modules,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
