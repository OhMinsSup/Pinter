import { combineReducers } from 'redux';
import recent, { RecentState } from './recent';
import follows, { FollowsState } from './follows';

export interface ListState {
    recent: RecentState,
    follows: FollowsState,
}

const list = combineReducers({
    recent: recent,
    follows: follows,
})

export default list;