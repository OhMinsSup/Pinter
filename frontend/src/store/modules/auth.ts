import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export enum AuthActionType {
    SET_EMAIL_INPUT = 'auth/SET_EMAIL_INPUT',
    SEND_AUTH_EMAIL = 'auth/SEND_AUTH_EMAIL',
    CHANGE_REGISTER_FORM = 'auth/CHANGE_REGISTER_FORM',
    CODE = 'auth/CODE',
    LOCAL_REGISTER = 'auth/LOCAL_REGISTER',
    LOCAL_LOGIN = 'auth/LOCAL_LOGIN',
}

export const actionCreators = {
    setEmailInput: createAction(AuthActionType.SET_EMAIL_INPUT, (value: string) => value),
    sendAuthEmail: createAction(AuthActionType.SEND_AUTH_EMAIL),
    changeRegisterForm : createAction(AuthActionType.CHANGE_REGISTER_FORM),
    code: createAction(AuthActionType.CODE),
    localRegister: createAction(AuthActionType.LOCAL_REGISTER),
    localLogin: createAction(AuthActionType.LOCAL_LOGIN)
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
    thumbnail?: null | string
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
    public sendEmail: boolean;
    public isUser: boolean;
    public registerForm: RegisterFormSubData
    public registerToken?: string
    public authResult: null | AuthResultSubData

    constructor(params?: AuthResultSubState) {
        console.log({...params});
        params ? super({ ...params }) : super()
    }
}

const initialState = new AuthRecordData();

export default handleActions<AuthRecordData, any>({
    [AuthActionType.SET_EMAIL_INPUT]: (state, action: SetEmailInputAction): AuthRecordData => {
        const { payload: value } = action;
        return state.set('email', value) as AuthRecordData;
    },
    [AuthActionType.SEND_AUTH_EMAIL]: (state, action: SendAuthEmailAction): AuthRecordData => {
        const { payload: { data } } = action;
        return state.set('sendEmail', true)
                    .set('isUser', data) as AuthRecordData;
    }
}, initialState);

