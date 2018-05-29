import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { watchTextChange } from './authSaga';

export const rootSaga: () => SagaIterator = function* rootSaga() {
    yield [fork(watchTextChange)]
}