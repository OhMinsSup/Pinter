import { call, put, fork, take } from 'redux-saga/effects';
import { UserActionType, actionCreators as userActions } from '../store/modules/user';
import * as UserAPI from '../lib/api/user';


type CheckUserPayload = {
    data: {
        user: {
            id: string
            username: string
            displayName: string
            thumbnail: string
        }
    }
}

function* checkUserFlow() {
    yield take(UserActionType.CHECK_USER);

    const response = yield call(UserAPI.checkAPI);    
    const { data: { user } }: CheckUserPayload = response;
    
    if (!user) return;
    
    yield put(userActions.checkUser({ user }));
}

export function* userSaga() {
    yield fork(checkUserFlow);
}