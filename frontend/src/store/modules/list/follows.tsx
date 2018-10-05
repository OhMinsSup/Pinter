
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as followAPI from '../../../lib/API/follow';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';

const SELECT_TAB_FOLLOW = 'list/SELECT_TAB_FOLLOW';
const FOLLOW_USERS_MORE = 'list/FOLLOW_USERS_MORE';

const GET_FOLLOWER_LIST = 'list/GET_FOLLOWER_LIST';
const GET_FOLLOWER_LIST_PENDING = 'list/GET_FOLLOWER_LIST_PENDING';
const GET_FOLLOWER_LIST_SUCCESS = 'list/GET_FOLLOWER_LIST_SUCCESS';
const GET_FOLLOWER_LIST_ERROR = 'list/GET_FOLLOWER_LIST_ERROR';

const GET_FOLLOWING_LIST = 'list/GET_FOLLOWING_LIST';
const GET_FOLLOWING_LIST_PENDING = 'list/GET_FOLLOWING_LIST_PENDING';
const GET_FOLLOWING_LIST_SUCCESS = 'list/GET_FOLLOWING_LIST_SUCCESS';
const GET_FOLLOWING_LIST_ERROR = 'list/GET_FOLLOWING_LIST_ERROR';

export const followsCreators = {
    selectTabFollow: createAction(SELECT_TAB_FOLLOW, (value: string) => value),
    followUsersMore: createAction(FOLLOW_USERS_MORE, (cursor: boolean) => cursor),
    getFollowerList: createPromiseThunk(GET_FOLLOWER_LIST, followAPI.getFollowerAPI),
    getFollowingList: createPromiseThunk(GET_FOLLOWING_LIST, followAPI.getFollowingAPI),
}

type SelectTabFollowAction = ReturnType<typeof followsCreators.selectTabFollow>;
type FollowUsersMoreAction = ReturnType<typeof followsCreators.followUsersMore>;
type GetFollowListAction = GenericResponseAction<{ usersWithData: UserSubState[] }, string>;

export interface UserSubState {
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    }
}

export interface ListingSetState {
    users: UserSubState[],
    loading: boolean,
}

export interface FollowsState {
    follow: ListingSetState
    tab: {
        cursor: boolean,
        value: string
    }
}

const initialListingSet: ListingSetState = {
    users: [],
    loading: false
}

const initialState: FollowsState = {
    follow: initialListingSet,
    tab: {
        cursor: false,
        value: 'follow'
    }
}

export default handleActions<FollowsState, any>({
    [SELECT_TAB_FOLLOW]: (state, action: SelectTabFollowAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tab.value = action.payload;
        });
    },
    [FOLLOW_USERS_MORE]: (state, action: FollowUsersMoreAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tab.cursor = action.payload;
        })
    },
    [GET_FOLLOWER_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.follow = {
                loading: false,
                users: []
            }
        })
    },
    [GET_FOLLOWER_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.follow.loading = true;
        })
    },
    [GET_FOLLOWER_LIST_SUCCESS]: (state, action: GetFollowListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follow = {
                loading: false,
                users: data.usersWithData
            }
        });
    },
    [GET_FOLLOWING_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.follow = {
                loading: false,
                users: []
            }
        })
    },
    [GET_FOLLOWING_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.follow.loading = true;
        })
    },
    [GET_FOLLOWING_LIST_SUCCESS]: (state, action: GetFollowListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.follow = {
                loading: false,
                users: data.usersWithData
            }
        });
    }
}, initialState);
