import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum PinActionType {
    CHANGE_INPUT = 'pin/CHANGE_INPUT',
    INSERT_TAG = 'pin/INSERT_TAG',
    REMOVE_TAG = 'pin/REMOVE_TAG',
    SET_MAKE_PIN_FULLSCREEN_LOADER = 'pin/SET_MAKE_PIN_FULLSCREEN_LOADER'
}

type ChangeInputPayload = { name: string, value: string }

export const actionCreators = {
    insertTag: createAction(PinActionType.INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(PinActionType.REMOVE_TAG, (tag: string) => tag),
    changeInput: createAction(PinActionType.CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
    setMakePinFullscreenLoader: createAction(PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER, (visible: boolean) => visible)
}

type SetMakePinFullscreenLoaderAction = ReturnType<typeof actionCreators.setMakePinFullscreenLoader>;
type ChangeInputAction = ReturnType<typeof actionCreators.changeInput>;
type InsertTagAction = ReturnType<typeof actionCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof actionCreators.removeTag>;

export interface PinState {
    visible: boolean,
    relation_url: string,
    description: string,
    tags: string[],
}

const initialState: PinState = {
    visible: false,
    relation_url: '',
    description: '',
    tags: []
}

export default handleActions<PinState, any>({
    [PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER]: (state, action: SetMakePinFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.visible = action.payload;
        })
    },
    [PinActionType.CHANGE_INPUT]: (state, action: ChangeInputAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            if (action.payload.name === 'relation_url') {
                draft.relation_url = action.payload.value
            }
            if (action.payload.name === 'description') {
                draft.description = action.payload.value
            }
        })
    },
    [PinActionType.INSERT_TAG]: (state, action: InsertTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tags.push(action.payload);
        });
    },
    [PinActionType.REMOVE_TAG]: (state, action: RemoveTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tags = draft.tags.filter(t => t !== action.payload);
        });
    }
}, initialState);