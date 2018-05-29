import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import * as authAPI from '../../lib/api/auth';

const SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT';
const SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL';
const CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM';
const CODE = 'auth/CODE';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';

type ChangeRegisterFormPayload = { name: string, value: string };

export const actionCreators = {
    setEmailInput: createAction(SET_EMAIL_INPUT, (value: string) => value),
    sendAuthEmail: createAction(SEND_AUTH_EMAIL, authAPI.sendAuthEmailAPI),
    changeRegisterForm : createAction(CHANGE_REGISTER_FORM, (payload: ChangeRegisterFormPayload) => payload),
    code: createAction(CODE, authAPI.codeAPI),
    localRegister: createAction(LOCAL_REGISTER, authAPI.localRegisterAPI),
    localLogin: createAction(LOCAL_LOGIN, authAPI.localLoginAPI)
};

export type SetEmailInputAction = ReturnType<typeof actionCreators.setEmailInput>;
export type SendAuthEmailAction = ReturnType<typeof actionCreators.sendAuthEmail>;
export type ChangeRegisterFormAction = ReturnType<typeof actionCreators.changeRegisterForm>;
export type CodeAction = ReturnType<typeof actionCreators.code>;
export type LocalRegisterAction = ReturnType<typeof actionCreators.localRegister>;
export type LocalLoginAction = ReturnType<typeof actionCreators.localLogin>;

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

const AuthRecord = Record(({
    email: '',
    sendEmail: false,
    isUser: false,
    registerForm: RegisterFormSubrecord(),
    registerToken: '',
    authResult: null,
}));

export interface RegisterFormSubState {
    displayName?: string
    email?: string
    username?: string
}

export interface UserSubState {
    id?: string
    username?: string
    displayName?: string
    thumbnail: null | string
}

export interface AuthResultSubState {
    user: UserSubState
    token?: string
}

export interface AuthRecordState {
    email?: string
    sendEmail?: boolean
    isUser?: boolean
    registerForm: RegisterFormSubState
    registerToken?: string
    authResult: null | AuthResultSubState
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
    public thumbnail: null | string

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
    public sendEmail: boolean;
    public isUser: boolean;
    public registerForm: RegisterFormSubData
    public registerToken?: string
    public authResult: null | AuthResultSubData

    constructor(params?: AuthResultSubState) {
        params ? super({ ...params }) : super()
    }
}

const initialState = new AuthRecordData();

export default handleActions<AuthRecordData, any>({
    [SET_EMAIL_INPUT]: (state, action: SetEmailInputAction): AuthRecordData => {
        const { payload: value } = action;
        return state.set('email', value) as AuthRecordData;
    }
}, initialState);



/*

export type registerFormSubState = {
    displayName?: string,
    email?: string,
    username?: string
}

export type UserSubState = {
    id?: string,
    username?: string,
    displayName?: string,
    thumbnail: null | string
}

export type AuthResultSubState = {
    user: UserSubState,
    token?: string
}

export type AuthRecordState = {
    email?: string,
    sendEmail?: boolean,
    isUser?: boolean,
    registerForm: registerFormSubState,
    registerToken?: string,
    authResult: null | AuthResultSubState
}

export type Auth = {
    email?: string;
    sendEmail?: boolean;
    isUser?: boolean;
    registerForm: {
        displayName?: string,
        email?: string,
        username?: string
    };
    registerToken?: string;
    authResult: null | {
        user: {
            id?: string,
            username?: string,
            displayName?: string,
            thumbnail: null | string
        }
        token?: string
    };
}

*/