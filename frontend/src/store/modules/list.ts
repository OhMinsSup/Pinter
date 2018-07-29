import { handleActions, createAction } from 'redux-actions';
import { Dispatch, Action } from 'redux';
import * as PinAPI from '../../lib/api/pin';
import * as TagAPI from '../../lib/api/tag';
import { GenericResponseAction } from '../../lib/common';
import produce from 'immer';

export enum ListActionType {
    REVEAL_PREFETCHED = 'list/REVEAL_PREFETCHED',
    GET_PIN_LIST_PENDING = 'list/GET_PIN_LIST_PENDING',
    GET_PIN_LIST_SUCCESS = 'list/GET_PIN_LIST_SUCCESS',
    GET_PIN_LIST_FAILING = 'list/GET_PIN_LIST_FAILING',
    PREFETCH_PIN_LIST_SUCCESS = 'list/PREFETCH_PIN_LIST_SUCCESS',

    GET_USER_PIN_LIST_PENDING = 'list/GET_USER_PIN_LIST_PENDING',
    GET_USER_PIN_LIST_SUCCESS = 'list/GET_USER_PIN_LIST_SUCCESS',
    GET_USER_PIN_LIST_FAILING = 'list/GET_USER_PIN_LIST_FAILING',
    PREFETCH_USER_PIN_LIST_SUCCESS = 'list/PREFETCH_USER_PIN_LIST_SUCCESS',

    GET_TAG_PIN_LIST_PENDING = 'list/GET_TAG_PIN_LIST_PENDING',
    GET_TAG_PIN_LIST_SUCCESS = 'list/GET_TAG_PIN_LIST_SUCCESS',
    GET_TAG_PIN_LIST_FAILING = 'list/GET_TAG_PIN_LIST_FAILING',
}

export type GetPinListPayload = { pinWithData: PinSubState[], next: string };

export const actionCreators = {
    revealPrefetched: createAction(ListActionType.REVEAL_PREFETCHED, (type: string) => type),
    getPinList: () => (dispatch: Dispatch<Action>) => {
        dispatch({ type: ListActionType.GET_PIN_LIST_PENDING })
        return setTimeout(() => {
            return PinAPI.listPinAPI()
            .then(res => dispatch({
                type: ListActionType.GET_PIN_LIST_SUCCESS,
                payload: res
            }))
            .catch(e => dispatch({
                type: ListActionType.GET_PIN_LIST_FAILING,
                payload: e
            }))
        }, 2000)
    },
    prefetchPinList: (next: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.nextAPI(next)
        .then(res => dispatch({
            type: ListActionType.PREFETCH_PIN_LIST_SUCCESS,
            payload: res
        }))
    },
    getUserPinList: (displayName: string) => (dispatch: Dispatch<Action>) => {
        dispatch({ type: ListActionType.GET_USER_PIN_LIST_PENDING })
        return setTimeout(() => {
            return PinAPI.listPinAPI(displayName)
            .then(res => dispatch({
                type: ListActionType.GET_USER_PIN_LIST_SUCCESS,
                payload: res
            }))
            .catch(e => dispatch({
                type: ListActionType.GET_USER_PIN_LIST_FAILING,
                payload: e
            })) 
        }, 2000)
    },
    prefetchUserPinList: (next: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.nextAPI(next) 
        .then(res => dispatch({
            type: ListActionType.PREFETCH_USER_PIN_LIST_SUCCESS,
            payload: res
        }))
    },
    getTagPinList: (tag: string) => (disaptch: Dispatch<Action>) => {
        disaptch({ type: ListActionType.GET_TAG_PIN_LIST_PENDING })
        return setTimeout(() => {
            return  TagAPI.getTagInfoAPI(tag)
            .then(res => disaptch({
                type: ListActionType.GET_TAG_PIN_LIST_SUCCESS,
                payload: res,
            }))
            .catch(e => disaptch({
                type: ListActionType.GET_TAG_PIN_LIST_FAILING,
                payload: e
            }))
        })
    }
}

type RevealPrefetchedAction = ReturnType<typeof actionCreators.revealPrefetched>; 
type GetListAction = GenericResponseAction<GetPinListPayload, string>;
type PrefetchListAction = GenericResponseAction<GetPinListPayload, string>;

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

export interface ListState {
    list: ListingSetState,
    user: ListingSetState,
    tag: ListingSetState
}

const initialListingSet = {
    pins: [],
    prefetched: [],
    end: false,
    next: '',
    loading: false
}

const initialState: ListState = {
    list: initialListingSet,
    user: initialListingSet,
    tag: initialListingSet
}

export default handleActions<ListState, any>({
    [ListActionType.REVEAL_PREFETCHED]: (state, action: RevealPrefetchedAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            const { payload } = action;
            const { pins, prefetched } = draft[payload];
            if (pins && prefetched) {
                pins.push(...prefetched);
                draft[payload].prefetched = null;
            }
        })
    },
    [ListActionType.GET_PIN_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.list.loading = true
        });
    },
    [ListActionType.GET_PIN_LIST_SUCCESS]: (state, action: GetListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.list = {
                end: false,
                pins: action.payload.data.pinWithData,
                prefetched: [],
                next: action.payload.data.next,
                loading: false
            }
        })
    },
    [ListActionType.GET_PIN_LIST_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.list = {
                end: false,
                pins: [],
                prefetched: [],
                next: '',
                loading: false
            }
        })
    },
    [ListActionType.PREFETCH_PIN_LIST_SUCCESS]: (state, action: PrefetchListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.list.prefetched = action.payload.data.pinWithData;
            draft.list.next = action.payload.data.next;
            if (action.payload.data.pinWithData && action.payload.data.pinWithData.length === 0) {
                draft.list.end = true;
            }
        })
    },
    [ListActionType.GET_USER_PIN_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.user.loading = true;
        })
    },
    [ListActionType.GET_USER_PIN_LIST_SUCCESS]: (state, action: GetListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user = {
                end: false,
                pins: action.payload.data.pinWithData,
                prefetched: [],
                next: action.payload.data.next,
                loading: false
            }
        })
    },
    [ListActionType.GET_USER_PIN_LIST_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.user = {
                end: false,
                pins: [],
                prefetched: [],
                next: '',
                loading: false
            }
        })
    },
    [ListActionType.PREFETCH_USER_PIN_LIST_SUCCESS]: (state, action: PrefetchListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.user.prefetched = action.payload.data.pinWithData;
            draft.user.next = action.payload.data.next;
            if (action.payload.data.pinWithData && action.payload.data.pinWithData.length === 0) {
                draft.user.end = true;
            }
        })
    },
    [ListActionType.GET_TAG_PIN_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.tag.loading = true;
        })
    },
    [ListActionType.GET_TAG_PIN_LIST_SUCCESS]: (state, action: GetListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.tag = {
                end: false,
                pins: action.payload.data.pinWithData,
                prefetched: [],
                next: '',
                loading: false
            }
        })
    },
    [ListActionType.GET_TAG_PIN_LIST_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.tag = {
                end: false,
                pins: [],
                prefetched: [],
                next: '',
                loading: false
            }
        })
    }
}, initialState);
