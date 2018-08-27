import { handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as PinAPI from '../../lib/API/pin';

const GET_PIN = 'pin/GET_PIN';
const GET_PIN_SUCCESS = 'pin/GET_PIN_SUCCESS';
const GET_PIN_PENDING = 'pin/GET_PIN_PENDING';

export const pinCreators = {
    getPin: createPromiseThunk(GET_PIN, PinAPI.readPinAPI)
}

type GetPinAction = GenericResponseAction<{
    pinId: string,
    relationUrl: string,
    body: string,
    urls: string[],
    createdAt: string,
    tags: string[],
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    },
    comments: number,
    likes: number,
}, string>;

export interface PinSubState {
    pinId: string, 
    relationUrl: string, 
    body: string, 
    urls: string[], 
    createdAt: string,
    tags: string[],
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    },
    comments: number,
    likes: number,
}

export interface PinState {
    pin: PinSubState;
    loading: {
        pin: boolean,
    }
}

const initialState: PinState = {
    pin: {
        pinId: '', 
        relationUrl: '', 
        body: '', 
        urls: [], 
        createdAt: '',
        tags: [],
        user: {
            _id: '',
            username: '',
            displayName: '',
            thumbnail: ''
        },
        comments: 0,
        likes: 0,
    },
    loading: {
        pin: false
    }
}

export default handleActions<PinState, any>({
    [GET_PIN_PENDING]:(state) => {
        return produce(state, (draft) => {
            draft.loading.pin = true;
        })
    },
    [GET_PIN_SUCCESS]: (state, action: GetPinAction) => {
        const { payload: { data: pin } } = action;
        return produce(state, (draft) => {
            if (pin === undefined) return;
            draft.pin = pin;
            draft.loading.pin= false;
        })
    }
}, initialState);