import { combineReducers } from 'redux';
import groupBase, { GroupBaseState } from './base';

const group = combineReducers({
    groupBase: groupBase,
});

export interface GroupState {
    groupBase: GroupBaseState,
}

export default group;