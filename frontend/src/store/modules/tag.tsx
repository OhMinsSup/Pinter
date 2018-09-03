import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction, createPromiseThunk } from '../../lib/common';
import * as TagAPI from '../../lib/API/tag';

const SET_TAG_INFO = 'tag/SET_TAG_INFO';

const GET_TAG_INFO = 'tag/GET_TAG_INFO';
const GET_TAG_INFO_SUCCESS = 'tag/GET_TAG_INFO_SUCCESS';

const GET_TAGS = 'tag/GET_TAGS';
const GET_TAGS_SUCCESS = 'tag/GET_TAGS_SUCCESS';


export const tagCreators = {
    setTagInfo: createAction(SET_TAG_INFO),
    getTags: createPromiseThunk(GET_TAGS, TagAPI.getTagsAPI),
    getTagInfo: createPromiseThunk(GET_TAG_INFO, TagAPI.getTagInfoAPI),
}

type SetTagInfoAction = ReturnType<typeof tagCreators.setTagInfo>;
type GetTagInfoAction = GenericResponseAction<{ pinWithData: PinSubState[], next: string }, string>;
type GetTagsAction = GenericResponseAction<TagDataSubState[], string>;

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

export interface TagDataSubState {
    tagId: string,
    name: string,
    count: number
}

export interface TagState {
    tags: TagDataSubState[],
    selected: PinSubState[],
    lastParam: string,
    sort: string
}

const initialState: TagState = {
    tags: [],
    selected: [],
    lastParam: '',
    sort: 'latest'
}

export default handleActions<TagState, any>({
    [GET_TAGS_SUCCESS]: (state, action: GetTagsAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.tags = action.payload.data;
            draft.sort = action.meta;
        })
    },
    [SET_TAG_INFO]: (state, action: SetTagInfoAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.selected = [];
        })
    },
    [GET_TAG_INFO_SUCCESS]: (state, action: GetTagInfoAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.selected = action.payload.data.pinWithData
        });
    },
}, initialState);