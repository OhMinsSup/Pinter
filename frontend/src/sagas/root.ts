import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import auth from './auth';
import pin from './pin';
import user from './user';

export const root: () => SagaIterator = function* rootSaga() {
    yield [
        fork(auth),
        fork(pin),
        fork(user)
    ]
}