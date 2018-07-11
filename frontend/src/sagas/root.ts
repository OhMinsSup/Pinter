import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import auth from './auth';


export const root: () => SagaIterator = function* rootSaga() {
    yield [
        fork(auth),
        // fork(userSaga)
    ]
}