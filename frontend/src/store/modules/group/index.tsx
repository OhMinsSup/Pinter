import { combineReducers } from 'redux';
import groupWrite, { GroupWriteState } from './write';

const group = combineReducers({
    groupWrite: groupWrite,
});

export interface GroupState {
    groupWrite: GroupWriteState 
}

export default group;