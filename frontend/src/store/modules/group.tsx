import { createAction, handleActions } from 'redux-actions';
import porduce from 'immer';

const SET_MAKE_GRUOP = 'group/SET_MAKE_GRUOP';
const SET_GROUP_PIN = 'group/SET_GROUP_PIN';

export const groupCreators = {
    setGroupPin: createAction(SET_GROUP_PIN, (visible: boolean) => visible),
    setMakeGroup: createAction(SET_MAKE_GRUOP, (visible: boolean) => visible),
}

type SetMakeGroupAction = ReturnType<typeof groupCreators.setMakeGroup>;
type SetGroupPinAction = ReturnType<typeof groupCreators.setGroupPin>;

export interface GroupState {
    MakeModal: {
        visible: boolean
    },
    groupPinModal: {
        visible: boolean,
    },
    submit: {
        pinId: string,
        groupId: string
    }
}

const initialState: GroupState = {
    MakeModal: {
        visible: false
    },
    groupPinModal: {
        visible: false,
    },
    submit: {
        pinId: '',
        groupId: ''
    }
}

export default handleActions<GroupState, any>({
    [SET_MAKE_GRUOP]: (state, action: SetMakeGroupAction) => {
        return porduce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.MakeModal.visible = action.payload;
        })
    },
    [SET_GROUP_PIN]: (state, action: SetGroupPinAction) => {
        return porduce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.groupPinModal.visible = action.payload;
        })
    }
}, initialState);