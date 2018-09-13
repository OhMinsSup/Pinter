import { handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as LockerAPI from '../../lib/API/locker';

const LOCKER_PIN = 'locker/LOCKER_PIN';
const LOCKER_PIN_SUCCESS = 'locker/LOCKER_PIN_SUCCESS';
const LOCKER_PIN_PENDING = 'locker/LOCKER_PIN_PENDING';
const LOCKER_PIN_ERROR = 'locker/LOCKER_PIN_ERROR';

const UNLOCKER_PIN = 'locker/UNLOCKER_PIN';
const UNLOCKER_PIN_SUCCESS = 'locker/UNLOCKER_PIN_SUCCESS';
const UNLOCKER_PIN_PENDING = 'locker/UNLOCKER_PIN_PENDING';
const UNLOCKER_PIN_ERROR = 'locker/UNLOCKER_PIN_ERROR';

const GET_LOCKER_PIN = 'locker/GET_LOCKER_PIN';
const GET_LOCKER_PIN_SUCCESS = 'locker/GET_LOCKER_PIN_SUCCESS';

export const lockerCreators = {
    lockerPin: createPromiseThunk(LOCKER_PIN, LockerAPI.lockerPinAPI),
    unlockerPin: createPromiseThunk(UNLOCKER_PIN, LockerAPI.unlockerPinAPI),
    getLockerPin: createPromiseThunk(GET_LOCKER_PIN, LockerAPI.getlockerPinAPI),
}

type LockerPinAction = GenericResponseAction<{ locker: boolean }, string>;
type UnLockerPinAction = GenericResponseAction<{ locker: boolean }, string>;
type GetLockerPinAcion = GenericResponseAction<{ locker: boolean }, string>;

export interface LockerState {
    locker: boolean;
}

const initialState: LockerState = {
    locker: false,
}

export default handleActions<LockerState, any>({
    [LOCKER_PIN_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.locker = true;
        })
    },
    [LOCKER_PIN_SUCCESS]: (state, action: LockerPinAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.locker = data.locker;
        })
    },
    [LOCKER_PIN_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.locker = false;
        })
    },
    [UNLOCKER_PIN_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.locker = false;
        })
    },
    [UNLOCKER_PIN_SUCCESS]: (state, action: UnLockerPinAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.locker = data.locker;
        })
    },
    [UNLOCKER_PIN_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.locker = true;
        })
    },
    [GET_LOCKER_PIN_SUCCESS]: (state, action: GetLockerPinAcion) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {            
            if (data === undefined) return;
            draft.locker = data.locker;
        })
    }
}, initialState);