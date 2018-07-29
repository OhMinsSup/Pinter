import { handleActions, createAction } from 'redux-actions';
import { Dispatch, Action } from 'redux';
import { GenericResponseAction } from '../../lib/common';
import * as TagAPI from '../../lib/api/tag';
import produce from 'immer';
import { GetPinListPayload, PinSubState } from './list';

export enum TagActionType {
    SET_TAG_INFO = 'common/SET_TAG_INFO',
    GET_TAG_INFO_SUCCESS = 'common/GET_TAG_INFO_SUCCESS',
    GET_TAG_INFO_FAILING = 'common/GET_TAG_INFO_FAILING',
    GET_TAGS_SUCCESS = 'common/GET_TAGS_SUCCESS',
    GET_TAGS_FAILING = 'common/GET_TAGS_FAILING',
}

export const actionsCreators = {
    setTagInfo: createAction(TagActionType.SET_TAG_INFO),
    getTags: (sort: string) => (dispatch: Dispatch<Action>) => {
        return TagAPI.getTagsAPI(sort)
        .then(res => dispatch({
            type: TagActionType.GET_TAGS_SUCCESS,
            payload: res,
            meta: sort
        }))
        .catch(e => dispatch({
            type: TagActionType.GET_TAGS_FAILING,
            payload: e
        }))
    },
    getTagInfo: (tag: string) => (disaptch: Dispatch) => {
        return TagAPI.getTagInfoAPI(tag)
        .then(res => disaptch({
            type: TagActionType.GET_TAG_INFO_SUCCESS,
            payload: res,
        }))
        .catch(e => disaptch({
            type: TagActionType.GET_TAG_INFO_FAILING,
            payload: e
        }))
    }
}

type SetTagInfoAction = ReturnType<typeof actionsCreators.setTagInfo>;
type GetTagInfoAction = GenericResponseAction<GetPinListPayload, string>;
type GetTagsAction = GenericResponseAction<TagDataSubState[], string>;

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
    [TagActionType.GET_TAGS_SUCCESS]: (state, action: GetTagsAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.tags = action.payload.data;
            draft.sort = action.meta;
        })
    },
    [TagActionType.GET_TAGS_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.tags = [];
            draft.sort = 'latest';
        })
    },
    [TagActionType.SET_TAG_INFO]: (state, action: SetTagInfoAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.selected = [];
        })
    },
    [TagActionType.GET_TAG_INFO_SUCCESS]: (state, action: GetTagInfoAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.selected = action.payload.data.pinWithData
        });
    },
    [TagActionType.GET_TAG_INFO_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.selected = [];
        })
    }
}, initialState);