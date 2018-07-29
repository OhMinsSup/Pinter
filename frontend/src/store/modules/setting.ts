import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { Dispatch, Action } from 'redux';
import { GenericResponseAction } from '../../lib/common';
import * as SettingAPI from '../../lib/api/setting';

export enum SettingActionType {
    SET_PROFILE_FULLSCREEN_LOADER = 'setting/SET_PROFILE_FULLSCREEN_LOADER',
    GET_USER_INFO_SUCCESS = 'setting/GET_USER_INFO_SUCCESS',
    GET_USER_INFO_FAILING = 'setting/GET_USER_INFO_FAILING'
}

export const actionCreators = {
    setProfileFullscreenLoader: createAction(SettingActionType.SET_PROFILE_FULLSCREEN_LOADER, (visible: boolean) => visible),
    getUserInfo: (displayName: string) => (dispatch: Dispatch<Action>) => {
        return SettingAPI.getUserInfoAPI(displayName)
        .then(res => dispatch({
            type: SettingActionType.GET_USER_INFO_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: SettingActionType.GET_USER_INFO_FAILING,
            payload: e
        }))
    }
}

type SetProfileFullscreenLoaderAction = ReturnType<typeof actionCreators.setProfileFullscreenLoader>;
type GetUserInfoAction = GenericResponseAction<UserInfoSubState ,string>;

export interface UserInfoSubState {
    username: string,
    displayName: string,
    thumbnail: string,
    userId: string,
    follower: number,
    following: number,
    pin: number
}

export interface SettingState {
    visible: boolean,
    user: UserInfoSubState
}

const initialState: SettingState = {
    visible: false,
    user: {
        username: '',
        displayName: '',
        thumbnail: '',
        userId: '',
        follower: 0,
        following: 0,
        pin: 0
    }
}

export default handleActions<SettingState, any>({
    [SettingActionType.SET_PROFILE_FULLSCREEN_LOADER]: (state, action: SetProfileFullscreenLoaderAction) => {
        return produce(state, (draft) => {            
            if (action.payload === undefined) return;
            draft.visible = action.payload;
        })
    },
    [SettingActionType.GET_USER_INFO_SUCCESS]: (state, action: GetUserInfoAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user = action.payload.data;
        })
    }
}, initialState);