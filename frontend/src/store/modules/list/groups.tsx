import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as groupAPI from '../../../lib/API/group';

const REVEAL_PREFETCHED  = 'list/REVEAL_PREFETCHED';
const GET_GROUP_LIST = 'list/GET_GROUP_LIST';
const GET_GRUOP_LIST_PENDING = 'list/GET_GRUOP_LIST_PENDING';
const GET_GROUP_LIST_SUCCESS = 'list/GET_GROUP_LIST_SUCCESS';
const GET_GROUP_LIST_ERROR = 'list/GET_GROUP_LIST_ERROR';

const PREFETCH_GROUP_LIST = 'list/PREFETCH_GROUP_LIST';
const PREFETCH_GROUP_LIST_SUCCESS = 'list/PREFETCH_GROUP_LIST_SUCCESS';

export const groupsCreators = {
    revealPrefetched: createAction(REVEAL_PREFETCHED, (type: string) => type),
    getGroupList: createPromiseThunk(GET_GROUP_LIST, groupAPI.listGroupAPI),
    prefetchGroupList: createPromiseThunk(PREFETCH_GROUP_LIST, groupAPI.nextAPI),
}

type RevealPrefetchedAction = ReturnType<typeof groupsCreators.revealPrefetched>;
type GetGroupListAction = GenericResponseAction<{ groupWithData: any[], next: string }, string>;
type PrefetchGroupListAction = GenericResponseAction<{ groupWithData: any[], next: string }, string>;

export interface GroupSubState {
    groupId: string, 
    cover: string;
    title: string;
    contents: string;
    creator: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    },
}

export interface ListingSetState {
    groups: GroupSubState[],
    prefetched: GroupSubState[],
    end: boolean,
    next: string,
    loading: boolean
}

export interface GroupsState {
    group: ListingSetState
}

const initialListingSet = {
    groups: [],
    prefetched: [],
    end: false,
    next: '',
    loading: false
}

const initialState: GroupsState = {
    group: initialListingSet,
}


export default handleActions<GroupsState, any>({
    [GET_GRUOP_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.group.loading = true;
        });
    },
    [GET_GROUP_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.group = {
                end: false,
                groups: [],
                prefetched: [],
                next: '',
                loading: false
            }
        });
    },
    [GET_GROUP_LIST_SUCCESS]: (state, action: GetGroupListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.group = {
                end: false,
                groups: data.groupWithData,
                prefetched: [],
                next: data.next,
                loading: false,
            }
        });
    },
    [REVEAL_PREFETCHED]: (state, action: RevealPrefetchedAction) => {
        return produce(state, (draft) => {
            if(action.payload === undefined) return;
            const { payload } = action;
            const { groups, prefetched } = draft[payload];
            if (groups && prefetched) {
                groups.push(...prefetched);
                draft[payload].prefetched = null;
            }
        })
    },
    [PREFETCH_GROUP_LIST_SUCCESS]: (state, action: PrefetchGroupListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            draft.group.prefetched = data.groupWithData;
            draft.group.next = data.next;
            if (data.groupWithData && data.groupWithData.length === 0) {
                draft.group.end = true;
            }
        });
    }
}, initialState);