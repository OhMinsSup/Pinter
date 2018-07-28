import { handleActions } from 'redux-actions';
import { Dispatch, Action } from 'redux';
import { GenericResponseAction } from '../../lib/common';
import * as FollowAPI from '../../lib/api/follow';
import produce from 'immer';

export enum FollowActionType {
    FOLLOW_PENDING = 'follow/FOLLOW_PENDING',
    FOLLOW_SUCCESS = 'follow/FOLLOW_SUCCESS',
    FOLLOW_FAILING = 'follow/FOLLOW_FAILING',
    UNFOLLOW_PENDING = 'follow/FOLLOW_PENDING',
    UNFOLLOW_SUCCESS = 'follow/UNFOLLOW_SUCCESS',
    UNFOLLOW_FAILING = 'follow/UNFOLLOW_FAILING',
    CHECK_EXISTS_USER_FOLLOW = 'follow/CHECK_EXISTS_USER_FOLLOW'
}

type FollowPayload = { follow: boolean };
type UnFollowPayload = { follow: boolean };
type CheckPayload = { follow: boolean };

export const actionCreators = {
    checkExistsUserFollow: (displayName: string) => (dispatch: Dispatch<Action>) => {
        return FollowAPI.getFollowAPI(displayName)
        .then(res => dispatch({
            type: FollowActionType.CHECK_EXISTS_USER_FOLLOW,
            payload: res
        }))
    },
    follow: (displayName: string) => (dispatch: Dispatch<Action>) => {
        dispatch({ type: FollowActionType.FOLLOW_PENDING, payload: true })
        return FollowAPI.followAPI(displayName)
        .then(res => dispatch({
            type: FollowActionType.FOLLOW_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: FollowActionType.FOLLOW_FAILING,
            payload: false
        }))
    },
    unfollow: (displayName: string) => (dispatch: Dispatch<Action>) => {
        dispatch({ type: FollowActionType.UNFOLLOW_PENDING, payload: false })
        return FollowAPI.unfollowAPI(displayName)
        .then(res => dispatch({
            type: FollowActionType.UNFOLLOW_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: FollowActionType.UNFOLLOW_FAILING,
            payload: true
        }))
    }
}

type FollowAction = GenericResponseAction<FollowPayload, boolean>;
type UnfollowAction = GenericResponseAction<UnFollowPayload, boolean>;
type GetFollowAction = GenericResponseAction<CheckPayload, boolean>

export interface UserFollowSubState {
    follow: boolean
}

export interface FollowState {
    user: UserFollowSubState
}

const initialState: FollowState = {
    user: {
        follow: false
    }
}

export default handleActions<FollowState, any>({
    [FollowActionType.FOLLOW_SUCCESS]: (state, action: FollowAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user.follow = action.payload.data.follow;
        })
    },
    [FollowActionType.FOLLOW_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = false;
        })
    },
    [FollowActionType.FOLLOW_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = true;
        })
    },
    [FollowActionType.UNFOLLOW_SUCCESS]: (state, action: UnfollowAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user.follow = action.payload.data.follow;
        })
    },
    [FollowActionType.UNFOLLOW_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = true;
        })
    },
    [FollowActionType.UNFOLLOW_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.follow = false;
        })
    },
    [FollowActionType.CHECK_EXISTS_USER_FOLLOW]: (state, action: GetFollowAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user.follow = action.payload.data.follow;
        })
    }
}, initialState);