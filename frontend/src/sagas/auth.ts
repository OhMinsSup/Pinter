import { call, put, fork, take, cancelled } from 'redux-saga/effects';

import { 
    AuthActionType,
    actionCreators as authActions 
} from '../store/modules/auth';
import * as AuthPayload from './types/auth';
import * as AuthAPI from '../lib/api/auth';

function* sendAuthEmailFlow() {    
    const { payload: email }: AuthPayload.SendAuthEmailPayload = yield take(AuthActionType.SEND_AUTH_EMAIL_REQUEST);
    
    yield put(authActions.sendAuthEmailPending(true));

    const { data: { isUser }, error }: AuthPayload.SendAuthEmailPayload = yield call(AuthAPI.sendAuthEmailAPI, email);
    
    if (!isUser && error) {
        yield put(authActions.sendAuthEmailFailing());
        return;
    }
    yield put(authActions.sendAuthEmailSuccess(isUser)); 
   
    yield put(authActions.sendAuthEmailPending(false));
    yield cancelled();
}

function* codeFlow() {
    const { payload: code }: AuthPayload.CodePayload = yield take(AuthActionType.CODE_REQUEST);
        
    const { data: { registerToken, email }, error }: AuthPayload.CodePayload = yield call(AuthAPI.codeAPI, code);

    if (!email || !registerToken && error) {
        yield put(authActions.codeFailing());
        return;
    }
    
    yield put(authActions.codeSuccess({ email, registerToken }));
    yield cancelled();
}

function* localRegisterFlow () {
    const { payload: { registerToken, username, displayName } }: AuthPayload.LocalRegisterPayload = yield take(AuthActionType.LOCAL_REGISTER_REQUEST);
    
    const { data: { user, token }, error }: AuthPayload.LocalRegisterPayload = yield call(AuthAPI.localRegisterAPI, { registerToken, username, displayName });

    if (!user || !token && error) {
        yield put(authActions.localRegisterFailing());
        return;
    }

    yield put(authActions.localRegisterSuccess({ user, token }));
    yield cancelled();
}

export default function* auth() {
    yield fork(sendAuthEmailFlow);
    yield fork(codeFlow);
    yield fork(localRegisterFlow);
}
