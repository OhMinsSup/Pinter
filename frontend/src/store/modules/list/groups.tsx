import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from 'src/lib/common';
import * as groupAPI from '../../../lib/API/group';

const REVEAL_PREFETCHED  = 'list/REVEAL_PREFETCHED';
const GET_GROUPS_LIST = 'list/GET_GROUPS_LIST';
const GET_GROUPS_LIST_PENDING = 'list/GET_GROUPS_LIST_PENDING';
const GET_GROUPS_LIST_SUCCESS = 'list/GET_GROUPS_LIST_SUCCESS';
const GET_GROUPS_LIST_ERROR = 'list/GET_GROUPS_LIST_ERROR';

const PREFETCH_GROUP_LIST = 'list/PREFETCH_GROUP_LIST';
const PREFETCH_GROUP_LIST_SUCCESS = 'list/PREFETCH_GROUP_LIST_SUCCESS';

const INITIALIZE_GROUP_LIST = 'list/INITIALIZE_GROUP_LIST';

export const groupsCreators = {
    getGroupsList: createPromiseThunk(GET_GROUPS_LIST, groupAPI.groupListAPI),
    prefetchGroupList: createPromiseThunk(PREFETCH_GROUP_LIST, groupAPI.nextAPI),
    revealPrefetched: createAction(REVEAL_PREFETCHED),
    initialize: createAction(INITIALIZE_GROUP_LIST, (active: boolean) => active),
}

type PrefetchGroupListAction = GenericResponseAction<{ 
    next: string,
    groupsWithData: GroupSubState[]
}, string>;
type InitializeAction = ReturnType<typeof groupsCreators.initialize>;
type GetGroupsListAction = GenericResponseAction<{ 
    next: string,
    active: boolean,
    groupsWithData: GroupSubState[]
}, string>;


export interface GroupSubState {
    groupId: string,
    title: string,
    activation: boolean,
    user: {
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
    groups: ListingSetState,
    active: boolean,
}

const initialListingSet: ListingSetState = {
    groups: [],
    prefetched: [],
    end: false,
    next: '',
    loading: false
}

const initialState: GroupsState = {
    groups: initialListingSet,
    active: false,
}

export default handleActions<GroupsState, any>({
    [INITIALIZE_GROUP_LIST]: (state, action: InitializeAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.groups = {
                end: false,
                groups: [],
                prefetched: [],
                next: '',
                loading: false
            };

            draft.active = action.payload;
        })
    },
    [GET_GROUPS_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.groups.loading = true;
        })
    },
    [GET_GROUPS_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.groups = {
                end: false,
                groups: [],
                prefetched: [],
                next: '',
                loading: false
            }
        })
    },
    [GET_GROUPS_LIST_SUCCESS]: (state, action: GetGroupsListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;

            draft.groups = {
                end: false,
                groups: data.groupsWithData,
                prefetched: [],
                next: data.next,
                loading: false
            }
        })
    },
    [REVEAL_PREFETCHED]: (state) => {
        return produce(state, (draft) => {
            const { groups, prefetched } = draft.groups;
            if (groups && prefetched) {
                groups.push(...prefetched);
                draft.groups.prefetched = [];
            }
             
        })
    },
    [PREFETCH_GROUP_LIST_SUCCESS]: (state, action: PrefetchGroupListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            draft.groups.prefetched = data.groupsWithData;
            draft.groups.next = data.next;
            if (data.groupsWithData && data.groupsWithData.length === 0) {
                draft.groups.end = true;
            }
        })
    }
}, initialState)