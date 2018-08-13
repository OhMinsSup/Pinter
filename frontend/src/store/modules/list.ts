import { handleActions, createAction } from 'redux-actions';
import { Dispatch, Action } from 'redux';
import * as PinAPI from '../../lib/api/pin';
import * as TagAPI from '../../lib/api/tag';
import * as FollowAPI from '../../lib/api/follow';
import * as CommonAPI from '../../lib/api/common';
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

    LIKE_USER_LIST_SUCCESS = 'list/LIKE_USER_LIST_SUCCESS',
    LIKE_USER_LIST_FALIING = 'list/LIKE_USER_LIST_FALIING',

    COMMENT_USER_LIST_SUCCESS = 'list/COMMENT_USER_LIST_SUCCESS',
    COMMENT_USER_LIST_FALIING = 'list/COMMENT_USER_LIST_FALIING',

    LOCKER_USER_LIST_SUCCESS = 'list/LOCKER_USER_LIST_SUCCESS',
    LOCKER_USER_LIST_FALIING = 'list/LOCKER_USER_LIST_FALIING',

    GET_USER_LIST_PENDING = 'list/GET_USER_LIST_PENDING',
    GET_USER_LIST_SUCCESS = 'list/GET_USER_LIST_SUCCESS',
    GET_USER_LIST_FAILING = 'list/GET_USER_LIST_FAILING',
    PREFETCH_USER_LIST_SUCCESS = 'list/PREFETCH_USER_LIST_SUCCESS',

    GET_USER_FOLLOWING_LIST_PENDING = 'list/GET_USER_FOLLOWING_LIST_PENDING',
    GET_USER_FOLLOWING_LIST_SUCCESS = 'list/GET_USER_FOLLOWING_LIST_SUCCESS',
    GET_USER_FOLLOWING_LIST_FAILING = 'list/GET_USER_FOLLOWING_LIST_FAILING',
    PREFETCH_USER_FOLLOWING_LIST_SUCCESS = 'list/PREFETCH_USER_FOLLOWING_LIST_SUCCESS',
}

export type GetPinListPayload = { pinWithData: PinSubState[], next: string };
export type ListPayload = { usersWithData: UserSubState[], next?: string };

export const actionCreators = {
    revealPrefetched: createAction(ListActionType.REVEAL_PREFETCHED, (type: string) => type),
    getFollowingList: (displayName: string) => (dispatch: Dispatch<Action>) => {        
        dispatch({ type: ListActionType.GET_USER_FOLLOWING_LIST_PENDING })
        return setTimeout(() => {
            return FollowAPI.getFollowingAPI(displayName)
            .then(res => dispatch({
                type: ListActionType.GET_USER_FOLLOWING_LIST_SUCCESS,
                payload: res,
            }))
            .catch(e => dispatch({
                type: ListActionType.GET_USER_FOLLOWING_LIST_FAILING,
                payload: e
            }))
        }, 2000)
    },
    prefetchFollowingList: (next: string) => (dispatch: Dispatch<Action>) => {
        return FollowAPI.nextAPI(next)
        .then(res => dispatch({
            type: ListActionType.PREFETCH_USER_FOLLOWING_LIST_SUCCESS,
            payload: res
        }))
    },
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
    },
    likeUserList: (id: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.liksUserListAPI(id)
        .then(res => dispatch({
            type: ListActionType.LIKE_USER_LIST_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: ListActionType.LIKE_USER_LIST_FALIING,
            payload: e
        }))
    },
    commentUserList: (id: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.commentUserListAPI(id)
        .then(res => dispatch({
            type: ListActionType.COMMENT_USER_LIST_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: ListActionType.COMMENT_USER_LIST_FALIING,
            payload: e
        }))
    },
    lockerUserList: (id: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.lockerUserListAPI(id)
        .then(res => dispatch({
            type: ListActionType.LOCKER_USER_LIST_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: ListActionType.LOCKER_USER_LIST_FALIING,
            payload: e
        }))
    },
    getUsersList: () => (dispatch: Dispatch<Action>) => {
        dispatch({ type: ListActionType.GET_USER_LIST_PENDING })
        return CommonAPI.usersAPI()
        .then(res => dispatch({
            type: ListActionType.GET_USER_LIST_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: ListActionType.GET_PIN_LIST_FAILING,
            payload: e
        }))
    },
    prefetchUserList: (next: string) => (dispatch: Dispatch<Action>) => {
        return CommonAPI.nextAPI(next)
        .then(res => dispatch({
            type: ListActionType.PREFETCH_USER_LIST_SUCCESS,
            payload: res
        }))
    },
}

type RevealPrefetchedAction = ReturnType<typeof actionCreators.revealPrefetched>; 
type GetListAction = GenericResponseAction<GetPinListPayload, string>;
type PrefetchListAction = GenericResponseAction<GetPinListPayload, string>;
type LikeUserListAction = GenericResponseAction<ListPayload, string>;
type CommentUserListAction = GenericResponseAction<ListPayload, string>;
type LockerUserListAction = GenericResponseAction<ListPayload, string>;
type GetUsersListAction = GenericResponseAction<ListPayload, string>;
type PrefetchUserListAction = GenericResponseAction<ListPayload, string>;
type GetFollowingListAction = GenericResponseAction<ListPayload, string>;
type PrefetchFollowingListAction = GenericResponseAction<ListPayload, string>;

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

export interface UserSubState {
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    }
}

export interface ListingSetState {
    pins: PinSubState[],
    prefetched: PinSubState[],
    end: boolean,
    next: string,
    loading: boolean
}

export interface ListingUserSetState {
    user: UserSubState[],
    prefetched: UserSubState[],
    end?: boolean,
    next?: string,
    loading?: boolean
}

export interface ListState {
    list: ListingSetState,
    user: ListingSetState,
    tag: ListingSetState,
    following: ListingUserSetState,
    users: ListingUserSetState,
    like_user: ListingUserSetState,
    comment_user: ListingUserSetState,
    locker_user: ListingUserSetState
}

const initialListingSet = {
    pins: [],
    prefetched: [],
    end: false,
    next: '',
    loading: false
}

const initialUserListingSet = {
    user: [],
    prefetched: [],
    next: '',
    end: false,
    loading: false
}

const initialState: ListState = {
    list: initialListingSet,
    user: initialListingSet,
    tag: initialListingSet,
    following: initialUserListingSet,
    users: initialUserListingSet,
    like_user: initialUserListingSet,
    comment_user: initialUserListingSet,
    locker_user: initialUserListingSet
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
    },
    [ListActionType.LIKE_USER_LIST_SUCCESS]: (state, action: LikeUserListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.like_user = {
                user: action.payload.data.usersWithData,
                prefetched: [],
            } 
        });
    },
    [ListActionType.LIKE_USER_LIST_FALIING]: (state) => {
        return produce(state, (draft) => {
            draft.like_user = {
                user: [],
                prefetched: [],
            } 
        });
    },
    [ListActionType.COMMENT_USER_LIST_SUCCESS]: (state, action: CommentUserListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.comment_user = {
                user: action.payload.data.usersWithData,
                prefetched: []
            }
        })
    },
    [ListActionType.COMMENT_USER_LIST_FALIING]: (state) => {
        return produce(state, (draft) => {
            draft.comment_user = {
                user: [],
                prefetched: [],
            } 
        });
    },
    [ListActionType.LOCKER_USER_LIST_SUCCESS]: (state, action: LockerUserListAction) => {
        return produce(state, (draft) => {
            draft.locker_user = {
                user: action.payload.data.usersWithData,
                prefetched: []
            }
        })
    },
    [ListActionType.LOCKER_USER_LIST_FALIING]: (state) => {
        return produce(state, (draft) => {
            draft.locker_user = {
                user: [],
                prefetched: [],
            } 
        });
    },
    [ListActionType.GET_USER_LIST_SUCCESS]: (state, action: GetUsersListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.users = {
                user: action.payload.data.usersWithData,
                prefetched: [],
                next: action.payload.data.next,
                loading: false
            }
        });
    },
    [ListActionType.GET_PIN_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.users.loading = true
        });
    },
    [ListActionType.GET_USER_LIST_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.users = {
                user: [],
                prefetched: [],
                next: '',
                loading: false
            }
        });
    },
    [ListActionType.PREFETCH_USER_LIST_SUCCESS]: (state, action: PrefetchUserListAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.users.prefetched = action.payload.data.usersWithData;
            draft.users.next = action.payload.data.next;
            if (action.payload.data.usersWithData && action.payload.data.usersWithData.length === 0) {
                draft.list.end = true;
            }
        })
    },
    [ListActionType.GET_USER_FOLLOWING_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.following.loading = true;
        })
    },
    [ListActionType.GET_USER_FOLLOWING_LIST_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.following = {
                user: [],
                prefetched: [],
                next: '',
                loading: false
            }
        })
    },
    [ListActionType.GET_USER_FOLLOWING_LIST_SUCCESS]: (state, action: GetFollowingListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (!data) return;
            draft.following = {
                user: data.usersWithData,
                prefetched: [],
                next: data.next,
                loading: false
            }
        })
    },
    [ListActionType.PREFETCH_USER_FOLLOWING_LIST_SUCCESS]: (state, action: PrefetchFollowingListAction) => {
        return produce(state, (draft) => {
            if (action.payload.data === undefined) return;
            draft.following.prefetched = action.payload.data.usersWithData;
            draft.following.next = action.payload.data.next;
            if (action.payload.data.usersWithData && action.payload.data.usersWithData.length === 0) {
                draft.list.end = true;
            }
        })
    }
}, initialState);
