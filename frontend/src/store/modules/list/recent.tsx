import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as ListAPI from '../../../lib/API/list';

const REVEAL_PREFETCHED = 'list/REVEAL_PREFETCHED';
const GET_PIN_LIST = 'list/GET_PIN_LIST';
const GET_PIN_LIST_PENDING = 'list/GET_PIN_LIST_PENDING';
const GET_PIN_LIST_SUCCESS = 'list/GET_PIN_LIST_SUCCESS';
const GET_PIN_LIST_ERROR = 'list/GET_PIN_LIST_ERROR';

const PREFETCH_PIN_LIST = 'list/PREFETCH_PIN_LIST';
const PREFETCH_PIN_LIST_SUCCESS = 'list/PREFETCH_PIN_LIST_SUCCESS';

export const recentCreators = {
  revealPrefetched: createAction(REVEAL_PREFETCHED),
  getPinList: createPromiseThunk(GET_PIN_LIST, ListAPI.listPinAPI),
  prefetchPinList: createPromiseThunk(PREFETCH_PIN_LIST, ListAPI.nextAPI),
};

type GetPinListAction = GenericResponseAction<
  { pinWithData: PinSubState[]; next: string },
  string
>;
type PrefetchPinListAction = GenericResponseAction<
  { pinWithData: PinSubState[]; next: string },
  string
>;

export interface PinSubState {
  pinId: string;
  relation_url: string;
  description: string;
  urls: string[];
  createdAt: string;
  tags: string[];
  likes: number;
  comments: number;
  user: {
    _id: string;
    username: string;
    displayName: string;
    thumbnail: string;
  };
}

export interface ListingSetState {
  pins: PinSubState[];
  prefetched: PinSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface RecentState {
  recent: ListingSetState;
}

const initialListingSet: ListingSetState = {
  pins: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: RecentState = {
  recent: initialListingSet,
};

export default handleActions<RecentState, any>(
  {
    [GET_PIN_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.recent.loading = true;
      });
    },
    [GET_PIN_LIST_ERROR]: state => {
      return produce(state, draft => {
        draft.recent = {
          end: false,
          pins: [],
          prefetched: [],
          next: '',
          loading: false,
        };
      });
    },
    [GET_PIN_LIST_SUCCESS]: (state, action: GetPinListAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        if (data === undefined) return;
        draft.recent = {
          end: false,
          pins: data.pinWithData,
          prefetched: [],
          next: data.next,
          loading: false,
        };
      });
    },
    [REVEAL_PREFETCHED]: state => {
      return produce(state, draft => {
        const { pins, prefetched } = draft.recent;
        if (pins && prefetched) {
          pins.push(...prefetched);
          draft.recent.prefetched = [];
        }
      });
    },
    [PREFETCH_PIN_LIST_SUCCESS]: (state, action: PrefetchPinListAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        draft.recent.prefetched = data.pinWithData;
        draft.recent.next = data.next;
        if (data.pinWithData && data.pinWithData.length === 0) {
          draft.recent.end = true;
        }
      });
    },
  },
  initialState
);
