import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum BaseActionType {
    SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY',
    SHOW_USER_MENU = 'base/SHOW_USER_MENU',
    HIDE_USER_MENU = 'base/HIDE_USER_MENU',
    SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER',
    SEARCH_FULLSCREEN_LOADER = 'base/SEARCH_FULLSCREEN_LOADER',
    BOX_FULLSCREEN_LOADER = 'base/BOX_FULLSCREEN_LOADER',
}

export type BoxFullscreenLoaderPayload = { name: 'like' | 'comment' | 'save' , visible: boolean, id: string, theme: any }

export const actionCreators = {
    setHeaderVisibility: createAction(BaseActionType.SET_HEADER_VISIBILITY, (visible: boolean) => visible),
    showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
    hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
    setFullscreenLoader: createAction(BaseActionType.SET_FULLSCREEN_LOADER, (visible: boolean) => visible),
    searchFullscreenLoader: createAction(BaseActionType.SEARCH_FULLSCREEN_LOADER, (visible: boolean) => visible),
    boxFullscreenLoader: createAction(BaseActionType.BOX_FULLSCREEN_LOADER, (payload: BoxFullscreenLoaderPayload) => payload)
};

type SearchFullscreenLoaderAction = ReturnType<typeof actionCreators.searchFullscreenLoader>;
type SetHeaderVisibilityAction = ReturnType<typeof actionCreators.setHeaderVisibility>;
type SetFullscreenLoaderAction = ReturnType<typeof actionCreators.setFullscreenLoader>;
type BoxFullscreenLoaderAction = ReturnType<typeof actionCreators.boxFullscreenLoader>;

export interface BaseState {
    userMenu: boolean;
    header: boolean;
    fullscreenLoader: boolean;
    search: boolean;
    box: {
        pinId: string,
        theme: any,
        like: boolean,
        comment: boolean,
        save: boolean
    }
}

const initialState: BaseState = {
    userMenu: false,
    header: true,
    fullscreenLoader: false,
    search: false,
    box: {
        pinId: '',
        theme: '',
        like: false,
        comment: false,
        save: false
    }
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
    },
    [BaseActionType.SEARCH_FULLSCREEN_LOADER]: (state, action: SearchFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.search = action.payload;
        })
    },
    [BaseActionType.BOX_FULLSCREEN_LOADER]: (state, action: BoxFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.box[action.payload.name] = action.payload.visible;
            draft.box.pinId = action.payload.id;
            draft.box.theme = action.payload.theme;
        })
    }
}, initialState);