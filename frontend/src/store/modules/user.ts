import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export enum UserActionType {
    CHECK_USER = 'user/CHECK_USER',
    SET_USER = 'user/SET_USER',
    PROCESS = 'user/PROCESS',
    LOGOUT = 'user/LOGOUT'
}

export const actionCreators = {
    checkUser: createAction(UserActionType.CHECK_USER),
    setUser: createAction(UserActionType.SET_USER),
    process: createAction(UserActionType.PROCESS),
    logout: createAction(UserActionType.LOGOUT)
}

export type CheckUserAction = ReturnType<typeof actionCreators.checkUser>;
export type SetUserAction = ReturnType<typeof actionCreators.setUser>;
export type ProcessAction = ReturnType<typeof actionCreators.process>;
export type LogoutAction = ReturnType<typeof actionCreators.logout>;

const UserSubrecord = Record({
    id: '',
    username: '',
    displayName: '',
    thumbnail: null,
});

const UserRecord = Record({
    user: null,
    processed: false,
});

export interface UserSubState {
    id?: string
    username?: string
    displayName?: string
    thumbnail?: null | string
}

export interface UserRecordState {
    user: null | UserSubState
    processed: boolean
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

export class UserRecordData extends UserRecord {
    public user: null | UserSubData;
    public processed: boolean;

    constructor(params?: UserSubState) {
        params ? super({ ...params }) : super()
    }
}

const initialState = new UserRecordData();

export default handleActions<UserRecordData, any>({
    [UserActionType.SET_USER]: (state, action: SetUserAction): UserRecordData => {
        const { payload: user } = action;
        return state.set('user', UserSubrecord(user)) as UserRecordData;
    },
    [UserActionType.PROCESS]: (state, action: ProcessAction): UserRecordData => {
        return state.set('processed', true) as UserRecordData;
    }
}, initialState)