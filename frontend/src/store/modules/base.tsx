import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER';
const SEARCH_FULLSCREEN_LOADER = 'base/SEARCH_FULLSCREEN_LOADER';
const GET_BOWSER_SIZE = 'base/GET_BOWSER_SIZE';

const OPEN_PIN_BOX = 'base/OPEN_PIN_BOX';
const SET_SIDE_BAR = 'base/SET_SIDE_BAR';
const SET_MAIN = 'base/SET_MAIN';
const SET_PIN_IMAGE = 'base/SET_PIN_IMAGE';
const SET_PROFILE = 'base/SET_PROFILET';
const SET_MENU = 'base/SET_MENU';
const SET_MODAL = 'base/SET_MODAL';

export const baseCreators = {
    setHeaderVisibility: createAction(SET_HEADER_VISIBILITY, (visible: boolean) => visible),
    showUserMenu: createAction(SHOW_USER_MENU),
    hideUserMenu: createAction(HIDE_USER_MENU),
    setFullscreenLoader: createAction(SET_FULLSCREEN_LOADER, (visible: boolean) => visible),
    searchFullscreenLoader: createAction(SEARCH_FULLSCREEN_LOADER, (visible: boolean) => visible),
    getbowserSize: createAction(GET_BOWSER_SIZE, (size: number) => size),
    openPinBox: createAction(OPEN_PIN_BOX, (visible: boolean) => visible),
    setSidebar: createAction(SET_SIDE_BAR, (visible: boolean) => visible),
    setMain: createAction(SET_MAIN, (visible: boolean) => visible),
    setPinImage: createAction(SET_PIN_IMAGE, (visible: boolean) => visible),
    setProfile: createAction(SET_PROFILE, (visible: boolean) => visible),
    setMenu: createAction(SET_MENU, (visible: boolean) => visible),
    setModal: createAction(SET_MODAL, (visible: boolean) => visible),
};

type SearchFullscreenLoaderAction = ReturnType<typeof baseCreators.searchFullscreenLoader>;
type SetHeaderVisibilityAction = ReturnType<typeof baseCreators.setHeaderVisibility>;
type SetFullscreenLoaderAction = ReturnType<typeof baseCreators.setFullscreenLoader>;
type GetBowserSizeAction = ReturnType<typeof baseCreators.getbowserSize>;
type OpenPinBoxAction = ReturnType<typeof baseCreators.openPinBox>;
type SetSidebarAction = ReturnType<typeof baseCreators.setSidebar>; 
type SetMainAction = ReturnType<typeof baseCreators.setMain>;
type SetPinImageAction = ReturnType<typeof baseCreators.setPinImage>;
type SetProfileActin = ReturnType<typeof baseCreators.setProfile>;
type SetMenuAction = ReturnType<typeof baseCreators.setMenu>;
type SetModalAction = ReturnType<typeof baseCreators.setModal>;

export interface BaseState {
    userMenu: boolean;
    header: boolean;
    fullscreenLoader: boolean;
    search: boolean;
    size: number;
    pin: {
        visible: boolean
    },
    sidebar: {
        visible: boolean
    },
    main: {
        visible: boolean
    },
    image: {
        visible: boolean
    },
    profile: {
        visible: boolean
    },
    menu: {
        visible: boolean
    },
    modal: {
        visible: boolean
    }
}

const initialState: BaseState = {
    userMenu: false,
    header: true,
    fullscreenLoader: false,
    search: false,
    size: 0,
    pin: {
        visible: false
    },
    sidebar: {
        visible: false
    },
    main: {
        visible: false
    },
    image: {
        visible: false,
    },
    profile: {
        visible: false
    },
    menu: {
        visible: false
    },
    modal: {
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
    },
    [SET_PIN_IMAGE]: (state, action: SetPinImageAction) => {
        return produce(state, (darft) => {
            if (action.payload === undefined) return;
            darft.image.visible = action.payload;
        })
    },
    [SET_PROFILE]: (state, action: SetProfileActin) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.profile.visible = action.payload;
        })
    },
    [SET_MENU]: (state, action:SetMenuAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.menu.visible = action.payload;
        })
    },
    [SET_MODAL]: (state, action: SetModalAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.modal.visible = action.payload;
        })
    }
}, initialState);