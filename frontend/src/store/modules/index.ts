import { combineReducers } from 'redux';
import base, { BaseState } from './base';
import auth, { AuthState} from './auth';


export default combineReducers({ 
    base: base,
    auth: auth
 });

// 스토어의 상태 타입 정의
export interface StoreState {
    base: BaseState;
    auth: AuthState;
}