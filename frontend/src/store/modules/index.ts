import { combineReducers } from 'redux';
import auth, { AuthRecordState } from './auth';
import base, { BaseRecordState } from './base';
import user, { UserRecordState } from './user';

export default combineReducers({
    auth: auth,
    base: base,
    user: user
});

// 스토어의 상태 타입 정의
export interface StoreState {
    auth: AuthRecordState
    base: BaseRecordState
    user: UserRecordState
}