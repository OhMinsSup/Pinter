import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as commonAPI from '../../lib/API/common';

const INITIALIZE_PROFILE = 'common/INITIALIZE_PROFILE';
const GET_PROFILE = 'common/GET_PROFILE';
const GET_PROFILE_SUCCESS = 'common/GET_PROFILE_SUCCESS';
const GET_PROFILE_PENDING = 'common/GET_PROFILE_PENDING';
const CHANGE_INPUT_PROFILE = 'common/CHANGE_INPUT_PROFILE';

const SEARCH_PIN = 'common/SEARCH_PIN';
const SEARCH_PIN_PENDING = 'common/SEARCH_PIN_PENDING';
const SEARCH_PIN_SUCCESS = 'common/SEARCH_PIN_SUCCESS';
const SEARCH_PIN_ERROR = 'common/SEARCH_PIN_ERROR';

const SEARCH_USER = 'common/SEARCH_USER';
const SEARCH_USER_PENDING = 'common/SEARCH_USER_PENDING';
const SEARCH_USER_SUCCESS = 'common/SEARCH_USER_SUCCESS';

const PREFETCH_LIST = 'commom/PREFETCH_LIST';
const PREFETCH_LIST_SUCCESS = 'common/PREFETCH_LIST_SUCCESS';

const REVEAL_PREFETCHED  = 'common/REVEAL_PREFETCHED';
const CHANGE_SEARCH_VALUE = 'common/CHANGE_SEARCH_VALUE';
const INITIALIZE_SEARCH = 'common/INITIALIZE_SEARCH';

const CREATE_NOTICE = 'common/CREATE_NOTICE';
const CREATE_NOTICE_SUCCESS = 'common/CREATE_NOTICE_SUCCESS';

const SEND_MESSAGE = 'commom/SEND_MESSAGE';

type ChangeInputProfilePayload = { value: string, name: string };

export const commonCreators = {
    initializeProfile: createAction(INITIALIZE_PROFILE),
    initializeSearch: createAction(INITIALIZE_SEARCH),
    changeSearchValue: createAction(CHANGE_SEARCH_VALUE, (value: string | undefined) => value),
    changeInputProfile: createAction(CHANGE_INPUT_PROFILE, (payload: ChangeInputProfilePayload) => payload),
    getProfile: createPromiseThunk(GET_PROFILE, commonAPI.getProfileAPI),
    searchPin: createPromiseThunk(SEARCH_PIN, commonAPI.searchPinAPI),
    searchUser: createPromiseThunk(SEARCH_USER, commonAPI.searchUserAPI),
    prefetchList: createPromiseThunk(PREFETCH_LIST, commonAPI.nextAPI),
    revealPrefetched: createAction(REVEAL_PREFETCHED, (type: string) => type),
    createNotice: createPromiseThunk(CREATE_NOTICE, commonAPI.createNoticeRoomAPI),
    sendMessage: createPromiseThunk(SEND_MESSAGE, commonAPI.sendMessageNoticeAPI),
}

type GetProfileAction = GenericResponseAction<{
    username: string,
    displayName: string,
    thumbnail: string,
    userId: string,
    follower: number,
    following: number,
    pin: number,
 }, string>;
type ChangeInputProfileAction = ReturnType<typeof commonCreators.changeInputProfile>;
type SearchDataAction = GenericResponseAction<{
    next: string,
    Data: any[]
}, string>;
type PrefetchListAction = GenericResponseAction<{ Data: any[], next: string }, string>; 
type RevealPrefetchedAction = ReturnType<typeof commonCreators.revealPrefetched>;
type ChangeSearchValueAction = ReturnType<typeof commonCreators.changeSearchValue>;
type CreateNoticeAction = GenericResponseAction<{ noticeWithData: {
    noticeId: string,
    creator: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string,
    }
}}, string>;

export interface UserProfileSubState {
    username: string;
    displayName: string;
    thumbnail: string;
    userId: string;
    follower: number;
    following: number;
    pin: number;
    loading: boolean;
}

export interface CommonState {
    profile: UserProfileSubState
    setting: {
        displayName: string,
        thumbnail: string,
    },
    search: {
        next: string,
        loading: boolean,
        Data: any[],
        prefetched: any[],
        end: boolean,
    },
    notice: {
        noticeId: string
    }
    value: string,
}

const initialState: CommonState = {
    profile: {
        username: '',
        userId: '',
        thumbnail: '',
        displayName: '',
        follower: 0,
        following: 0,
        pin: 0,
        loading: false,
    },
    setting : {
        displayName: '',
        thumbnail: '',
    },
    search: {
        next: '',
        loading: false,
        Data: [],
        prefetched: [],
        end: false,
    },
    notice: {
        noticeId: '',
    },
    value: '',
}

export default handleActions<CommonState, any>({
    [INITIALIZE_PROFILE]: (state) => {
        return produce(state, (draft) => {
            draft.profile = {
                userId: '',
                username: '',
                thumbnail: '',
                displayName: '',
                follower: 0,
                following: 0,
                pin: 0,
                loading: false,
            },
            draft.setting = {
                displayName: '',
                thumbnail: '',
            }
        })
    },
    [INITIALIZE_SEARCH]: (state) => {
        return produce(state, (draft) => {
            draft.value = '',
            draft.search = {
                next: '',
                loading: false,
                Data: [],
                prefetched: [],
                end: false,
            }
        })
    },
    [CREATE_NOTICE_SUCCESS]: (state, action: CreateNoticeAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            draft.notice.noticeId = data.noticeWithData.noticeId;
        });
    },
    [GET_PROFILE_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.profile.loading = true;
        })
    },
    [GET_PROFILE_SUCCESS]: (state, action: GetProfileAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.profile = {
                username: data.username,
                userId: data.userId,
                thumbnail: data.thumbnail,
                displayName: data.displayName,
                follower: data.follower,
                following: data.following,
                pin: data.pin,
                loading: false
            };
            draft.setting = {
                displayName: data.displayName,
                thumbnail: data.thumbnail,
            };
        })
    },
    [CHANGE_INPUT_PROFILE]: (state, action: ChangeInputProfileAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.setting[action.payload.name] = action.payload.value;
        })
    },
    [SEARCH_PIN_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.search.loading = true;
        });
    },
    [SEARCH_PIN_SUCCESS]: (state, action: SearchDataAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data.Data === undefined) return;            
            draft.search = {
                loading: false,
                next: data.next,
                Data: data.Data,
                prefetched: [],
                end: false,
            }
        });
    },
    [SEARCH_PIN_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.search = {
                loading: false,
                next: '',
                Data: [],
                prefetched: [],
                end: false
            }
        })
    },
    [SEARCH_USER_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.search.loading = true;
        });
    },
    [SEARCH_USER_SUCCESS]: (state, action: SearchDataAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            
            if (data.Data === undefined || data.Data.length === 0) {
                draft.search = {
                    loading: false,
                    next: '',
                    Data: [],
                    prefetched: [],
                    end: false,
                }
                return;
            }

            draft.search = {
                loading: false,
                next: data.next,
                Data: data.Data,
                prefetched: [],
                end: false
            }
        });
    },
    [PREFETCH_LIST_SUCCESS]: (state, action: PrefetchListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            draft.search.prefetched = data.Data;
            draft.search.next = data.next;
            if (data.Data && data.Data.length === 0) {
                draft.search.end = true;
            }
        })
    },
    [REVEAL_PREFETCHED]: (state, action: RevealPrefetchedAction) => {
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
    [CHANGE_SEARCH_VALUE]: (state, action: ChangeSearchValueAction) => {
        const { payload } = action;
        return produce(state, (draft) => {
            if (payload === undefined) return;
            draft.value = payload;
        });
    }
}, initialState);