import { call, put, fork, take, select } from 'redux-saga/effects';
import * as AuthAPI from '../lib/api/auth';
import { StoreState } from '../store/modules'
import { AuthActionType, actionCreators as authActions } from '../store/modules/auth';
import { actionCreators as userActions} from '../store/modules/user';
import Storage from '../lib/storage';
import social from '../lib/social';

function* sendAuthEmailFlow() {
    const { payload: email } = yield take(AuthActionType.SEND_AUTH_EMAIL);
    const response = yield call(AuthAPI.sendAuthEmailAPI, email);
    const { data: { isUser } } = response; 
    
    if (!isUser) return
    yield put(authActions.sendAuthEmail({ isUser }));
}

function* codeFlow() {
    const { payload: code } = yield take(AuthActionType.CODE);
    const response = yield call(AuthAPI.codeAPI, code);

    const { data: { email, registerToken } } = response;

    if (!email || !registerToken) return;

    yield put(authActions.code({ email, registerToken }));
}


function* localRegisterFlow () {
    const { payload: registerPayload } = yield take(AuthActionType.LOCAL_REGISTER);
    const response = yield call(AuthAPI.localRegisterAPI, registerPayload);

    const { data: { auth, token } } = response;

    if (!auth || !token) return;
    
    yield put(authActions.localRegister({ auth, token })); 

    const setUserData = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
        
    yield put(userActions.setUser({ setUserData }))

    Storage.set('__pinter_user__', setUserData);
}


function* localLoginFlow() {
    const { payload: code } = yield take(AuthActionType.LOCAL_LOGIN);
    
    const response = yield call(AuthAPI.localLoginAPI, code);
    const { data: { auth, token } } = response;
    
    if (!auth) return;
    
    yield put(authActions.localLogin({ auth, token }));

    const setUserData = yield select((state: StoreState) => state.auth.authResult.user);
    if (!setUserData) return;
    
    yield put(userActions.setUser({ setUserData }))

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

function* SocialLoginFlow() {
    const { payload: provider } = yield take(AuthActionType.PROVIDER_LOGIN);
    const token = social[provider]();
    
    const response = yield call(getSocialToken, token);

    const providerPayload = {
        response,
        provider
    };

    yield put(authActions.providerLogin(providerPayload));

    const providerSocialData = yield select((state: StoreState) => state.auth.socialAuthResult);

    if (!providerSocialData) return;

    const verifySocialreResponse = yield call(AuthAPI.verifySocialAPI, providerSocialData);
    console.log(verifySocialreResponse);
    
    // yield put(authActions.verifySocial({ socialAccessToken, socialProvider }));
}

export function* authSaga() {
    yield fork(sendAuthEmailFlow);
    yield fork(codeFlow);
    yield fork(localRegisterFlow);
    yield fork(localLoginFlow);
    yield fork(SocialLoginFlow);
}