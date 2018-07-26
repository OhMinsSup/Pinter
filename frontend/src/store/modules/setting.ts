import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum SettingActionType {
    SET_PROFILE_FULLSCREEN_LOADER = 'setting/SET_PROFILE_FULLSCREEN_LOADER'
}

export const actionCreators = {
    setProfileFullscreenLoader: createAction(SettingActionType.SET_PROFILE_FULLSCREEN_LOADER, (visible: boolean) => visible)
}

type SetProfileFullscreenLoaderAction = ReturnType<typeof actionCreators.setProfileFullscreenLoader>;

export interface SettingState {
    visible: boolean
}

const initialState: SettingState = {
    visible: false,
}

export default handleActions<SettingState, any>({
    [SettingActionType.SET_PROFILE_FULLSCREEN_LOADER]: (state, action: SetProfileFullscreenLoaderAction) => {
        return produce(state, (draft) => {            
            if (action.payload === undefined) return;
            draft.visible = action.payload;
        })
    }
}, initialState);