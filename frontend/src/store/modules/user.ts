import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { Dispatch } from 'redux';
import { GenericResponseAction } from '../../lib/common';
import * as UserAPI from '../../lib/api/user';

export enum UserActionType {
    CHECK_USER_SUCCESS = 'user/CHECK_USER_SUCCESS',
    CHECK_USER_FAILING = 'user/CHECK_USER_FAILING',
    SET_USER = 'user/SET_USER',
    PROCESS = 'user/PROCESS',
    LOGOUT = 'user/LOGOUT'
}

type CheckUserPayload = { user: UserSubState };

export const actionCreators = {
    checkUser: () => (dispatch: Dispatch) => {
        return UserAPI.checkAPI()
        .then(res => dispatch({
            type: UserActionType.CHECK_USER_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: UserActionType.CHECK_USER_FAILING,
            payload: e
        }))
    },
    setUser: createAction(UserActionType.SET_USER, (payload: UserSubState) => payload),
    process: createAction(UserActionType.PROCESS),
    logout: createAction(UserActionType.LOGOUT)
}

type CheckUserAction = GenericResponseAction<CheckUserPayload, string>;
type SetUserAction = ReturnType<typeof actionCreators.setUser>;

export type UserSubState = {
    _id: string,
    username: string,
    displayName: string,
    thumbnail: string | null,
}

export type UserState = {
    user: UserSubState | null,
    processed: boolean
}

const initialState: UserState = {
    user: null,
    processed: false
}

export default handleActions<UserState, any>({
    [UserActionType.SET_USER]: (state, action: SetUserAction) => {        
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.user = action.payload;
        });
    },
    [UserActionType.PROCESS]: (state) => {
        return produce(state, (draft) => {
            draft.processed = true;
        });
    },
    [UserActionType.CHECK_USER_SUCCESS]: (state, action: CheckUserAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.user = action.payload.data.user;
            draft.processed = true;
        });
    },
    [UserActionType.CHECK_USER_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.user = null;
            draft.processed = true;
        });
    }
}, initialState);