import { createAction, handleActions } from 'redux-actions';
import { Dispatch, Action } from 'redux';
import { GenericResponseAction } from '../../lib/common';
import * as PinAPI from '../../lib/api/pin';
import produce from 'immer';

export enum PinActionType {
    INITIAL_PIN = 'pin/INITIAL_PIN',
    CHANGE_INPUT = 'pin/CHANGE_INPUT',
    INSERT_TAG = 'pin/INSERT_TAG',
    REMOVE_TAG = 'pin/REMOVE_TAG',
    SET_MAKE_PIN_FULLSCREEN_LOADER = 'pin/SET_MAKE_PIN_FULLSCREEN_LOADER',
    SET_UPLOAD_STATUS = 'pin/SET_UPLOAD_STATUS',
    REMOVE_UPLOAD_URL = 'pin/REMOVE_UPLOAD_URL',
    COMMENT_CHANGE_INPUT = 'pin/COMMENT_CHANGE_INPUT',
    SUBMIT_COMMENT = 'pin/SUBMIT_COMMENT',

    SHOW_PIN_MENU = 'pin/SHOW_PIN_MENU',
    HIDE_PIN_MENU = 'pin/HIDE_PIN_MENU',
    
    CREATE_UPLOAD_URL_SUCCESS = 'pin/CREATE_UPLOAD_URL_SUCCESS',
    CREATE_UPLOAD_URL_FAILING = 'pin/CREATE_UPLOAD_URL_FAILING',

    WRITE_PIN_SUCCESS = 'pin/WRITE_PIN_SUCCESS',
    WRITE_PIN_FAILING = 'pin/WRITE_PIN_FAILING',

    GET_PIN_PENDING = 'pin/GET_PIN_PENDING',
    GET_PIN_SUCESS = 'pin/GET_PIN_SUCESS',
    GET_PIN_FAILING = 'pin/GET_PIN_FAILING',

    LIKE_PENDING = 'pin/LIKE_PENDING',
    LIKE_SUCCESS = 'pin/LIKE_SUCCESS',
    LIKE_FAILING = 'pin/LIKE_FAILING',

    UNLIKE_PENDING = 'pin/UNLIKE_PENDING',
    UNLIKE_SUCCESS = 'pin/UNLIKE_SUCCESS',
    UNLIKE_FAILING = 'pin/UNLIKE_FAILING',

    GET_LIKE_SUCCESS = 'pin/GET_LIKE_SUCCESS',
    GET_LIKE_FAILING = 'pin/GET_LIKE_FAILING',
}

type ChangeInputPayload = { name: string, value: string }
type CreateUploadUrlPayload = { url: string, path: string };
type WritePinPayload = { pinId: string }
type LikePayload = { likes: number, liked: boolean };

export const actionCreators = {
    initialPin: createAction(PinActionType.INITIAL_PIN),
    insertTag: createAction(PinActionType.INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(PinActionType.REMOVE_TAG, (tag: string) => tag),
    changeInput: createAction(PinActionType.CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
    setMakePinFullscreenLoader: createAction(PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER, (visible: boolean) => visible),
    setUploadStatus: createAction(PinActionType.SET_UPLOAD_STATUS, (uploading: boolean) => uploading), 
    removeUploadUrl: createAction(PinActionType.REMOVE_UPLOAD_URL), 
    showPinMenu: createAction(PinActionType.SHOW_PIN_MENU, (visible: boolean) => visible),
    hidePinMenu: createAction(PinActionType.HIDE_PIN_MENU, (visible: boolean) => visible),
    commentChagneInput: createAction(PinActionType.COMMENT_CHANGE_INPUT, (value: string) => value),
    createUploadUrl: (file: any) => (dispatch: Dispatch<Action>) => {
        return PinAPI.createSignedUrl(file)
        .then(res => dispatch({
            type: PinActionType.CREATE_UPLOAD_URL_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.CREATE_UPLOAD_URL_FAILING,
            payload: e
        }))
    },
    writePin: (payload: PinAPI.WritePinPayload) => (dispatch: Dispatch<Action>) => {
        return PinAPI.writePinAPI(payload)
        .then(res => dispatch({
            type: PinActionType.WRITE_PIN_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.WRITE_PIN_FAILING,
            payload: e
        }))
    },
    getPin: (id: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.getPinAPI(id)
        .then(res => dispatch({
            type: PinActionType.GET_PIN_SUCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.GET_PIN_FAILING,
            payload: e
        }))
    },
    LikePin: (id: string) => (dispatch: Dispatch<Action>) => {
        dispatch({ type: PinActionType.LIKE_PENDING })
        return PinAPI.likePinAPI(id)
        .then(res => dispatch({
            type: PinActionType.LIKE_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.LIKE_FAILING,
            payload: e
        }))
    },
    UnLikePin: (id: string) => (dispatch: Dispatch<Action>) => {
        dispatch({ type: PinActionType.UNLIKE_PENDING })
        return PinAPI.unlikePinAPI(id)
        .then(res => dispatch({
            type: PinActionType.UNLIKE_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.UNLIKE_FAILING,
            payload: e
        }))
    },
    getLikePin: (id: string) => (dispatch: Dispatch<Action>) => {
        return PinAPI.getlikePinAPI(id)
        .then(res => dispatch({
            type: PinActionType.GET_LIKE_SUCCESS,
            payload: res
        }))
        .catch(e => dispatch({
            type: PinActionType.GET_LIKE_FAILING,
            payload: e
        }))
    },
    submitComment: (id: string, text: string, has_tags: string[]) => (dispatch: Dispatch<Action>) => {
        return PinAPI.writeCommentAPI(id, text, has_tags)
        .then(res => dispatch({
            type: PinActionType.SUBMIT_COMMENT
        }))
    }
}

type CommentChangeInputAction = ReturnType<typeof actionCreators.commentChagneInput>;
type SetMakePinFullscreenLoaderAction = ReturnType<typeof actionCreators.setMakePinFullscreenLoader>;
type ChangeInputAction = ReturnType<typeof actionCreators.changeInput>;
type InsertTagAction = ReturnType<typeof actionCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof actionCreators.removeTag>;
type SetUploadStatusAction = ReturnType<typeof actionCreators.setUploadStatus>;
type ShowPinMenuAction = ReturnType<typeof actionCreators.showPinMenu>;
type HidePinMenuAction = ReturnType<typeof actionCreators.hidePinMenu>;
type CreateUploadUrlAction = GenericResponseAction<CreateUploadUrlPayload, string>;
type WritePinAction = GenericResponseAction<WritePinPayload, string>;
type GetPinAction = GenericResponseAction<PinSubState, string>;
type LikePinAction = GenericResponseAction<LikePayload, string>;
type UnLikePinAction = GenericResponseAction<LikePayload, string>;
type GetLikePinAction = GenericResponseAction<LikePayload, string>;

export interface UploadSubState {
    url: string,
    path: string,
    uploading: boolean
}

export interface PinSubState {
    pinId: string, 
    relation_url: string, 
    description: string, 
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

export interface PinState {
    visible: boolean,
    relation_url: string,
    description: string,
    tags: string[],
    urls: string[],
    upload: UploadSubState,
    pinId: string,
    pin: PinSubState,
    value: string,
    liked: boolean,
    menu: boolean
}

const initialState: PinState = {
    visible: false,
    relation_url: '',
    description: '',
    tags: [],
    urls: [],
    upload: {
        url: '',
        path: '',
        uploading: false
    },
    pinId: '',
    pin: {
        pinId: '', 
        relation_url: '', 
        description: '', 
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
    value: '',
    liked: false,
    menu: false
}

export default handleActions<PinState, any>({
    [PinActionType.INITIAL_PIN]: (state) => {
        return produce(state, (draft) => {
            return initialState;            
        })
    },
    [PinActionType.SHOW_PIN_MENU]: (state, action: ShowPinMenuAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.menu = action.payload;
        })
    },
    [PinActionType.HIDE_PIN_MENU]: (state, action: HidePinMenuAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.menu = action.payload;
        })
    },
    [PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER]: (state, action: SetMakePinFullscreenLoaderAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.visible = action.payload;
        })
    },
    [PinActionType.CHANGE_INPUT]: (state, action: ChangeInputAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            if (action.payload.name === 'relation_url') {
                draft.relation_url = action.payload.value
            }
            if (action.payload.name === 'description') {
                draft.description = action.payload.value
            }
        })
    },
    [PinActionType.COMMENT_CHANGE_INPUT]: (state, action: CommentChangeInputAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.value = action.payload;
        })
    },
    [PinActionType.INSERT_TAG]: (state, action: InsertTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tags.push(action.payload);
        });
    },
    [PinActionType.REMOVE_TAG]: (state, action: RemoveTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.tags = draft.tags.filter(t => t !== action.payload);
        });
    },
    [PinActionType.SET_UPLOAD_STATUS]: (state, action: SetUploadStatusAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.upload.uploading = action.payload;
        });
    },
    [PinActionType.REMOVE_UPLOAD_URL]: (state) => {
        return produce(state, (draft) => {
            draft.upload.url = '',
            draft.upload.path = '',
            draft.upload.uploading = false
        });
    },
    [PinActionType.CREATE_UPLOAD_URL_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.upload.url = '',
            draft.upload.path = '',
            draft.upload.uploading = false
        })
    },  
    [PinActionType.CREATE_UPLOAD_URL_SUCCESS]: (state, action: CreateUploadUrlAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.upload.url = action.payload.data.url;
            draft.upload.path = action.payload.data.path;
            draft.urls.push(action.payload.data.url);
        });
    },
    [PinActionType.WRITE_PIN_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        });
    },
    [PinActionType.WRITE_PIN_SUCCESS]: (state, action: WritePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pinId = action.payload.data.pinId;
        });
    },
    [PinActionType.GET_PIN_SUCESS]: (state, action: GetPinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin = action.payload.data;
        })
    },
    [PinActionType.GET_PIN_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.pin = {
                pinId: '', 
                relation_url: '', 
                description: '', 
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
            };
        })
    },
    [PinActionType.LIKE_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes += 1;
            draft.liked = true;
        })
    },
    [PinActionType.LIKE_SUCCESS]: (state, action: LikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    },
    [PinActionType.LIKE_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes -= 1;
            draft.liked = false;
        })
    },

    [PinActionType.UNLIKE_PENDING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes -= 1;
            draft.liked = false;
        })
    },
    [PinActionType.UNLIKE_SUCCESS]: (state, action: UnLikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    },
    [PinActionType.UNLIKE_FAILING]: (state) => {
        return produce(state, (draft) => {
            draft.pin.likes += 1;
            draft.liked = true;
        })
    },
    [PinActionType.GET_LIKE_SUCCESS]: (state, action: GetLikePinAction) => {
        return produce(state, (draft) => {
            if (!action.payload.data) return;
            draft.pin.likes = action.payload.data && action.payload.data.likes;
            draft.liked = action.payload.data.liked;
        })
    },
    [PinActionType.SUBMIT_COMMENT]: (state) => {
        return produce(state, (draft) => {
            draft.value = '';
        })
    }
}, initialState);