import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import base, { BaseState } from './base';

export default combineReducers({
    auth: auth,
    user: user,
    base: base
});

export interface StoreState { 
    auth: AuthState,
    user: UserState,
    base: BaseState
}
