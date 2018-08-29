import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as PinAPI from '../../lib/API/pin';

const GET_PIN = 'pin/GET_PIN';
const GET_PIN_SUCCESS = 'pin/GET_PIN_SUCCESS';
const GET_PIN_PENDING = 'pin/GET_PIN_PENDING';

const CHANGE_INPUT_COMMENT = 'pin/CHANGE_INPUT_COMMENT';
const INSERT_TAG = 'pin/INSERT_TAG';
const REMOVE_TAG = 'pin/REMOVE_TAG';

const WRITE_COMMENT = 'pin/WRITE_COMMENT';
const WRITE_COMMENT_SUCCESS = 'pin/WRITE_COMMENT_SUCCESS';

const REMOVE_COMMENT = 'pim/REMOVE_COMMENT';

const LIST_COMMENT = 'pin/LIST_COMMENT';
const LIST_COMMENT_SUCCESS = 'pin/LIST_COMMENT_SUCCESS';

const LIKE_PIN = 'pin/LIKE_PIN';
const LIKE_PIN_PENDING = 'pin/LIKE_PIN_PENDING';
const LIKE_PIN_SUCCESS = 'pin/LIKE_PIN_SUCCESS';
const LIKE_PIN_ERROR = 'pin/LIKE_PIN_ERROR';

const UNLIKE_PIN = 'pin/UNLIKE_PIN';
const UNLIKE_PIN_PENDING = 'pin/UNLIKE_PIN_PENDING';
const UNLIKE_PIN_SUCCESS = 'pin/UNLIKE_PIN_SUCCESS';
const UNLIKE_PIN_ERROR = 'pin/UNLIKE_PIN_ERROR';

const GET_LIKE = 'pin/GET_LIKE';
const GET_LIKE_SUCCESS = 'pin/GET_LIKE_SUCCESS';

type ChangeInputCommentPayload = { value: string, name: string };

export const pinCreators = {
    getPin: createPromiseThunk(GET_PIN, PinAPI.readPinAPI),
    insertTag: createAction(INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(REMOVE_TAG, (tag: string) => tag),
    changeInputComment: createAction(CHANGE_INPUT_COMMENT, (payload: ChangeInputCommentPayload) => payload),
    writeComment: createPromiseThunk(WRITE_COMMENT, PinAPI.writeCommentAPI),
    listComment: createPromiseThunk(LIST_COMMENT, PinAPI.listCommentAPI),
    likePin: createPromiseThunk(LIKE_PIN, PinAPI.likePinAPI),
    unlikePin: createPromiseThunk(UNLIKE_PIN, PinAPI.unlikePinAPI),
    getLike: createPromiseThunk(GET_LIKE, PinAPI.getlikePinAPI),
    removeComment: createAction(REMOVE_COMMENT, PinAPI.deleteCommentAPI),
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
type ChangeInputCommentAction = ReturnType<typeof pinCreators.changeInputComment>;
type InsertTagAction = ReturnType<typeof pinCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof pinCreators.removeTag>;
type ListCommentAction = GenericResponseAction<{
    commentWithData: CommentSubState[]
},string>;
type LikePinAction = GenericResponseAction<{ likes: number, liked: boolean }, string>;
type UnLikePinAction = GenericResponseAction<{ likes: number, liked: boolean }, string>;
type GetLikePinAction = GenericResponseAction<{ likes: number, liked: boolean }, string>;

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

export interface CommentSubState {
    commentId: string,
    text: string,
    createdAt: string,
    tagId: string[],
    tagName: string[],
    user: {
        _id: string,
        username: string,
        displayName: string,
        thumbnail: string
    }
}

export interface PinState {
    pin: PinSubState;
    loading: {
        pin: boolean,
    },
    comment: {
        value: string,
        tags: string[],
    },
    comments: CommentSubState[],
    liked: boolean
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
    },
    comment: {
        value: '',
        tags: []
    },
    comments: [],
    liked: false
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
    },
    [CHANGE_INPUT_COMMENT]: (state, action: ChangeInputCommentAction) => {
        const { payload } = action;
        return produce(state, (draft) => {
            if (payload === undefined) return;
            draft.comment[payload.name] = payload.value;
        })
    },
    [INSERT_TAG]: (state, action: InsertTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.comment.tags.push(action.payload);
        });
    },
    [REMOVE_TAG]: (state, action: RemoveTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.comment.tags = draft.comment.tags.filter(t => t !== action.payload);
        })
    },
    [WRITE_COMMENT_SUCCESS]: (state) => {
        return produce(state, (draft) => {
            draft.comment = {
                value: '',
                tags: []
            }
        })
    },
    [LIST_COMMENT_SUCCESS]: (state, action: ListCommentAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.comments = data.commentWithData;
        })
    },
    [LIKE_PIN_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes += 1;
            draft.liked = true;
        });
    },
    [LIKE_PIN_SUCCESS]: (state, action: LikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    },
    [LIKE_PIN_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes -= 1;
            draft.liked = false;
        })
    },
    [UNLIKE_PIN_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes -= 1;
            draft.liked = false;
        })
    },
    [UNLIKE_PIN_SUCCESS]: (state, action: UnLikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    },
    [UNLIKE_PIN_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes += 1;
            draft.liked = true;
        })
    },
    [GET_LIKE_SUCCESS]: (state, action: GetLikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    }
}, initialState);