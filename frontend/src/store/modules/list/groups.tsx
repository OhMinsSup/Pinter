import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from 'src/lib/common';
import * as groupAPI from '../../../lib/API/group';

const GROUP_REVEAL_PREFETCHED = 'list/GROUP_REVEAL_PREFETCHED';
const GET_GROUPS_LIST = 'list/GET_GROUPS_LIST';
const GET_GROUPS_LIST_PENDING = 'list/GET_GROUPS_LIST_PENDING';
const GET_GROUPS_LIST_SUCCESS = 'list/GET_GROUPS_LIST_SUCCESS';
const GET_GROUPS_LIST_ERROR = 'list/GET_GROUPS_LIST_ERROR';

const PREFETCH_GROUP_LIST = 'list/PREFETCH_GROUP_LIST';
const PREFETCH_GROUP_LIST_SUCCESS = 'list/PREFETCH_GROUP_LIST_SUCCESS';

const GROUP_PIN_REVEAL_PREFETCHED = 'list/GROUP_PIN_REVEAL_PREFETCHED';
const GET_GROUP_PIN_LIST = 'list/GET_GROUP_PIN_LIST';
const GET_GROUP_PIN_LIST_PENDING = 'list/GET_GROUP_PIN_LIST_PENDING';
const GET_GROUP_PIN_LIST_SUCCESS = 'list/GET_GROUP_PIN_LIST_SUCCESS';
const GET_GROUP_PIN_LIST_ERROR = 'list/GET_GROUP_PIN_LIST_ERROR';

const PREFETCH_GROUP_PIN_LIST = 'list/PREFETCH_GROUP_PIN_LIST';
const PREFETCH_GROUP_PIN_LIST_SUCCESS = 'list/PREFETCH_GROUP_PIN_LIST_SUCCESS';

const INITIALIZE_GROUP_LIST = 'list/INITIALIZE_GROUP_LIST';

export const groupsCreators = {
  getGroupsList: createPromiseThunk(GET_GROUPS_LIST, groupAPI.groupListAPI),
  prefetchGroupList: createPromiseThunk(PREFETCH_GROUP_LIST, groupAPI.nextAPI),
  groupRevealPrefetched: createAction(GROUP_REVEAL_PREFETCHED),
  groupPinRevealPrefetched: createAction(GROUP_PIN_REVEAL_PREFETCHED),
  getGroupPinList: createPromiseThunk(
    GET_GROUP_PIN_LIST,
    groupAPI.groupPinListAPI
  ),
  prefetchGroupPinList: createPromiseThunk(
    PREFETCH_GROUP_PIN_LIST,
    groupAPI.nextAPI
  ),
  initialize: createAction(INITIALIZE_GROUP_LIST, (active: boolean) => active),
};

type PrefetchGroupListAction = GenericResponseAction<
  {
    next: string;
    groupsWithData: GroupSubState[];
  },
  string
>;
type InitializeAction = ReturnType<typeof groupsCreators.initialize>;
type GetGroupsListAction = GenericResponseAction<
  {
    next: string;
    active: boolean;
    groupsWithData: GroupSubState[];
  },
  string
>;

type GetGroupPinListAction = GenericResponseAction<
  {
    title: string;
    activation: boolean;
    next: string;
    pinsWithData: PinSubState[];
  },
  string
>;
type PrefetchGroupPinListAction = GenericResponseAction<
  {
    next: string;
    pinsWithData: PinSubState[];
  },
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

export interface GroupSubState {
  groupId: string;
  title: string;
  activation: boolean;
  user: {
    _id: string;
    username: string;
    displayName: string;
    thumbnail: string;
  };
}

export interface ListingGroupSetState {
  groups: GroupSubState[];
  prefetched: GroupSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface ListingPinSetState {
  pins: PinSubState[];
  prefetched: PinSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface GroupsState {
  groups: ListingGroupSetState;
  pins: ListingPinSetState;
  active: boolean;
}

const initialListingGroupSet: ListingGroupSetState = {
  groups: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialListingPinSet = {
  pins: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: GroupsState = {
  groups: initialListingGroupSet,
  pins: initialListingPinSet,
  active: false,
};

export default handleActions<GroupsState, any>(
  {
    [INITIALIZE_GROUP_LIST]: (state, action: InitializeAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.groups = {
          end: false,
          groups: [],
          prefetched: [],
          next: '',
          loading: false,
        };

        draft.active = action.payload;
      });
    },
    [GET_GROUPS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.groups.loading = true;
      });
    },
    [GET_GROUPS_LIST_ERROR]: state => {
      return produce(state, draft => {
        draft.groups = {
          end: false,
          groups: [],
          prefetched: [],
          next: '',
          loading: false,
        };
      });
    },
    [GET_GROUPS_LIST_SUCCESS]: (state, action: GetGroupsListAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        if (data === undefined) return;

        draft.groups = {
          end: false,
          groups: data.groupsWithData,
          prefetched: [],
          next: data.next,
          loading: false,
        };
      });
    },
    [GROUP_REVEAL_PREFETCHED]: state => {
      return produce(state, draft => {
        const { groups, prefetched } = draft.groups;
        if (groups && prefetched) {
          groups.push(...prefetched);
          draft.groups.prefetched = [];
        }
      });
    },
    [PREFETCH_GROUP_LIST_SUCCESS]: (state, action: PrefetchGroupListAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        draft.groups.prefetched = data.groupsWithData;
        draft.groups.next = data.next;
        if (data.groupsWithData && data.groupsWithData.length === 0) {
          draft.groups.end = true;
        }
      });
    },
    [GET_GROUP_PIN_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.pins.loading = true;
      });
    },
    [GET_GROUP_PIN_LIST_ERROR]: state => {
      return produce(state, draft => {
        draft.pins = {
          end: false,
          pins: [],
          prefetched: [],
          next: '',
          loading: false,
        };
      });
    },
    [GET_GROUP_PIN_LIST_SUCCESS]: (state, action: GetGroupPinListAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        if (data === undefined) return;

        draft.pins = {
          end: false,
          pins: data.pinsWithData,
          prefetched: [],
          next: data.next,
          loading: false,
        };
      });
    },
    [PREFETCH_GROUP_PIN_LIST_SUCCESS]: (
      state,
      action: PrefetchGroupPinListAction
    ) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        draft.pins.prefetched = data.pinsWithData;
        draft.groups.next = data.next;
        if (data.pinsWithData && data.pinsWithData.length === 0) {
          draft.pins.end = true;
        }
      });
    },
    [GROUP_PIN_REVEAL_PREFETCHED]: state => {
      return produce(state, draft => {
        const { pins, prefetched } = draft.pins;
        if (pins && prefetched) {
          pins.push(...prefetched);
          draft.pins.prefetched = [];
        }
      });
    },
  },
  initialState
);
