import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum UserActionType {
    CHECK_USER_REQUEST = 'user/CHECK_USER_REQUEST',
    CHECK_USER_SUCCESS = 'user/CHECK_USER_SUCCESS',
    CHECK_USER_FAILING = 'user/CHECK_USER_FAILING',
    SET_USER = 'user/SET_USER',
    PROCESS = 'user/PROCESS',
    LOGOUT = 'user/LOGOUT'
}

type CheckUserPayload = { user: UserSubState };

export const actionCreators = {
    checkUserRequest: createAction(UserActionType.CHECK_USER_REQUEST),
    checkUserSuccess: createAction(UserActionType.CHECK_USER_SUCCESS, (payload: CheckUserPayload) => payload),
    checkUserFailing: createAction(UserActionType.CHECK_USER_FAILING),
    setUser: createAction(UserActionType.SET_USER, (payload: UserSubState) => payload),
    process: createAction(UserActionType.PROCESS),
    logout: createAction(UserActionType.LOGOUT)
}

type CheckUserSucessAction = ReturnType<typeof actionCreators.checkUserSuccess>;
type SetUserAction = ReturnType<typeof actionCreators.setUser>;

export type UserSubState = {
    id: string,
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
    [UserActionType.CHECK_USER_SUCCESS]: (state, action: CheckUserSucessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.user = action.payload.user;
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