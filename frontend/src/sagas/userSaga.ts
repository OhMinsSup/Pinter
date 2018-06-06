import { call, put, fork, take } from 'redux-saga/effects';
import * as UserAPI from '../lib/api/user';
import { UserActionType, actionCreators as userActions } from '../store/modules/user';
import { CheckUserTypes } from './types/userTypes';


function* checkUserFlow() {
    yield take(UserActionType.CHECK_USER);

    const response = yield call(UserAPI.checkAPI);    
    const { data: { user } }: CheckUserTypes = response;
    
    if (!user) return;
    
    yield put(userActions.checkUser({ user }));
}

export function* userSaga() {
    yield fork(checkUserFlow);
}