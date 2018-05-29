import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import modules from './modules';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    loggerMiddleware,
    sagaMiddleware
];

const configureStore = () => {
    const store = createStore(
        modules,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(...middlewares)
    );

    return store;
};

export default configureStore;