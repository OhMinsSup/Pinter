import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum BaseActionType {
    SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY',
    SHOW_USER_MENU = 'base/SHOW_USER_MENU',
    HIDE_USER_MENU = 'base/HIDE_USER_MENU',
    SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER',
}

export const actionCreators = {
    setHeaderVisibility: createAction(BaseActionType.SET_HEADER_VISIBILITY, (visible: boolean) => visible),
    showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
    hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
    setFullscreenLoader: createAction(BaseActionType.SET_FULLSCREEN_LOADER, (visible: boolean) => visible),
};

type SetHeaderVisibilityAction = ReturnType<typeof actionCreators.setHeaderVisibility>;
type SetFullscreenLoaderAction = ReturnType<typeof actionCreators.setFullscreenLoader>;

export interface BaseState {
    userMenu?: boolean;
    header?: boolean;
    fullscreenLoader?: boolean;
}

const initialState: BaseState = {
    userMenu: false,
    header: true,
    fullscreenLoader: false,
};

export default handleActions<BaseState, any>({
    [BaseActionType.SET_HEADER_VISIBILITY]: (state, action: SetHeaderVisibilityAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.userMenu = action.payload;
        })
    },
    [BaseActionType.SHOW_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.userMenu = true;
        })
    },
    [BaseActionType.HIDE_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.userMenu = false;
        })
    },
    [BaseActionType.SET_FULLSCREEN_LOADER]: (state, action: SetFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.fullscreenLoader = action.payload;
        })
    }
}, initialState);