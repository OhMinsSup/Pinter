import { combineReducers } from 'redux';
import recent, { RecentState } from './recent';
import follows, { FollowsState } from './follows';
import lockers, { LockersState } from './lockers';
import tags, { TagsState } from './tags';
import users, { UsersState } from './users';
import groups, { GroupsState } from './groups';

const list = combineReducers({
    recent: recent,
    follows: follows,
    lockers: lockers,
    tags: tags,
    users: users,
    groups: groups,
});

export interface ListState {
    recent: RecentState;
    follows: FollowsState;
    lockers: LockersState;
    tags: TagsState;
    users: UsersState;
    groups: GroupsState;
}

export default list;