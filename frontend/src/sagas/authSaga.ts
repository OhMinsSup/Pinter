import { call, put, fork, take, select } from 'redux-saga/effects';
import * as AuthAPI from '../lib/api/auth';
import { StoreState } from '../store/modules'
import { AuthActionType, actionCreators as authActions } from '../store/modules/auth';
import { actionCreators as userActions} from '../store/modules/user';
import Storage from '../lib/storage';

type SendAuthEmailPayload = {
    data: {
        isUser: boolean
    }
}

type SendAuthEmailAction = {
    payload: string
}

function* sendAuthEmailFlow() {
    const { payload: email }: SendAuthEmailAction = yield take(AuthActionType.SEND_AUTH_EMAIL);
    const response = yield call(AuthAPI.sendAuthEmailAPI, email);
    const { data: { isUser } }: SendAuthEmailPayload = response; 
    
    if (!isUser) return
    yield put(authActions.sendAuthEmail({ isUser }));
}

type CodePayload = {
    data: {
        email: string,
        registerToken: string
    }
}

type CodeAction = {
    payload: string
}

function* codeFlow() {
    const { payload: code }: CodeAction = yield take(AuthActionType.CODE);
    const response = yield call(AuthAPI.codeAPI, code);

    const { data: { email, registerToken } }: CodePayload = response;

    if (!email || !registerToken) return;

    yield put(authActions.code({ email, registerToken }));
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
    payload: {
        registerToken: string,
        username: string,
        displayName: string
    }
}

type SetUserPayload = {
    id: string
    username: string
    displayName: string
    thumbnail: null | string
}

function* localRegisterFlow () {
    const { payload: registerPayload }: LocalRegisterAction = yield take(AuthActionType.LOCAL_REGISTER);
    const response = yield call(AuthAPI.localRegisterAPI, registerPayload);

    const { data: { auth, token } }: LocalRegisterPayload = response;

    if (!auth || !token) return;
    
    yield put(authActions.localRegister({ auth, token })); 

    const setUserData: SetUserPayload = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
        
    yield put(userActions.setUser({ setUserData }))

    Storage.set('__pinter_user__', setUserData);
}

type LocalLoginPayload = {
    data: {
        auth: {
            id: string
            username: string,
            displayName: string,
            thumbnail: string
        },
        token: string
    }
}

type LocalLoginAction = {
    payload: string
}

function* localLoginFlow() {
    const { payload: code }: LocalLoginAction = yield take(AuthActionType.LOCAL_LOGIN);
    
    const response = yield call(AuthAPI.localLoginAPI, code);
    const { data: { auth, token } }: LocalLoginPayload = response;
    
    if (!auth) return;
    
    yield put(authActions.localLogin({ auth, token }));

    const setUserData: SetUserPayload = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
    
    yield put(userActions.setUser({ setUserData }))

    Storage.set('__pinter_user__', setUserData);
}

export function* authSaga() {
    yield fork(sendAuthEmailFlow);
    yield fork(codeFlow);
    yield fork(localRegisterFlow);
    yield fork(localLoginFlow);
}