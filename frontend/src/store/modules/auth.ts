import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// import social from '../../lib/social';

export enum AuthActionType {
    SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT',
    AUTO_REGISTER_FORM = 'auth/AUTO_REGISTER_FORM',
    CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM',
    
    SEND_AUTH_EMAIL_REQUEST = 'auth/SEND_AUTH_EMAIL_REQUEST',
    SEND_AUTH_EMAIL_PENDING = 'auth/SEND_AUTH_EMAIL_PENDING',
    SEND_AUTH_EMAIL_SUCCESS = 'auth/SEND_AUTH_EMAIL_SUCCESS',
    SEND_AUTH_EMAIL_FAILING = 'auth/SEND_AUTH_EMAIL_FAILING',

    CODE_REQUEST = 'auth/CODE_REQUEST',
    CODE_SUCCESS = 'auth/CODE_SUCCESS',
    CODE_FAILING = 'auth/CODE_FAILING',

    LOCAL_REGISTER_REQUEST = 'auth/LOCAL_REGISTER_REQUEST',
    LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS',
    LOCAL_REGISTER_FAILING = 'auth/LOCAL_REGISTER_FAILING'

    /*
    LOCAL_REGISTER = 'auth/LOCAL_REGISTER',
    LOCAL_LOGIN = 'auth/LOCAL_LOGIN',
    SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER',
    SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN',
    PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN',
    VERIFY_SOCIAL = 'auth/VERIFY_SOCIAL'
    */
}

type ChangeRegisterFormPayload  = { name: string, value: string };
type AutoCompleteFormPayload = { email: string,  name: string };
type CodePayload = { email: string, registerToken: string };
type LocalRegisterRequestPayload = { registerToken?: string, username?: string, displayName?: string  };
type LocalRegisterSuccessPayload = { user: UserSubState, token: string }
export const actionCreators = {
    setEmailInput: createAction(AuthActionType.SET_EMAIL_INPUT, (value: string) => value),
    autoRegisterForm: createAction(AuthActionType.AUTO_REGISTER_FORM, (payload: AutoCompleteFormPayload) => payload),
    changeRegisterForm : createAction(AuthActionType.CHANGE_REGISTER_FORM, (payload: ChangeRegisterFormPayload) => payload),
    sendAuthEmailRequest: createAction(AuthActionType.SEND_AUTH_EMAIL_REQUEST, (email: string) => email),
    sendAuthEmailPending: createAction(AuthActionType.SEND_AUTH_EMAIL_PENDING, (sending: boolean) => sending),
    sendAuthEmailFailing: createAction(AuthActionType.SEND_AUTH_EMAIL_FAILING),
    sendAuthEmailSuccess: createAction(AuthActionType.SEND_AUTH_EMAIL_SUCCESS, (isUser: boolean) => isUser),
    codeRequest: createAction(AuthActionType.CODE_REQUEST, (code: string) => code),
    codeSuccess: createAction(AuthActionType.CODE_SUCCESS, (payload: CodePayload) => payload),
    codeFailing: createAction(AuthActionType.CODE_FAILING),
    localRegisterRequest: createAction(AuthActionType.LOCAL_REGISTER_REQUEST, (payload: LocalRegisterRequestPayload) => payload),
    localRegisterSuccess: createAction(AuthActionType.LOCAL_REGISTER_SUCCESS, (payload: LocalRegisterSuccessPayload) => payload),
    localRegisterFailing: createAction(AuthActionType.LOCAL_REGISTER_FAILING)

    /*
    code: createAction(AuthActionType.CODE, (code: string) => code),
    localRegister: createAction(AuthActionType.LOCAL_REGISTER, (payload: AuthAPI.typePayload.LocalRegisterPayload) => payload),
    localLogin: createAction(AuthActionType.LOCAL_LOGIN, (code: string) => code),
    socialRegister: createAction(AuthActionType.SOCIAL_REGISTER, (payload: AuthAPI.typePayload.SocialRegisterPayload) => payload),
    socialLogin: createAction(AuthActionType.SOCIAL_LOGIN, (payload: AuthAPI.typePayload.SocialPayload) => payload),
    providerLogin: createAction(AuthActionType.PROVIDER_LOGIN, (provider: string) =>  social[provider](), provider => provider),
    verifySocial: createAction(AuthActionType.VERIFY_SOCIAL, (payload: AuthAPI.typePayload.SocialPayload) => payload)
    */
};

type SetEmailInputAction = ReturnType<typeof actionCreators.setEmailInput>;
type ChangeRegisterFormAction = ReturnType<typeof actionCreators.changeRegisterForm>;
type AutoRegisterFormAction = ReturnType<typeof actionCreators.autoRegisterForm>;
type SendAuthEmailPendingAction = ReturnType<typeof actionCreators.sendAuthEmailPending>;
type SendAuthEmailSuccessAction = ReturnType<typeof actionCreators.sendAuthEmailSuccess>;
type CodeSuccessAction = ReturnType<typeof actionCreators.codeSuccess>;
type LocalRegisterSuccessAction = ReturnType<typeof actionCreators.localRegisterSuccess>;
/*
type CodeAction = ReturnType<typeof actionCreators.code>;
type LocalLoginAction = ReturnType<typeof actionCreators.localLogin>;
type SocialRegisterAction = ReturnType<typeof actionCreators.socialRegister>;
type SocialLoginAction = ReturnType<typeof actionCreators.socialLogin>;
type ProviderLoginAction = ReturnType<typeof actionCreators.providerLogin>;
type VerifySocialAction = ReturnType<typeof actionCreators.verifySocial>;
*/

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
        shortBio?: string
    },
    isSocial: boolean,
    registerToken?: string
    authResult: AuthResultSubState,
    socialAuthResult?: SocialResultSubState,
    verifySocialResult?: VerifySocialResultSubState
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
        shortBio: '',
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
                shortBio: ''
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
    }
}, initialState);