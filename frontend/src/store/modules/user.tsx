import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction, createPromiseThunk } from '../../lib/common';
import * as UserAPI from '../../lib/API/user';

const CHECK_USER = 'user/CHECK_USER';
const CHECK_USER_SUCCESS = 'user/CHECK_USER_SUCCESS';
const CHECK_USER_ERROR = 'user/CHECK_USER_ERROR';
const SET_USER = 'user/SET_USER';
const PROCESS = 'user/PROCESS';
const LOGOUT = 'user/LOGOUT';

export const userCreators = {
  checkUser: createPromiseThunk(CHECK_USER, UserAPI.checkAPI),
  setUser: createAction(SET_USER, (payload: UserSubState) => payload),
  process: createAction(PROCESS),
  logout: createAction(LOGOUT),
};

type CheckUserAction = GenericResponseAction<{ user: UserSubState }, string>;
type SetUserAction = ReturnType<typeof userCreators.setUser>;

export interface UserSubState {
  id: string;
  username: string;
  displayName: string;
  thumbnail: string | null;
}

export interface UserState {
  user: UserSubState | null;
  processed: boolean;
}

const initialState: UserState = {
  user: null,
  processed: false,
};

export default handleActions<UserState, any>(
  {
    [SET_USER]: (state, action: SetUserAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.user = action.payload;
      });
    },
    [PROCESS]: state => {
      return produce(state, draft => {
        draft.processed = true;
      });
    },
    [CHECK_USER_SUCCESS]: (state, action: CheckUserAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.user = action.payload.data.user;
        draft.processed = true;
      });
    },
    [CHECK_USER_ERROR]: state => {
      return produce(state, draft => {
        draft.user = null;
        draft.processed = true;
      });
    },
  },
  initialState
);
