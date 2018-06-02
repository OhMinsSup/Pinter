import { call, put, takeLatest } from 'redux-saga/effects';
import * as AuthAPI from '../lib/api/auth';
import { AuthActionType, actionCreators as authActions } from '../store/modules/auth';

type SendAuthEmailAction = {
    type: AuthActionType.SEND_AUTH_EMAIL
    payload: string
}

type CodePayload = {
    data: {
        email: string,
        registerToken: string
    }
}

type CodeAction = {
    type: AuthActionType.CODE
    payload: string
}

type LocalRegisterPayload = {
    data: {
        auth: {
            id: string,
            displayName: string,
            username: string,
            thumbnail: string
        },
        token: string
    }
}

type LocalRegisterAction = {
    type: AuthActionType.LOCAL_REGISTER
    payload: {
        registerToken: string,
        username: string,
        displayName: string
    }
}

function* localRegisterFlow (action: LocalRegisterAction) {
    try {        
        const { registerToken, username, displayName } = action.payload;
        const registerPayload = {
            registerToken,
            username,
            displayName
        };
        const response = yield call(AuthAPI.localRegisterAPI, registerPayload);
        const { data: { auth, token } }: LocalRegisterPayload = response;
    
        yield put(authActions.localRegister({ auth, token}));        
    } catch (e) {
        console.log(e);
    }
}

function* codeFlow (action: CodeAction) {
    try {
        const { payload: code } = action;
        
        const response = yield call(AuthAPI.codeAPI, code);
        const { data: { email, registerToken } }: CodePayload = response;
        
        yield put(authActions.code({ email, registerToken }));
    } catch (e) {
        console.log(e);
    }
}

function* sendAuthEmailFlow (action: SendAuthEmailAction) {
    try {  
        const { payload: email } = action;        
        const response = yield call(AuthAPI.sendAuthEmailAPI, email);
        yield put(authActions.sendAuthEmail(response));
    } catch (e) {
        console.log(e);
    }
}

export const AuthSaga = function*() {
    yield takeLatest(AuthActionType.SEND_AUTH_EMAIL, sendAuthEmailFlow);
    yield takeLatest(AuthActionType.CODE, codeFlow);
    yield takeLatest(AuthActionType.LOCAL_REGISTER, localRegisterFlow);
}