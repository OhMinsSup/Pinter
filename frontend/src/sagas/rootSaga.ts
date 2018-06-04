import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';

export const rootSaga: () => SagaIterator = function* rootSaga() {
    yield [
        fork(authSaga),
        fork(userSaga)
    ]
}