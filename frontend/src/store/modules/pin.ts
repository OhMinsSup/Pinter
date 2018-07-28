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
    
    CREATE_UPLOAD_URL_SUCCESS = 'pin/CREATE_UPLOAD_URL_SUCCESS',
    CREATE_UPLOAD_URL_FAILING = 'pin/CREATE_UPLOAD_URL_FAILING',

    WRITE_PIN_SUCCESS = 'pin/WRITE_PIN_SUCCESS',
    WRITE_PIN_FAILING = 'pin/WRITE_PIN_FAILING'
}

type ChangeInputPayload = { name: string, value: string }
type CreateUploadUrlPayload = { url: string, path: string };
type WritePinPayload = { pinId: string }

export const actionCreators = {
    initialPin: createAction(PinActionType.INITIAL_PIN),
    insertTag: createAction(PinActionType.INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(PinActionType.REMOVE_TAG, (tag: string) => tag),
    changeInput: createAction(PinActionType.CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
    setMakePinFullscreenLoader: createAction(PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER, (visible: boolean) => visible),
    setUploadStatus: createAction(PinActionType.SET_UPLOAD_STATUS, (uploading: boolean) => uploading), 
    removeUploadUrl: createAction(PinActionType.REMOVE_UPLOAD_URL), 
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
    }
}

type SetMakePinFullscreenLoaderAction = ReturnType<typeof actionCreators.setMakePinFullscreenLoader>;
type ChangeInputAction = ReturnType<typeof actionCreators.changeInput>;
type InsertTagAction = ReturnType<typeof actionCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof actionCreators.removeTag>;
type SetUploadStatusAction = ReturnType<typeof actionCreators.setUploadStatus>;
type CreateUploadUrlAction = GenericResponseAction<CreateUploadUrlPayload, string>;
type WritePinAction = GenericResponseAction<WritePinPayload, string>;

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
    }
}

export interface PinState {
    visible: boolean,
    relation_url: string,
    description: string,
    tags: string[],
    urls: string[],
    upload: UploadSubState,
    pinId: string,
    // pin: PinSubState
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
    pinId: ''
}

export default handleActions<PinState, any>({
    [PinActionType.INITIAL_PIN]: (state) => {
        return produce(state, (draft) => {
            return initialState;            
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
    }
}, initialState);