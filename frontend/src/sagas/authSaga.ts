import { call, put, takeLatest } from 'redux-saga/effects';
import * as AuthAPI from '../lib/api/auth';
import { AuthActionType, actionCreators as authActions } from '../store/modules/auth';

type SendAuthEmailAction = {
    type: AuthActionType.SEND_AUTH_EMAIL
    payload: any
}

function* sendAuthEmailFlow (action: SendAuthEmailAction) {
    try {  
        const { payload } = action;
        
        const response = yield call(AuthAPI.sendAuthEmailAPI, payload);
        yield put(authActions.sendAuthEmail(response));
    } catch (e) {
        console.log(e);
    }
}

export const AuthSaga = function*() {
    yield takeLatest(AuthActionType.SEND_AUTH_EMAIL, sendAuthEmailFlow);
}