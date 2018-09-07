import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT  = 'group/CHANGE_INPUT';

type ChangeInputPayload = { name: string, value: string | boolean };

export const groupWrtieCreatros = {
    changeInput: createAction(CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
}

type ChangeInputAction = ReturnType<typeof groupWrtieCreatros.changeInput>;

export interface GroupWriteState {
    form: {
        title: string,
        description: string,
        thumbnail: string,
        type: {
            public: boolean,
            private: boolean
        },
    }
}

const initialState: GroupWriteState = {
    form: {
        title: '',
        description: '',
        thumbnail: '',
        type: {
            public: true,
            private: false,
        },
    }
}

export default handleActions<GroupWriteState, any>({
    [CHANGE_INPUT]: (state, action: ChangeInputAction) => {
        const { payload } = action;
        return produce(state, (draft) => {
            if (payload === undefined) return;
            draft.form[payload.name] = payload.value;
        })
    }
}, initialState);