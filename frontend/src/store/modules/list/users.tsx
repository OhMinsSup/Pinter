import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as CommonAPI from '../../../lib/API/common';

const REVEAL_USERS_PREFETCHED  = 'list/REVEAL_USERS_PREFETCHED';
const GET_USERS_LIST = 'list/GET_USERS_LIST';
const GET_USERS_LIST_PENDING = 'list/GET_USERS_LIST_PENDING';
const GET_USERS_LIST_SUCCESS = 'list/GET_USERS_LIST_SUCCESS';
const GET_USERS_LIST_ERROR = 'list/GET_USERS_LIST_ERROR';

const PREFETCH_USERS_LIST = 'list/PREFETCH_USERS_LIST';
const PREFETCH_USERS_LIST_SUCCESS = 'list/PREFETCH_USERS_LIST_SUCCESS';

export const usersCreatrors = {
    revealUserPrefetched: createAction(REVEAL_USERS_PREFETCHED, (type: string) => type),
    getUserList: createPromiseThunk(GET_USERS_LIST, CommonAPI.usersAPI),
    prefetchUserList: createPromiseThunk(PREFETCH_USERS_LIST, CommonAPI.nextAPI),
}

type RevealUserPrefetchedAction = ReturnType<typeof usersCreatrors.revealUserPrefetched>;
type GetUserListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;
type PrefetchUserListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;

export interface UserSubState {
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    }
}

export interface ListingSetState {
    user: UserSubState[],
    prefetched: UserSubState[],
    end: boolean,
    next: string,
    loading: boolean
}

export interface UsersState {
    user: ListingSetState;
}

const initialListingSet = {
    user: [],
    prefetched: [],
    next: '',
    end: false,
    loading: false
}

const initialState: UsersState = {
    user: initialListingSet,
}

export default handleActions<UsersState, any>({
    [REVEAL_USERS_PREFETCHED]: (state, action: RevealUserPrefetchedAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { payload } = action;
            const { user, prefetched } = draft[payload];
            if (user && prefetched) {
                user.push(...prefetched);
                draft[payload].prefetched = null;
            }
        })
    },
    [PREFETCH_USERS_LIST_SUCCESS]: (state, action: PrefetchUserListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.user.prefetched = data.usersWithData,
            draft.user.next = data.next;
            if (data.usersWithData && data.usersWithData.length === 0) {
                draft.user.end = true;
            }
        })
    },
    [GET_USERS_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.loading = true;
        });
    },
    [GET_USERS_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.user = {
                user: [],
                prefetched: [],
                next: '',
                end: false,
                loading: false
            }
        })
    },
    [GET_USERS_LIST_SUCCESS]: (state, action: GetUserListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.user = {
                user: data.usersWithData,
                prefetched: [],
                next: data.next,
                loading: false,
                end: true,
            }
        })
    },
}, initialState);