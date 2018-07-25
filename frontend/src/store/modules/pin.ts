import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum PinActionType {
    SET_MAKE_PIN_FULLSCREEN_LOADER = 'pin/SET_MAKE_PIN_FULLSCREEN_LOADER'
}

export const actionCreators = {
    setMakePinFullscreenLoader: createAction(PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER, (visible: boolean) => visible)
}

type SetMakePinFullscreenLoaderAction = ReturnType<typeof actionCreators.setMakePinFullscreenLoader>;

export interface PinState {
    visible: boolean
}

const initialState: PinState = {
    visible: false
}

export default handleActions<PinState, any>({
    [PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER]: (state, action: SetMakePinFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.visible = action.payload;
        })
    }
}, initialState);