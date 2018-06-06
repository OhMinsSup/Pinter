import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export enum AuthActionType {
    SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT',
    SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL',
    CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM',
    CODE = 'auth/CODE',
    LOCAL_REGISTER = 'auth/LOCAL_REGISTER',
    LOCAL_LOGIN = 'auth/LOCAL_LOGIN',
    AUTO_REGISTER_FORM = 'auth/AUTO_REGISTER_FORM',
    SOCIAL_REGISTER = 'auth/SOCIAL_REGISTER',
    SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN',
    PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN',
    VERIFY_SOCIAL = 'auth/VERIFY_SOCIAL'
}

export const actionCreators = {
    setEmailInput: createAction(AuthActionType.SET_EMAIL_INPUT, (value: string) => value),
    sendAuthEmail: createAction(AuthActionType.SEND_AUTH_EMAIL),
    changeRegisterForm : createAction(AuthActionType.CHANGE_REGISTER_FORM),
    code: createAction(AuthActionType.CODE),
    localRegister: createAction(AuthActionType.LOCAL_REGISTER),
    localLogin: createAction(AuthActionType.LOCAL_LOGIN),
    autoRegisterForm: createAction(AuthActionType.AUTO_REGISTER_FORM),
    socialRegister: createAction(AuthActionType.SOCIAL_REGISTER),
    socialLogin: createAction(AuthActionType.SOCIAL_LOGIN),
    providerLogin: createAction(AuthActionType.PROVIDER_LOGIN),
    verifySocial: createAction(AuthActionType.VERIFY_SOCIAL)
};

export type SetEmailInputAction = ReturnType<typeof actionCreators.setEmailInput>;
export type SendAuthEmailAction = ReturnType<typeof actionCreators.sendAuthEmail>;
export type ChangeRegisterFormAction = ReturnType<typeof actionCreators.changeRegisterForm>;
export type CodeAction = ReturnType<typeof actionCreators.code>;
export type LocalRegisterAction = ReturnType<typeof actionCreators.localRegister>;
export type LocalLoginAction = ReturnType<typeof actionCreators.localLogin>;
export type AutoRegisterFormAction = ReturnType<typeof actionCreators.autoRegisterForm>;
export type SocialRegisterAction = ReturnType<typeof actionCreators.socialRegister>;
export type SocialLoginAction = ReturnType<typeof actionCreators.socialLogin>;
export type ProviderLoginAction = ReturnType<typeof actionCreators.providerLogin>;
export type VerifySocialAction = ReturnType<typeof actionCreators.verifySocial>;

const UserSubrecord = Record({
    id: '',
    username: '',
    displayName: '',
    thumbnail: null
});
  
const AuthResultSubrecord = Record({
    user: UserSubrecord(),
    token: ''
});
  
const RegisterFormSubrecord = Record({
    displayName: '',
    email: '',
    username: ''
});

const socialResultSubRecord = Record({
    accessToken: '',
    provider: ''
});

const verifySocialResultSubrecord = Record({
    id: '',
    thumbnail: '',
    email: '',
    username: '',
    exists: false,
});

const AuthRecord = Record(({
    email: '',
    sending: false,
    sendEmail: false,
    isUser: false,
    registerForm: RegisterFormSubrecord(),
    registerToken: '',
    authResult: null,
    isSocial: false,
    socialAuthResult: null,
    verifySocialResult: null
}));

export interface SocialResultSubState {
    accessToken: string
    provider: string
}

export interface VerifySocialResultSubState {
    id: string
    thumbnail: string
    email: string
    username: string
    exists: boolean
}

export interface RegisterFormSubState {
    displayName: string
    email: string
    username: string
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

export interface AuthRecordState {
    email: string
    sending: boolean
    sendEmail: boolean
    isUser: boolean
    registerForm: RegisterFormSubState
    registerToken: string
    authResult: AuthResultSubState,
    isSocial: false,
    socialAuthResult: SocialResultSubState,
    verifySocialResult: VerifySocialResultSubState
}

export class SocialResultSubData extends socialResultSubRecord {
    public accessToken: string;
    public provider: string;

    constructor(params?: SocialResultSubState) {
        params ? super({ ...params }) : super()
    }
}

export class VerifySocialResultSubData extends verifySocialResultSubrecord {
    public id: string;
    public thumbnail: string;
    public email: string;
    public username: string;
    public exists: boolean;

    constructor(params?: VerifySocialResultSubState) {
        params ? super({ ...params }) : super()
    }
}

export class RegisterFormSubData extends RegisterFormSubrecord {
    public displayName: string;
    public email: string;
    public username: string;

    constructor(params?: RegisterFormSubState) {
        params ? super({ ...params }) : super()
    }
}

export class UserSubData extends UserSubrecord {
    public id: string;
    public username: string;
    public displayName: string;
    public thumbnail: null | string;

    constructor(params?: UserSubState) {
        params ? super({ ...params }) : super()
    }
}

export class AuthResultSubData extends AuthResultSubrecord {
    public user: UserSubData;
    public token: string;

    constructor(params?: AuthResultSubState) {
        params ? super({ ...params }) : super()
    }
}

export class AuthRecordData extends AuthRecord {
    public email: string;
    public sending: boolean;
    public sendEmail: boolean;
    public isUser: boolean;
    public registerForm: RegisterFormSubData;
    public registerToken?: string;
    public authResult: AuthResultSubData;
    public socialAuthResult: SocialResultSubData;
    public verifySocialResult: VerifySocialResultSubData;

    constructor(params?: AuthResultSubState) {
        params ? super({ ...params }) : super()
    }
}

const initialState = new AuthRecordData();

export default handleActions<AuthRecordData, any>({
    [AuthActionType.SET_EMAIL_INPUT]: (state, action: SetEmailInputAction): AuthRecordData => {
        const { payload: value } = action;
        return state.set('email', value) as AuthRecordData;
    },
    // api
    [AuthActionType.SEND_AUTH_EMAIL]: (state, action: SendAuthEmailAction): AuthRecordData => {
        const { payload: { isUser } } = action;
        return state.set('sendEmail', isUser ? true : false)
                    .set('isUser', isUser) 
                    .set('sending', true) as AuthRecordData;
    },
    [AuthActionType.CHANGE_REGISTER_FORM]: (state, action: ChangeRegisterFormAction): AuthRecordData => {
        const { name, value } = action.payload;
        return state.setIn(['registerForm', name], value) as AuthRecordData;
    },
    [AuthActionType.AUTO_REGISTER_FORM]: (state, action: AutoRegisterFormAction): AuthRecordData => {
        const { email, username } = action.payload;
        const registerForm = RegisterFormSubrecord({ displayName: username, email });
        return state.withMutations(
            s => s.set('registerForm', registerForm).set('isSocial', true),
        ) as AuthRecordData;
    },
    // api
    [AuthActionType.CODE]: (state, action: CodeAction): AuthRecordData => {
        const { email , registerToken } =  action.payload;
        return state.setIn(['registerForm','email'], email).set('registerToken', registerToken) as AuthRecordData;
    },
    // api
    [AuthActionType.LOCAL_REGISTER]: (state, action: LocalRegisterAction): AuthRecordData => {        
        const { auth, token } = action.payload;
        return state.set('authResult', AuthResultSubrecord({
            user: UserSubrecord(auth),
            token
        })) as AuthRecordData;
    },
    // api
    [AuthActionType.LOCAL_LOGIN]: (state, action: LocalLoginAction): AuthRecordData => {
        const { auth, token } = action.payload;        
        return state.set('authResult', AuthResultSubrecord({
            user: UserSubrecord(auth),
            token
        })) as AuthRecordData;
    },
    // api
    [AuthActionType.SOCIAL_REGISTER]: (state, action: SocialRegisterAction): AuthRecordData => {
        const { auth, token } = action.payload;      
        return state.set('authResult', AuthResultSubrecord({
            user: UserSubrecord(auth),
            token
        })) as AuthRecordData;
    },
    // api
    [AuthActionType.SOCIAL_LOGIN]: (state, action: SocialLoginAction): AuthRecordData => {
        const { auth, token } = action.payload;
        return state.set('authResult', AuthResultSubrecord({
            user: UserSubrecord(auth),
            token
        })) as AuthRecordData;
    },
    // api
    [AuthActionType.PROVIDER_LOGIN]: (state, { payload }: ProviderLoginAction): AuthRecordData => {  
        console.log(payload);
        
        if (!payload) return state; 
        return state.set('socialAuthResult', socialResultSubRecord({
            accessToken: payload.accessToken,
            provider: payload.provider
        })) as AuthRecordData;
    },
    // api
    [AuthActionType.VERIFY_SOCIAL]: (state, action: VerifySocialAction): AuthRecordData => {        
        const { profile, exists } = action.payload;
        const { id, thumbnail, email, username } = profile;
        return state.set('verifySocialResult', verifySocialResultSubrecord({
            id, thumbnail, email, username, exists
        })) as AuthRecordData;
    }
}, initialState);

