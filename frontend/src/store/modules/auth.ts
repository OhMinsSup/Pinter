import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { History } from 'history';

export enum AuthActionType {
    SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT',
    AUTO_REGISTER_FORM = 'auth/AUTO_REGISTER_FORM',
    CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM',

    PROVIDER_LOGIN_REQUEST = 'auth/PROVIDER_LOGIN_REQUEST',
    PROVIDER_LOGIN_SUCCESS = 'auth/PROVIDER_LOGIN_SUCCESS',
    PROVIDER_LOGIN_FAILING = 'auth/PROVIDER_LOGIN_FAILING',


    SEND_AUTH_EMAIL_REQUEST = 'auth/SEND_AUTH_EMAIL_REQUEST',
    SEND_AUTH_EMAIL_PENDING = 'auth/SEND_AUTH_EMAIL_PENDING',
    SEND_AUTH_EMAIL_SUCCESS = 'auth/SEND_AUTH_EMAIL_SUCCESS',
    SEND_AUTH_EMAIL_FAILING = 'auth/SEND_AUTH_EMAIL_FAILING',

    CODE_REQUEST = 'auth/CODE_REQUEST',
    CODE_SUCCESS = 'auth/CODE_SUCCESS',
    CODE_FAILING = 'auth/CODE_FAILING',

    LOCAL_REGISTER_REQUEST = 'auth/LOCAL_REGISTER_REQUEST',
    LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS',
    LOCAL_REGISTER_FAILING = 'auth/LOCAL_REGISTER_FAILING',

    LOCAL_LOGIN_REQUEST = 'auth/LOCAL_LOGIN_REQUEST',
    LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS',
    LOCAL_LOGIN_FAILING = 'auth/LOCAL_LOGIN_FAILING',

    SOCIAL_REGISTER_REQUEST = 'auth/SOCIAL_REGISTER_REQUEST',
    SOCIAL_REGISTER_SUCCESS = 'auth/SOCIAL_REGISTER_SUCCESS',
    SOCIAL_REGISTER_FAILING = 'auth/SOCIAL_REGISTER_FAILING',

    SOCIAL_LOGIN_REQUEST = 'auth/SOCIAL_LOGIN_REQUEST',
    SOCIAL_LOGIN_SUCCESS = 'auth/SOCIAL_LOGIN_SUCCESS',
    SOCIAL_LOGIN_FAILING = 'auth/SOCIAL_LOGIN_FAILING',

    VERIFY_SOCIAL_REQUEST = 'auth/VERIFY_SOCIAL_REQUEST',
    VERIFY_SOCIAL_SUCCESS = 'auth/VERIFY_SOCIAL_SUCCESS',
    VERIFY_SOCIAL_FAILING = 'auth/VERIFY_SOCIAL_FAILING',
}

type ChangeRegisterFormPayload  = { name: string, value: string };
type AutoCompleteFormPayload = { email: string,  name: string };
type CodePayload = { email: string, registerToken: string };
type LocalRegisterRequestPayload = { registerToken?: string, username?: string, displayName?: string  };
type LocalRegisterSuccessPayload = { user: UserSubState, token: string };
type LocalLoginRequestPayload = { code: string, history: History };
type LocalLoginSuccessPayload = { user: UserSubState, token: string };
type SocialRegisterRequestPayload = { provider?: string, accessToken?: string, displayName?: string, username?: string, socialEmail?: string };
type SocialRegisterSuccessPayload = { user: UserSubState, token: string };
type ProviderLoginRequestPayload = { provider: string, history: History };
type ProviderLoginSuccessPayload = { accessToken: string, provider: string };
type SocialLoginSuccessPayload = { user: UserSubState, token: string };
type VerifySocialSuccessPayload = { profile: { id: string, thumbnail: string ,email: string ,username: string }, exists: boolean };

export const actionCreators = {
    setEmailInput: createAction(AuthActionType.SET_EMAIL_INPUT, (value: string) => value),
    autoRegisterForm: createAction(AuthActionType.AUTO_REGISTER_FORM, (payload: AutoCompleteFormPayload) => payload),
    changeRegisterForm : createAction(AuthActionType.CHANGE_REGISTER_FORM, (payload: ChangeRegisterFormPayload) => payload),

    providerLoginRequest: createAction(AuthActionType.PROVIDER_LOGIN_REQUEST, (payload: ProviderLoginRequestPayload) => payload),
    providerLoginSuccess: createAction(AuthActionType.PROVIDER_LOGIN_SUCCESS, (payload: ProviderLoginSuccessPayload) => payload),
    providerLoginFailing: createAction(AuthActionType.PROVIDER_LOGIN_FAILING),

    sendAuthEmailRequest: createAction(AuthActionType.SEND_AUTH_EMAIL_REQUEST, (email: string) => email),
    sendAuthEmailPending: createAction(AuthActionType.SEND_AUTH_EMAIL_PENDING, (sending: boolean) => sending),
    sendAuthEmailFailing: createAction(AuthActionType.SEND_AUTH_EMAIL_FAILING),
    sendAuthEmailSuccess: createAction(AuthActionType.SEND_AUTH_EMAIL_SUCCESS, (isUser: boolean) => isUser),

    codeRequest: createAction(AuthActionType.CODE_REQUEST, (code: string) => code),
    codeSuccess: createAction(AuthActionType.CODE_SUCCESS, (payload: CodePayload) => payload),
    codeFailing: createAction(AuthActionType.CODE_FAILING),

    localRegisterRequest: createAction(AuthActionType.LOCAL_REGISTER_REQUEST, (payload: LocalRegisterRequestPayload) => payload),
    localRegisterSuccess: createAction(AuthActionType.LOCAL_REGISTER_SUCCESS, (payload: LocalRegisterSuccessPayload) => payload),
    localRegisterFailing: createAction(AuthActionType.LOCAL_REGISTER_FAILING),

    localLoginRequest: createAction(AuthActionType.LOCAL_LOGIN_REQUEST, (payload: LocalLoginRequestPayload) => payload),
    localLoginSuccess: createAction(AuthActionType.LOCAL_LOGIN_SUCCESS, (payload: LocalLoginSuccessPayload) => payload),
    localLoginFailing: createAction(AuthActionType.LOCAL_LOGIN_FAILING),

    socialRegisterRequest: createAction(AuthActionType.SOCIAL_REGISTER_REQUEST, (payload: SocialRegisterRequestPayload) => payload),
    socialRegisterSuccess: createAction(AuthActionType.SOCIAL_REGISTER_SUCCESS, (payload: SocialRegisterSuccessPayload) => payload),
    socialRegisterFailing: createAction(AuthActionType.SOCIAL_REGISTER_FAILING),

    socialLoginSuccess: createAction(AuthActionType.SOCIAL_LOGIN_SUCCESS, (payload: SocialLoginSuccessPayload) => payload),
    socialLoginFailing: createAction(AuthActionType.SOCIAL_LOGIN_FAILING),
    
    verifySocialSuccess: createAction(AuthActionType.VERIFY_SOCIAL_SUCCESS, (payload: VerifySocialSuccessPayload) => payload),
    verifySocialFailing: createAction(AuthActionType.VERIFY_SOCIAL_FAILING)

};

type SetEmailInputAction = ReturnType<typeof actionCreators.setEmailInput>;
type ChangeRegisterFormAction = ReturnType<typeof actionCreators.changeRegisterForm>;
type AutoRegisterFormAction = ReturnType<typeof actionCreators.autoRegisterForm>;
type SendAuthEmailPendingAction = ReturnType<typeof actionCreators.sendAuthEmailPending>;
type SendAuthEmailSuccessAction = ReturnType<typeof actionCreators.sendAuthEmailSuccess>;
type CodeSuccessAction = ReturnType<typeof actionCreators.codeSuccess>;
type LocalRegisterSuccessAction = ReturnType<typeof actionCreators.localRegisterSuccess>;
type LocalLoginSuccessAction = ReturnType<typeof actionCreators.localLoginSuccess>;
type SocialRegisterSuccessAction = ReturnType<typeof actionCreators.socialRegisterSuccess>;
type ProviderLoginSuccessAction = ReturnType<typeof actionCreators.providerLoginSuccess>;
type SocialLoginSuccessAction = ReturnType<typeof actionCreators.socialLoginSuccess>;
type VerifySocialSuccessAction = ReturnType<typeof actionCreators.verifySocialSuccess>;

export type SocialResultSubState = {
    accessToken?: string
    provider?: string
}

export type VerifySocialResultSubState = {
    id?: string
    thumbnail?: string
    email?: string
    username?: string
    exists?: boolean
}

export type UserSubState = {
    id?: string
    username?: string
    displayName?: string
    thumbnail?: null | string
}

export type AuthResultSubState = {
    user: UserSubState
    token: string
}

export type AuthState = {
    email: string,
    sending: boolean,
    sendEmail: boolean,
    isUser: boolean,
    registerForm: {
        displayName?: string,
        email?: string,
        username?: string,
    },
    isSocial: boolean,
    registerToken?: string
    authResult: AuthResultSubState,
    socialAuthResult: SocialResultSubState,
    verifySocialResult: VerifySocialResultSubState
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
};

export default handleActions<AuthState, any>({
    [AuthActionType.SET_EMAIL_INPUT]: (state, action: SetEmailInputAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.email = action.payload;
        });
    },
    [AuthActionType.CHANGE_REGISTER_FORM]: (state, action: ChangeRegisterFormAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.registerForm[action.payload.name] = action.payload.value;
        });
    },
    [AuthActionType.AUTO_REGISTER_FORM]: (state, action: AutoRegisterFormAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.registerForm = {
                displayName: action.payload.name,
                email: action.payload.email,
                username: '',
            }
            draft.isSocial = true;
        });
    },
    [AuthActionType.SEND_AUTH_EMAIL_PENDING]: (state, action: SendAuthEmailPendingAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.sending = action.payload
        })
    },
    [AuthActionType.SEND_AUTH_EMAIL_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.sending = false;
            draft.sendEmail = false;
            draft.isUser = false;
            draft.email = '';
        })
    },
    [AuthActionType.SEND_AUTH_EMAIL_SUCCESS]: (state, action: SendAuthEmailSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { payload: isUser } = action;
            draft.sendEmail = true;
            draft.isUser = isUser;
        })
    },
    [AuthActionType.CODE_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        })
    },  
    [AuthActionType.CODE_SUCCESS]: (state, action: CodeSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { payload: { email, registerToken } } = action;
            draft.registerForm.email = email;
            draft.registerToken = registerToken;
        })
    },
    [AuthActionType.LOCAL_REGISTER_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        })
    },
    [AuthActionType.LOCAL_REGISTER_SUCCESS]: (state, action: LocalRegisterSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.authResult = {
                user: action.payload.user,
                token: action.payload.token
            }
        })
    },
    [AuthActionType.LOCAL_LOGIN_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [AuthActionType.LOCAL_LOGIN_SUCCESS]: (state, action: LocalLoginSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.authResult = {
                user: action.payload.user,
                token: action.payload.token
            }
        });
    },
    [AuthActionType.SOCIAL_REGISTER_SUCCESS]: (state, action: SocialRegisterSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.authResult = {
                user: action.payload.user,
                token: action.payload.token
            }
        });
    },
    [AuthActionType.SOCIAL_REGISTER_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [AuthActionType.PROVIDER_LOGIN_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [AuthActionType.PROVIDER_LOGIN_SUCCESS]: (state, action: ProviderLoginSuccessAction) => {
        return produce(state, (draft) => {
            if(action.payload === undefined) return;
            draft.socialAuthResult = {
                accessToken: action.payload.accessToken,
                provider: action.payload.provider
            }
        });
    },
    [AuthActionType.SOCIAL_LOGIN_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [AuthActionType.SOCIAL_LOGIN_SUCCESS]: (state, action: SocialLoginSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.authResult = {
                user: action.payload.user,
                token: action.payload.token
            }
        });
    },
    [AuthActionType.VERIFY_SOCIAL_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [AuthActionType.VERIFY_SOCIAL_SUCCESS]: (state, action: VerifySocialSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { profile, exists } = action.payload;
            draft.verifySocialResult = {
                id: profile.id,
                username: profile.username,
                thumbnail: profile.thumbnail,
                email: profile.email,
                exists: exists
            }
        });
    }
}, initialState);