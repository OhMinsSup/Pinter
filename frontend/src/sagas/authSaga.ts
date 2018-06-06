import { call, put, fork, take, select } from 'redux-saga/effects';
import Storage from '../lib/storage';
import social from '../lib/social';
import * as AuthAPI from '../lib/api/auth';
import { StoreState } from '../store/modules'
import { actionCreators as userActions } from '../store/modules/user';
import { 
    AuthResultSubState, 
    SocialResultSubState, 
    VerifySocialResultSubState, 
    AuthActionType, 
    actionCreators as authActions } from '../store/modules/auth';
import { 
    SendAuthEmailTypes, 
    CodeTypes, 
    LocalRegisterTypes, 
    LocalLoginTypes, 
    SocialLoginTypes, 
    SocialRegisterTypes 
} from './types/authTypes';

function* sendAuthEmailFlow() {    
    const { payload: { email } }: SendAuthEmailTypes = yield take(AuthActionType.SEND_AUTH_EMAIL);
    const { data: { isUser } }: SendAuthEmailTypes = yield call(AuthAPI.sendAuthEmailAPI, email);

    if (!isUser) return;

    yield put(authActions.sendAuthEmail({ isUser }));
}

function* codeFlow() {
    const { payload: { code } }: CodeTypes = yield take(AuthActionType.CODE);
    const { data: { email, registerToken } }: CodeTypes = yield call(AuthAPI.codeAPI, code);
    
    if (!email || !registerToken) return;

    yield put(authActions.code({ email, registerToken }));
}


function* localRegisterFlow () {
    const { payload: { registerToken, username, displayName } }: LocalRegisterTypes = yield take(AuthActionType.LOCAL_REGISTER);
    const { data: { auth, token } }: LocalRegisterTypes = yield call(AuthAPI.localRegisterAPI, { registerToken, username, displayName });
    
    if (!auth || !token) return;
    
    yield put(authActions.localRegister({ auth, token })); 

    const setUserData: AuthResultSubState = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
    
    yield put(userActions.setUser({ setUserData }));
    Storage.set('__pinter_user__', setUserData);
}


function* localLoginFlow() {
    const { payload: { code } }: LocalLoginTypes = yield take(AuthActionType.LOCAL_LOGIN);
    const { data: { auth, token } }: LocalLoginTypes = yield call(AuthAPI.localLoginAPI, code);
    
    if (!auth) return;
    
    yield put(authActions.localLogin({ auth, token }));

    const setUserData: AuthResultSubState = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
    
    yield put(userActions.setUser({ setUserData }));
    Storage.set('__pinter_user__', setUserData);
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

function* socialLoginFlow() {
    const { payload: { provider, history } }: SocialLoginTypes = yield take(AuthActionType.PROVIDER_LOGIN);
    const token = social[provider]();    
    const accessToken: string = yield call(getSocialToken, token);

    yield put(authActions.providerLogin({ accessToken, provider }));

    const providerSocialData: SocialResultSubState = yield select((state: StoreState) => state.auth.socialAuthResult);
    if (!providerSocialData) return;
    
    const { data: verifySocial }: SocialLoginTypes = yield call(AuthAPI.verifySocialAPI, providerSocialData);
    
    yield put(authActions.verifySocial(verifySocial));

    const verifySocialData: VerifySocialResultSubState = yield select((state: StoreState) => state.auth.verifySocialResult);
    if (!verifySocialData) return;

    const { exists } = verifySocialData;
    
    if (exists) {
        const { data: socialLogin }: SocialLoginTypes = yield call(AuthAPI.socialLoginAPI, providerSocialData);
    
        yield put(authActions.socialLogin(socialLogin));
        const socialLoginData: AuthResultSubState = yield select((state: StoreState) => state.auth.authResult);
    
        yield put(userActions.setUser({ socialLoginData }));
        Storage.set('__pinter_user__', socialLoginData);

    } else {
        const { email, username } = verifySocialData;
        if (!email || !username) return;
    
        yield put(authActions.autoRegisterForm({ email, username }));
        history.push('/register');
    }
}

function* socialRegisterFlow() {
    const { payload: { accessToken, provider, username, displayName } }: SocialRegisterTypes = yield take(AuthActionType.SOCIAL_REGISTER);
    const { data }: SocialRegisterTypes = yield call(AuthAPI.socialRegisterAPI, { accessToken, provider, username, displayName });

    yield put(authActions.socialRegister(data));

    const setUserData: AuthResultSubState = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
    
    yield put(userActions.setUser({ setUserData }));
    Storage.set('__pinter_user__', setUserData);
}

export function* authSaga() {
    yield fork(sendAuthEmailFlow);
    yield fork(codeFlow);
    yield fork(localRegisterFlow);
    yield fork(localLoginFlow);
    yield fork(socialLoginFlow);
    yield fork(socialRegisterFlow)
}