import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import base, { BaseState } from './base';
import write, { WriteState } from './write';
import pin, { PinState } from './pin';

export default combineReducers({
    auth: auth,
    user: user,
    base: base,
    pin: pin,
    write: write
});

export interface StoreState { 
    auth: AuthState,
    user: UserState,
    base: BaseState,
    write: WriteState,
    pin: PinState,
}
