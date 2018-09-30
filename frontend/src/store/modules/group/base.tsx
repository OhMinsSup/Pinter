import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SET_GROUP_MENU = 'group/SET_GROUP_MENU';

export const groupBaseCreators = {
    setGroupMenu: createAction(SET_GROUP_MENU, (visible: boolean) => visible),
}

type SetGroupMenuAction = ReturnType<typeof groupBaseCreators.setGroupMenu>;

export interface GroupBaseState {
    menu: {
        visible: boolean,
    }
}

const initialState: GroupBaseState = {
    menu: {
        visible: false
    }
}

export default handleActions<GroupBaseState, any>({
    [SET_GROUP_MENU]: (state, action: SetGroupMenuAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.menu.visible = action.payload;
        })
    }
}, initialState);