import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction, GenericAction } from '../../lib/common';
import * as AuthAPI from '../../lib/API/auth';
import social from '../../lib/social';

const SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT';

const SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL';
const SEND_AUTH_EMAIL_PENDING = 'auth/SEND_AUTH_EMAIL_PENDING';
const SEND_AUTH_EMAIL_SUCCESS = 'auth/SEND_AUTH_EMAIL_SUCCESS';
const SEND_AUTH_EMAIL_ERROR = 'auth/SEND_AUTH_EMAIL_ERROR';

const AUTO_REGISTER_FORM = 'auth/AUTO_REGISTER_FORM';
const CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM';

const GET_CODE = 'auth/GET_CODE';
const GET_CODE_SUCCESS = 'auth/GET_CODE_SUCCESS';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS';

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS';

const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN';
const PROVIDER_LOGIN_SUCCESS = 'auth/PROVIDER_LOGIN_SUCCESS';
const PROVIDER_LOGIN_TYPE = 'auth/PROVIDER_LOGIN_TYPE';

const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const SOCIAL_LOGIN_SUCCESS = 'auth/SOCIAL_LOGIN_SUCCESS';

const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER';
const SOCIAL_REGISTER_SUCCESS = 'auth/SOCIAL_REGISTER_SUCCESS';

const VERIFY_SOCIAL = 'auth/VERIFY_SOCIAL';
const VERIFY_SOCIAL_SUCCESS = 'auth/VERIFY_SOCIAL_SUCCESS';

type ChangeRegisterFormPayload  = { name: string, value: string };
type AutoCompleteFormPayload = { email: string,  username: string };

export const authCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
    autoRegisterForm: createAction(AUTO_REGISTER_FORM, (payload: AutoCompleteFormPayload) => payload),
    sendAuthEmail: createPromiseThunk(SEND_AUTH_EMAIL, AuthAPI.sendAuthEmailAPI),
    changeRegisterForm: createAction(CHANGE_REGISTER_FORM, (payload: ChangeRegisterFormPayload) => payload),
    getCode: createPromiseThunk(GET_CODE, AuthAPI.getCodeAPI),
    localRegister: createPromiseThunk(LOCAL_REGISTER, AuthAPI.localRegisterAPI),
    localLogin: createPromiseThunk(LOCAL_LOGIN, AuthAPI.localLoginAPI),
    providerLoginType: createAction(PROVIDER_LOGIN_TYPE, (provider: string) => provider),
    providerLogin: createPromiseThunk(PROVIDER_LOGIN, (provider: string) => social[provider]()),
    socialLogin: createPromiseThunk(SOCIAL_LOGIN, AuthAPI.socialLoginAPI),
    socialRegister: createPromiseThunk(SOCIAL_REGISTER, AuthAPI.socialRegisterAPI),
    verifySocial: createPromiseThunk(VERIFY_SOCIAL, AuthAPI.verifySocialAPI),
}

type SetEmailInputAction = ReturnType<typeof authCreators.setEmailInput>;
type ChangeRegisterFormAction = ReturnType<typeof authCreators.changeRegisterForm>;
type ProviderLoginTypeAction = ReturnType<typeof authCreators.providerLoginType>;
type SendAuthEmailAction = GenericResponseAction<{ isUser: boolean }, string>;
type GetCodeAction = GenericResponseAction<{ email: string, registerToken: string }, string>;
type LocalRegisterAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type LocalLoginAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type ProviderLoginAction = GenericAction<string, string>;
type SocialLoginAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type SocialRegisterAction = GenericResponseAction<{ user: UserSubState, token: string }, string>;
type VerifySocialAction = GenericResponseAction<{ profile: { id: string, thumbnail: string ,email: string ,username: string }, exists: boolean }, string>; 
type AutoRegisterFormAction = ReturnType<typeof authCreators.autoRegisterForm>;

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
    [SEND_AUTH_EMAIL_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.sending = true;
        })
    },
    [SEND_AUTH_EMAIL_SUCCESS]: (state, action: SendAuthEmailAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.sendEmail = true;
            draft.isUser = data.isUser;
        })
    },
    [SEND_AUTH_EMAIL_ERROR]: (state) => {
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
    [GET_CODE_SUCCESS]: (state, action: GetCodeAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.registerForm.email = data.email;
            draft.registerToken = data.registerToken;
        })
    },
    [LOCAL_REGISTER_SUCCESS]: (state, action: LocalRegisterAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    [LOCAL_LOGIN_SUCCESS]: (state, action: LocalLoginAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    [PROVIDER_LOGIN_SUCCESS]: (state, action: ProviderLoginAction) => {
        return produce(state, (draft) => {            
            if (action === undefined) return;
            const { payload: response } = action;
            draft.socialAuthResult.accessToken =response;
        });
    },
    [PROVIDER_LOGIN_TYPE]: (state, action: ProviderLoginTypeAction) => {
        return produce(state, (draft) => {
            const { payload: provider } = action;
            if (action.payload === undefined) return;
            draft.socialAuthResult.provider = provider as string;
        })
    },
    [SOCIAL_LOGIN_SUCCESS]: (state, action: SocialLoginAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        });
    },
    [SOCIAL_REGISTER_SUCCESS]: (state, action: SocialRegisterAction) => {
        return produce(state, (draft) => {
            const { payload: { data } } = action;
            if (data === undefined) return;
            draft.authResult = {
                user: data.user,
                token: data.token
            }
        })
    },
    [VERIFY_SOCIAL_SUCCESS]: (state, action: VerifySocialAction) => {
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
    },
    [AUTO_REGISTER_FORM]: (state, action: AutoRegisterFormAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.registerForm = {
                displayName: '',
                email: action.payload.email,
                username: action.payload.username,
            }
            draft.isSocial = true;
        });
    },
}, initialState);