import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import base, { BaseState } from './base';
import write, { WriteState } from './write';
import pin, { PinState } from './pin';
import locker, { LockerState } from './locker';
import list, { ListState } from './list';
import common, { CommonState } from './common';
import follow, { FollowState } from './follow';

export default combineReducers({
    auth: auth,
    user: user,
    base: base,
    pin: pin,
    write: write,
    locker: locker,
    list: list,
    common: common,
    follow: follow,
});

export interface StoreState { 
    auth: AuthState,
    user: UserState,
    base: BaseState,
    write: WriteState,
    pin: PinState,
    locker: LockerState,
    list: ListState,
    common: CommonState,
    follow: FollowState,
}
