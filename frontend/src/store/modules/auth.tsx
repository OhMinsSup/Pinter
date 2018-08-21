import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as soicalAuth from '../../lib/social';
import * as AuthAPI from '../../lib/API/auth';

const SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT';
const SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL';
const CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM';
const GET_CODE = 'auth/GET_CODE';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER';
const VERIFY_SOCIAL = 'auth/VERIFY_SOCIAL';

type ChangeRegisterFormPayload  = { name: string, value: string };

export const authCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
    sendAuthEmail: createPromiseThunk(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmailAPI),
    changeRegisterForm: createAction(CHANGE_REGISTER_FORM, (payload: ChangeRegisterFormPayload) => payload),
    getCode: createPromiseThunk(GET_CODE, AuthAPI.getCodeAPI),
    localRegister: createPromiseThunk(LOCAL_REGISTER, AuthAPI.localRegisterAPI),
    localLogin: createPromiseThunk(LOCAL_LOGIN, AuthAPI.localLoginAPI),
    providerLogin: createAction(PROVIDER_LOGIN, (provider: string) => soicalAuth[provider](), (provider: string) => provider),
    socialLogin: createPromiseThunk(SOCIAL_LOGIN, AuthAPI.socialLoginAPI),
    socialRegister: createPromiseThunk(SOCIAL_REGISTER, AuthAPI.socialRegisterAPI),
    verifySocial: createPromiseThunk(VERIFY_SOCIAL, AuthAPI.verifySocialAPI),
}

type SetEmailInputAction = ReturnType<typeof authCreators.setEmailInput>;
type ChangeRegisterFormAction = ReturnType<typeof authCreators.changeRegisterForm>;
type SendAuthEmailAction = GenericResponseAction<{ isUser: boolean }, string>;
type GetCodeAction = GenericResponseAction<{ email: string, registerToken: string }, string>;
type LocalRegisterAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type LocalLoginAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type ProviderLoginAction = ReturnType<typeof authCreators.providerLogin>;
type SocialLoginAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type SocialRegisterAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type VerifySocialAction = GenericResponseAction<{ profile: { id: string, thumbnail: string ,email: string ,username: string }, exists: boolean }, string>; 

export type SocialResultSubState = {
    accessToken: string
    provider: string
}

export type VerifySocialResultSubState = {
    id: string
    thumbnail: string
    email: string
    username: string
    exists: boolean
}

export interface UserSubState {
    id: string
    username: string
    displayName: string
    thumbnail: null | string
}

export interface AuthResultSubState {
    user: UserSubState
    token: string
}

export interface AuthState {
    email: string;
    sending: boolean;
    sendEmail: boolean;
    isUser: boolean;
    registerForm: {
        displayName?: string,
        email?: string,
        username?: string,
    },
    isSocial: boolean;
    registerToken: string;
    authResult: AuthResultSubState;
    socialAuthResult: SocialResultSubState;
    verifySocialResult: VerifySocialResultSubState;
}

const initialState: AuthState = {
    email: '',
    sending: false,
    sendEmail: false,
    isUser: false,
    registerForm: {
        displayName: '',
        email: '',
        username: '',
    },
    isSocial: false,
    registerToken: '',
    authResult: {
        user: {
            id: '',
            username: '',
            displayName: '',
            thumbnail: null
        },
        token: ''
    },
    socialAuthResult: {
        accessToken: '',
        provider: ''
    },
    verifySocialResult: {
        id: '',
        thumbnail: '',
        email: '',
        username: '',
        exists: false,
    }
}

export default handleActions<AuthState, any>({
    [SET_EMAIL_INPUT]: (state, action: SetEmailInputAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.email = action.payload;
        })
    },
    SEND_AUTH_EMAIL_PENDING: (state) => {
        return produce(state, (draft) => {
            draft.sending = true;
        })
    },
    SEND_AUTH_EMAIL_SUCCESS: (state, action: SendAuthEmailAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.sendEmail = true;
            draft.isUser = data.isUser;
        })
    },
    SEND_AUTH_EMAIL_ERROR: (state) => {
        return produce(state, (draft) => {
            draft.isUser = false;
            draft.email = '';
            draft.sending = false;
            draft.sendEmail = false;
        })
    },
    [CHANGE_REGISTER_FORM]: (state, action: ChangeRegisterFormAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.registerForm[action.payload.name] = action.payload.value;
        })
    },
    [GET_CODE]: (state, action: GetCodeAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.registerForm.email = data.email;
            draft.registerToken = data.registerToken;
        })
    },
    LOCAL_REGISTER_SUCCESS: (state, action: LocalRegisterAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    LOCAL_LOGIN_SUCCESS: (state, action: LocalLoginAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    [PROVIDER_LOGIN]: (state, action: ProviderLoginAction) => {
        return produce(state, (draft) => {
            if (action === undefined) return;
            const { payload: response, meta: provider } = action;
            draft.socialAuthResult = {
                accessToken: response,
                provider: provider
            }
        });
    },
    SOCIAL_LOGIN_SUCCESS: (state, action: SocialLoginAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    SOCIAL_REGISTER_SUCCESS: (state, action: SocialRegisterAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        })
    },
    VERIFY_SOCIAL_SUCCESS: (state, action: VerifySocialAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.verifySocialResult = {
                id: data.profile.id,
                username: data.profile.username,
                thumbnail: data.profile.thumbnail,
                email: data.profile.email,
                exists: data.exists
            }
        })
    } 
}, initialState);