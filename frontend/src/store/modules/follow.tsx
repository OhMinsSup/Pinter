import { handleActions } from 'redux-actions';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import produce from 'immer';
import * as FollowAPI from '../../lib/API/follow';

const FOLLOW = 'follow/FOLLOW';
const FOLLOW_SUCCESS = 'follow/FOLLOW_SUCCESS';
const FOLLOW_PENDING = 'follow/FOLLOW_PENDING';
const FOLLOW_ERROR = 'follow/FOLLOW_ERROR';

const UNFOLLOW = 'follow/UNFOLLOW';
const UNFOLLOW_PENDING = 'follow/FOLLOW_PENDING';
const UNFOLLOW_SUCCESS = 'follow/UNFOLLOW_SUCCESS';
const UNFOLLOW_ERROR = 'follow/UNFOLLOW_ERROR';

const CHECK_EXISTS_USER_FOLLOW = 'follow/CHECK_EXISTS_USER_FOLLOW';
const CHECK_EXISTS_USER_FOLLOW_SUCCESS = 'follow/CHECK_EXISTS_USER_FOLLOW_SUCCESS';


export const followCreators = {
    follow: createPromiseThunk(FOLLOW, FollowAPI.followAPI),
    unfollow: createPromiseThunk(UNFOLLOW, FollowAPI.unfollowAPI),
    checkExistsUserFollow: createPromiseThunk(CHECK_EXISTS_USER_FOLLOW, FollowAPI.getFollowAPI),
}


type FollowAction = GenericResponseAction<{ follow: boolean }, string>;
type UnFollowAction = GenericResponseAction<{ follow: boolean }, string>;
type CheckFollowAction = GenericResponseAction<{ follow: boolean }, string>;

export interface FollowState {
    user: {
        follow: boolean
    }
}

const initialState: FollowState = {
    user: {
        follow: false
    }
}

export default handleActions<FollowState, any>({
    [FOLLOW_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = true;
        });
    },
    [FOLLOW_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = false;
        });
    },
    [FOLLOW_SUCCESS]: (state, action: FollowAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.user.follow = data.follow;
        })
    },
    [UNFOLLOW_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = false;
        });
    },
    [UNFOLLOW_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = true;
        });
    },
    [UNFOLLOW_SUCCESS]: (state, action: UnFollowAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.user.follow = data.follow;
        })
    },
    [CHECK_EXISTS_USER_FOLLOW_SUCCESS]: (state, action: CheckFollowAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.user.follow = data.follow;
        })
    }
}, initialState);