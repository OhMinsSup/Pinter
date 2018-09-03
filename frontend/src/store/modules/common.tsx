import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as commonAPI from '../../lib/API/common';

const INITIALIZE_PROFILE = 'common/INITIALIZE_PROFILE';
const GET_PROFILE = 'common/GET_PROFILE';
const GET_PROFILE_SUCCESS = 'common/GET_PROFILE_SUCCESS';
const GET_PROFILE_PENDING = 'common/GET_PROFILE_PENDING';
const CHANGE_INPUT_PROFILE = 'common/CHANGE_INPUT_PROFILE';

type ChangeInputProfilePayload = { value: string, name: string };

export const commonCreators = {
    initializeProfile: createAction(INITIALIZE_PROFILE),
    changeInputProfile: createAction(CHANGE_INPUT_PROFILE, (payload: ChangeInputProfilePayload) => payload),
    getProfile: createPromiseThunk(GET_PROFILE, commonAPI.getProfileAPI),
}

type GetProfileAction = GenericResponseAction<{
    username: string,
    displayName: string,
    thumbnail: string,
    userId: string,
    follower: number,
    following: number,
    pin: number,
 }, string>;
type ChangeInputProfileAction = ReturnType<typeof commonCreators.changeInputProfile>;

export interface UserProfileSubState {
    username: string;
    displayName: string;
    thumbnail: string;
    userId: string;
    follower: number;
    following: number;
    pin: number;
    loading: boolean;
}

export interface CommonState {
    profile: UserProfileSubState
    setting: {
        displayName: string,
        thumbnail: string,
    }
}

const initialState: CommonState = {
    profile: {
        username: '',
        userId: '',
        thumbnail: '',
        displayName: '',
        follower: 0,
        following: 0,
        pin: 0,
        loading: false,
    },
    setting : {
        displayName: '',
        thumbnail: '',
    }
}

export default handleActions<CommonState, any>({
    [INITIALIZE_PROFILE]: (state) => {
        return produce(state, (draft) => {
            draft.profile = {
                userId: '',
                username: '',
                thumbnail: '',
                displayName: '',
                follower: 0,
                following: 0,
                pin: 0,
                loading: false,
            },
            draft.setting = {
                displayName: '',
                thumbnail: '',
            }
        })
    },
    [GET_PROFILE_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.profile.loading = true;
        })
    },
    [GET_PROFILE_SUCCESS]: (state, action: GetProfileAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.profile = {
                username: data.username,
                userId: data.userId,
                thumbnail: data.thumbnail,
                displayName: data.displayName,
                follower: data.follower,
                following: data.following,
                pin: data.pin,
                loading: false
            };
            draft.setting = {
                displayName: data.displayName,
                thumbnail: data.thumbnail,
            };
        })
    },
    [CHANGE_INPUT_PROFILE]: (state, action: ChangeInputProfileAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.setting[action.payload.name] = action.payload.value;
        })
    }
}, initialState);