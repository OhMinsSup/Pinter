import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as FollowAPI from '../../../lib/API/follow';

const REVEAL_FOLLOW_PREFETCHED  = 'list/REVEAL_FOLLOW_PREFETCHED';
const GET_FOLLOWER_LIST = 'list/GET_FOLLOWER_LIST';
const GET_FOLLOWER_LIST_PENDING = 'list/GET_FOLLOWER_LIST_PENDING';
const GET_FOLLOWER_LIST_SUCCESS = 'list/GET_FOLLOWER_LIST_SUCCESS';
const GET_FOLLOWER_LIST_ERROR = 'list/GET_FOLLOWER_LIST_ERROR';

const PREFETCH_FOLLOWER_LIST = 'list/PREFETCH_FOLLOWER_LIST';
const PREFETCH_FOLLOWER_LIST_SUCCESS = 'list/PREFETCH_FOLLOWER_LIST_SUCCESS';

const GET_FOLLOWING_LIST = 'list/GET_FOLLOWING_LIST';
const GET_FOLLOWING_LIST_PENDING = 'list/GET_FOLLOWING_LIST_PENDING';
const GET_FOLLOWING_LIST_SUCCESS = 'list/GET_FOLLOWING_LIST_SUCCESS';
const GET_FOLLOWING_LIST_ERROR = 'list/GET_FOLLOWING_LIST_ERROR';

const PREFETCH_FOLLOWING_LIST = 'list/PREFETCH_FOLLOWING_LIST';
const PREFETCH_FOLLOWING_LIST_SUCCESS = 'list/PREFETCH_FOLLOWING_LIST_SUCCESS';

export const followsCreators = {
    revealFollowPrefetched: createAction(REVEAL_FOLLOW_PREFETCHED, (type: string) => type),
    getFollowerList: createPromiseThunk(GET_FOLLOWER_LIST, FollowAPI.getFollowerAPI),
    prefetchfollowerList: createPromiseThunk(PREFETCH_FOLLOWER_LIST_SUCCESS, FollowAPI.nextAPI),
    getFollowingList: createPromiseThunk(GET_FOLLOWING_LIST, FollowAPI.getFollowingAPI),
    prefetchfollowingList: createPromiseThunk(PREFETCH_FOLLOWING_LIST, FollowAPI.nextAPI),
}

type RevealFollowPrefetchedAction = ReturnType<typeof followsCreators.revealFollowPrefetched>;
type GetFollowerListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;
type PrefetchfollowerListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;
type GetFollowingListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;
type PrefetchfollowingListAction = GenericResponseAction<{ usersWithData: UserSubState[], next: string }, string>;

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

export interface FollowsState {
    follower: ListingSetState;
    following: ListingSetState;
}

const initialListingSet = {
    user: [],
    prefetched: [],
    next: '',
    end: false,
    loading: false
}

const initialState: FollowsState = {
    follower: initialListingSet,
    following: initialListingSet
}

export default handleActions<FollowsState, any>({
    [REVEAL_FOLLOW_PREFETCHED]: (state, action: RevealFollowPrefetchedAction) => {
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
    [GET_FOLLOWER_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.follower.loading = true;
        });
    },
    [GET_FOLLOWER_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.follower = {
                user: [],
                prefetched: [],
                next: '',
                end: false,
                loading: false
            }
        })
    },
    [GET_FOLLOWER_LIST_SUCCESS]: (state, action: GetFollowerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follower = {
                user: data.usersWithData,
                prefetched: [],
                next: data.next,
                loading: false,
                end: true,
            }
        })
    },
    [PREFETCH_FOLLOWER_LIST]: (state, action: PrefetchfollowerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follower.prefetched = data.usersWithData,
            draft.follower.next = data.next;
            if (data.usersWithData && data.usersWithData.length === 0) {
                draft.follower.end = true;
            }
        })
    },
        [GET_FOLLOWER_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.follower.loading = true;
        });
    },
    [GET_FOLLOWER_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.follower = {
                user: [],
                prefetched: [],
                next: '',
                end: false,
                loading: false
            }
        })
    },
    [GET_FOLLOWER_LIST_SUCCESS]: (state, action: GetFollowerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follower = {
                user: data.usersWithData,
                prefetched: [],
                next: data.next,
                loading: false,
                end: true,
            }
        })
    },
    [PREFETCH_FOLLOWER_LIST]: (state, action: PrefetchfollowerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follower.prefetched = data.usersWithData,
            draft.follower.next = data.next;
            if (data.usersWithData && data.usersWithData.length === 0) {
                draft.follower.end = true;
            }
        })
    },
    [GET_FOLLOWING_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.following.loading = true;
        });
    },
    [GET_FOLLOWING_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.following = {
                user: [],
                prefetched: [],
                next: '',
                end: false,
                loading: false
            }
        })
    },
    [GET_FOLLOWING_LIST_SUCCESS]: (state, action: GetFollowingListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.following = {
                user: data.usersWithData,
                prefetched: [],
                next: data.next,
                loading: false,
                end: true,
            }
        })
    },
    [PREFETCH_FOLLOWING_LIST_SUCCESS]: (state, action: PrefetchfollowingListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.following.prefetched = data.usersWithData,
            draft.following.next = data.next;
            if (data.usersWithData && data.usersWithData.length === 0) {
                draft.following.end = true;
            }
        })
    }
}, initialState);