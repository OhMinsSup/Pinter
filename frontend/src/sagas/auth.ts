import { call, put, fork, take, select } from 'redux-saga/effects';

import { 
    AuthActionType,
    SocialResultSubState, 
    VerifySocialResultSubState,
    actionCreators as authActions,
} from '../store/modules/auth';
import {
    actionCreators as baseActions
} from '../store/modules/base';
import {
    UserSubState,
    actionCreators as userActions
} from '../store/modules/user';
import * as AuthPayload from './types/auth';
import * as AuthAPI from '../lib/api/auth';
import { StoreState } from '../store/modules';
import storage from '../lib/storage';
import social from '../lib/social';

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
}

function* codeFlow() {
    const { payload: code }: AuthPayload.CodePayload = yield take(AuthActionType.CODE_REQUEST);
        
    const { data: { registerToken, email }, error }: AuthPayload.CodePayload = yield call(AuthAPI.codeAPI, code);

    if (!email || !registerToken && error) {
        yield put(authActions.codeFailing());
        return;
    }
    
    yield put(authActions.codeSuccess({ email, registerToken }));
}

function* localRegisterFlow () {
    const { payload: { registerToken, username, displayName } }: AuthPayload.LocalRegisterPayload = yield take(AuthActionType.LOCAL_REGISTER_REQUEST);
    const { data: { user, token }, error }: AuthPayload.LocalRegisterPayload = yield call(AuthAPI.localRegisterAPI, { registerToken, username, displayName });

    if (!user || !token && error) {
        yield put(authActions.localRegisterFailing());
        return;
    }

    yield put(authActions.localRegisterSuccess({ user, token }));

    const userData: UserSubState = yield select((state: StoreState) => state.auth.authResult.user);

    if (!userData) return;

    yield put(userActions.setUser(userData));
    storage.set('__pinter_user__', userData);
}

function* localLoginFlow () {
    const { payload: { code, history } }: AuthPayload.LocalLoginPayload = yield take(AuthActionType.LOCAL_LOGIN_REQUEST);
    const { data: { user, token }, error }: AuthPayload.LocalLoginPayload = yield call(AuthAPI.localLoginAPI, code);

    if (!user || !token && error) {
        yield put(authActions.localLoginFailing());
        return;
    }

    yield put(authActions.localLoginSuccess({ user, token }));

    const userData: UserSubState = yield select((state: StoreState) => state.auth.authResult.user);
    if (!userData) return;

    yield put(userActions.setUser(userData));
    storage.set('__pinter_user__', userData);
    history.push('/');
}

function* socialRegisterFlow () {
    const { payload: { displayName, accessToken, provider, username, socialEmail } }: AuthPayload.SocialRegisterRequestPayload = yield take(AuthActionType.SOCIAL_REGISTER_REQUEST);
    const { data: { user, token } }: AuthPayload.SocialRegisterRequestPayload = yield call(AuthAPI.socialRegisterAPI, { displayName, username, accessToken, provider, socialEmail });

    if (!token || !user) {
        yield put(authActions.socialRegisterFailing());
        return;
    }

    yield put(authActions.socialRegisterSuccess({ user, token }));
    
    const userData: UserSubState = yield select((state: StoreState) => state.auth.authResult.user);
    if (!userData) return;

    yield put(userActions.setUser(userData));
    storage.set('__pinter_user__', userData);
}

async function getSocialToken(response: any) {
    let token = null;
    try {
        token = await response;   
    } catch (e) {
        console.log(e);
    }
    return token;
}

function* providerLoginFlow () {
    const { payload: { provider, history } }: AuthPayload.ProviderPayload = yield take(AuthActionType.PROVIDER_LOGIN_REQUEST);
    const token = social[provider]();    
    const accessToken: string = yield call(getSocialToken, token);
    
    if (!provider || !accessToken) {
        yield put(authActions.providerLoginFailing());
        return;
    }

    yield put(authActions.providerLoginSuccess({ accessToken, provider }));
    const socialAuthResultData: SocialResultSubState = yield select((state: StoreState) => state.auth.socialAuthResult);

    if (!socialAuthResultData) return;

    const { data: { profile, exists }, error }:AuthPayload.VerifySocialPayload = yield call(AuthAPI.verifySocialAPI, socialAuthResultData);
    
    if (!profile || exists === undefined && error ) {
        yield put(authActions.verifySocialFailing());
        return;
    }

    yield put(authActions.verifySocialSuccess({ profile, exists }));
    const verifySocialResultData: VerifySocialResultSubState = yield select((state: StoreState) => state.auth.verifySocialResult);
    const { exists: socialExists } = verifySocialResultData;

    if (socialExists) {
        const { data: { user, token } }: AuthPayload.SocialLoginPayload = yield call(AuthAPI.socialLoginAPI, socialAuthResultData)
        yield put(authActions.socialLoginSuccess({ user, token }));
        const authResultData: UserSubState = yield select((state: StoreState) => state.auth.authResult);
        yield put(userActions.setUser(authResultData));
        storage.set('__pinter_user__', authResultData);
    } else {
        const { email, username: name } = verifySocialResultData;
        if (!email || !name) return;
        yield put(authActions.autoRegisterForm({ email, name }));
        history.push('/email-register');
    }

    yield put(baseActions.setFullscreenLoader(false));
}

export default function* auth() {
    yield fork(sendAuthEmailFlow);
    yield fork(codeFlow);
    yield fork(localRegisterFlow);
    yield fork(localLoginFlow);
    yield fork(socialRegisterFlow);
    yield fork(providerLoginFlow);
}
