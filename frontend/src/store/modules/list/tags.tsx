import { handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../../lib/common';
import * as TagAPI from '../../../lib/API/tag';

const GET_TAG_LIST = 'list/GET_TAG_LIST';
const GET_TAG_LIST_SUCCESS = 'list/GET_TAG_LIST_SUCCESS';
const GET_TAG_LIST_PENDING = 'list/GET_TAG_LIST_PENDING';
const GET_TAG_LIST_ERROR = 'list/GET_TAG_LIST_ERROR';

export const tagsCreators = {
    getTagList: createPromiseThunk(GET_TAG_LIST, TagAPI.getTagInfoAPI),
}

type GetTagListAction = GenericResponseAction<{ pinWithData: PinSubState[] }, string>;

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
    loading: boolean
}

export interface TagsState {
    tag: ListingSetState
}

const initialListingSet: ListingSetState = {
    pins: [],
    loading: false
}

const initialState: TagsState = {
    tag: initialListingSet,
}

export default handleActions<TagsState, any>({
    [GET_TAG_LIST_SUCCESS]: (state, action: GetTagListAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.tag = {
                pins: data.pinWithData,
                loading: false
            }
        })
    },
    [GET_TAG_LIST_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.tag.loading = true;
        });
    },
    [GET_TAG_LIST_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.tag.loading = false;
        })
    }
}, initialState);