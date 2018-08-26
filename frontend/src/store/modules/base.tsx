import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER';
const SEARCH_FULLSCREEN_LOADER = 'base/SEARCH_FULLSCREEN_LOADER';
const BOX_FULLSCREEN_LOADER = 'base/BOX_FULLSCREEN_LOADER';
const GET_BOWSER_SIZE = 'base/GET_BOWSER_SIZE';

const OPEN_PIN_BOX = 'base/OPEN_PIN_BOX';
const SET_SIDE_BAR = 'base/SET_SIDE_BAR';
const SET_MAIN = 'base/SET_MAIN';

export type BoxFullscreenLoaderPayload = { name: 'like' | 'comment' | 'save' , visible: boolean, id: string, theme: any }

export const baseCreators = {
    setHeaderVisibility: createAction(SET_HEADER_VISIBILITY, (visible: boolean) => visible),
    showUserMenu: createAction(SHOW_USER_MENU),
    hideUserMenu: createAction(HIDE_USER_MENU),
    setFullscreenLoader: createAction(SET_FULLSCREEN_LOADER, (visible: boolean) => visible),
    searchFullscreenLoader: createAction(SEARCH_FULLSCREEN_LOADER, (visible: boolean) => visible),
    boxFullscreenLoader: createAction(BOX_FULLSCREEN_LOADER, (payload: BoxFullscreenLoaderPayload) => payload),
    getbowserSize: createAction(GET_BOWSER_SIZE, (size: number) => size),
    openPinBox: createAction(OPEN_PIN_BOX, (visible: boolean) => visible),
    setSidebar: createAction(SET_SIDE_BAR, (visible: boolean) => visible),
    setMain: createAction(SET_MAIN, (visible: boolean) => visible),
};

type SearchFullscreenLoaderAction = ReturnType<typeof baseCreators.searchFullscreenLoader>;
type SetHeaderVisibilityAction = ReturnType<typeof baseCreators.setHeaderVisibility>;
type SetFullscreenLoaderAction = ReturnType<typeof baseCreators.setFullscreenLoader>;
type BoxFullscreenLoaderAction = ReturnType<typeof baseCreators.boxFullscreenLoader>;
type GetBowserSizeAction = ReturnType<typeof baseCreators.getbowserSize>;
type OpenPinBoxAction = ReturnType<typeof baseCreators.openPinBox>;
type SetSidebarAction = ReturnType<typeof baseCreators.setSidebar>; 
type SetMainAction = ReturnType<typeof baseCreators.setMain>;

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
    },
    size: number;
    pin: {
        visible: boolean
    },
    sidebar: {
        visible: boolean
    },
    main: {
        visible: boolean,
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
    },
    size: 0,
    pin: {
        visible: false
    },
    sidebar: {
        visible: false
    },
    main: {
        visible: false
    }
};

export default handleActions<BaseState, any>({
    [SET_HEADER_VISIBILITY]: (state, action: SetHeaderVisibilityAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.userMenu = action.payload;
        })
    },
    [SHOW_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.userMenu = true;
        })
    },
    [HIDE_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.userMenu = false;
        })
    },
    [SET_FULLSCREEN_LOADER]: (state, action: SetFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.fullscreenLoader = action.payload;
        })
    },
    [SEARCH_FULLSCREEN_LOADER]: (state, action: SearchFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.search = action.payload;
        })
    },
    [BOX_FULLSCREEN_LOADER]: (state, action: BoxFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.box[action.payload.name] = action.payload.visible;
            draft.box.pinId = action.payload.id;
            draft.box.theme = action.payload.theme;
        })
    },
    [GET_BOWSER_SIZE]: (state, action: GetBowserSizeAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.size = action.payload;
        })
    },
    [OPEN_PIN_BOX]: (state, action: OpenPinBoxAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.pin.visible = action.payload;
        })
    },
    [SET_SIDE_BAR]: (state, action: SetSidebarAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.sidebar.visible = action.payload;
        })
    },
    [SET_MAIN]: (state, action: SetMainAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.main.visible = action.payload;
        })
    }
}, initialState);