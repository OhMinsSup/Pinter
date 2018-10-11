import { createAction, handleActions } from 'redux-actions';
import porduce from 'immer';

const SET_MAKE_GRUOP = 'group/SET_MAKE_GRUOP';

export const groupCreators = {
    setMakeGroup: createAction(SET_MAKE_GRUOP, (visible: boolean) => visible),
}

type SetMakeGroupAction = ReturnType<typeof groupCreators.setMakeGroup>;

export interface GroupState {
    MakeModal: {
        visible: boolean
    }
}

const initialState: GroupState = {
    MakeModal: {
        visible: false
    }
}

export default handleActions<GroupState, any>({
    [SET_MAKE_GRUOP]: (state, action: SetMakeGroupAction) => {
        return porduce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.MakeModal.visible = action.payload;
        })
    }
}, initialState);