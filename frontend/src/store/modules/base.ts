import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export enum BaseActionType {
    SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY',
    SHOW_USER_MENU = 'base/SHOW_USER_MENU',
    HIDE_USER_MENU = 'base/HIDE_USER_MENU',
    SET_FULLSCREEN_LOADER = 'base/SET_FULLSCREEN_LOADER',
}

export const actionCreators = {
    setHeaderVisibility: createAction(BaseActionType.SET_HEADER_VISIBILITY),
    showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
    hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
    setFullscreenLoader: createAction(BaseActionType.SET_FULLSCREEN_LOADER),
};

export type SetHeaderVisibilityAction = ReturnType<typeof actionCreators.setHeaderVisibility>;
export type ShowUserMenuAction = ReturnType<typeof actionCreators.showUserMenu>;
export type HideUserMenuAction = ReturnType<typeof actionCreators.hideUserMenu>;
export type SetFullscreenLoaderAction = ReturnType<typeof actionCreators.setFullscreenLoader>;

const BaseRecord = Record({
    userMenu: false,
    header: true,
    fullscreenLoader: false,
});

export interface BaseRecordState {
    userMenu: boolean
    header: boolean
    fullscreenLoader: boolean
}

export class BaseRecordData extends BaseRecord {
    public userMenu: boolean
    public header: boolean
    public fullscreenLoader: boolean

    constructor(params?: BaseRecordState) {
        params ? super({ ...params }) : super()
    }
}

const initialState  = new BaseRecordData();

export default handleActions<BaseRecordData, any>({
    [BaseActionType.SET_HEADER_VISIBILITY]: (state, action: SetHeaderVisibilityAction): BaseRecordData => {
        return state.set('header', action.payload) as BaseRecordData;
    },
    [BaseActionType.SHOW_USER_MENU]: (state, action: ShowUserMenuAction): BaseRecordData => {
        return state.set('userMenu', true) as BaseRecordData;
    },
    [BaseActionType.HIDE_USER_MENU]: (state, action: HideUserMenuAction): BaseRecordData => {
        return state.set('userMenu', false) as BaseRecordData;
    },
    [BaseActionType.SET_FULLSCREEN_LOADER]: (state, action: SetFullscreenLoaderAction): BaseRecordData => {
        const { payload: visibility } = action;
        return state.set('fullscreenLoader', visibility) as BaseRecordData;
    }
}, initialState);