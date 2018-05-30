import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { AuthSaga } from './authSaga';

export const rootSaga: () => SagaIterator = function* rootSaga() {
    yield [
        fork(AuthSaga)
    ]
}