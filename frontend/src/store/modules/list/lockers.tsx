import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as LockerAPI from '../../../lib/API/locker';

const REVEAL_LOCKER_PREFETCHED  = 'list/REVEAL_LOCKER_PREFETCHED';
const GET_LOCKER_LIST = 'list/GET_LOCKER_LIST';
const GET_LOCKER_LIST_SUCCESS = 'list/GET_LOCKER_LIST_SUCCESS';
const GET_LOCKER_LIST_PENDING = 'list/GET_LOCKER_LIST_PENDING';
const GET_LOCKER_LIST_ERROR = 'list/GET_LOCKER_LIST_ERROR';

const PREFETCH_LOCKER_LIST = 'list/PREFETCH_PIN_LIST';
const PREFETCH_LOCKER_LIST_SUCCESS = 'list/PREFETCH_PIN_LIST_SUCCESS';

export const lockersCreators = {
    revealLockerPrefetched: createAction(REVEAL_LOCKER_PREFETCHED, (type: string) => type),
    getLockerList: createPromiseThunk(GET_LOCKER_LIST, LockerAPI.listLockerAPI),
    prefetchLockerList: createPromiseThunk(PREFETCH_LOCKER_LIST, LockerAPI.nextAPI),
}

type RevealLockerPrefetchedAction = ReturnType<typeof lockersCreators.revealLockerPrefetched>;
type GetLockerListAction = GenericResponseAction<{ pinWithData: PinSubState[], next: string }, string>;
type PrefetchLockerListAction = GenericResponseAction<{ pinWithData: PinSubState[], next: string }, string>;

export interface PinSubState {
    pinId: string, 
    relation_url: string, 
    description: string, 
    urls: string[], 
    createdAt: string,
    tags: string[],
    likes: number,
    comments: number,
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    },
}

export interface ListingSetState {
    pins: PinSubState[],
    prefetched: PinSubState[],
    end: boolean,
    next: string,
    loading: boolean
}

export interface LockersState {
    locker: ListingSetState
}

const initialListingSet: ListingSetState = {
    pins: [],
    prefetched: [],
    end: false,
    next: '',
    loading: false
}

const initialState: LockersState = {
    locker: initialListingSet,
}

export default handleActions<LockersState, any>({
    [REVEAL_LOCKER_PREFETCHED]: (state, action: RevealLockerPrefetchedAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { payload } = action;
            const { pins, prefetched } = draft[payload];
            if (pins && prefetched) {
                pins.push(...prefetched);
                draft[payload].prefetched = null;
            }
        });
    },
    [PREFETCH_LOCKER_LIST_SUCCESS]: (state, action: PrefetchLockerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.locker.prefetched = data.pinWithData;
            draft.locker.next = data.next;
            if (data.pinWithData && data.pinWithData.length === 0) {
                draft.locker.end = true;
            }
        })
    },
    [GET_LOCKER_LIST_SUCCESS]: (state, action: GetLockerListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.locker = {
                end: false,
                pins: data.pinWithData,
                prefetched: [],
                next: data.next,
                loading: false
            }
        })
    },
    [GET_LOCKER_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.locker.loading = true;
        });
    },
    [GET_LOCKER_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.locker.loading = false;
        })
    }
}, initialState);