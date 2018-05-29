import { combineReducers } from 'redux';
import auth, { AuthRecordState } from './auth';
import base, { BaseRecordState } from './base';

export default combineReducers({
    auth: auth,
    base: base
});

// 스토어의 상태 타입 정의
export interface StoreState {
    auth: AuthRecordState
    base: BaseRecordState
}