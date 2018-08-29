import { combineReducers } from 'redux';
import recent, { RecentState } from './recent';

export interface ListState {
    recent: RecentState
}

const list = combineReducers({
    recent: recent
})

export default list;