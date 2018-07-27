import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum PinActionType {
    CHANGE_INPUT = 'pin/CHANGE_INPUT',
    INSERT_TAG = 'pin/INSERT_TAG',
    REMOVE_TAG = 'pin/REMOVE_TAG',
    SET_MAKE_PIN_FULLSCREEN_LOADER = 'pin/SET_MAKE_PIN_FULLSCREEN_LOADER',
    SET_UPLOAD_STATUS = 'pin/SET_UPLOAD_STATUS',
    REMOVE_UPLOAD_URL = 'pin/REMOVE_UPLOAD_URL',

    CREATE_UPLOAD_URL_REQUEST = 'pin/CREATE_UPLOAD_URL_REQUEST',
    CREATE_UPLOAD_URL_SUCCESS = 'pin/CREATE_UPLOAD_URL_SUCCESS',
    CREATE_UPLOAD_URL_FAILING = 'pin/CREATE_UPLOAD_URL_FAILING'
}

type ChangeInputPayload = { name: string, value: string }
type CreateUploadUrlSuccessPayload = { url: string, path: string };

export const actionCreators = {
    insertTag: createAction(PinActionType.INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(PinActionType.REMOVE_TAG, (tag: string) => tag),
    changeInput: createAction(PinActionType.CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
    setMakePinFullscreenLoader: createAction(PinActionType.SET_MAKE_PIN_FULLSCREEN_LOADER, (visible: boolean) => visible),
    setUploadStatus: createAction(PinActionType.SET_UPLOAD_STATUS, (uploading: boolean) => uploading), 
    removeUploadUrl: createAction(PinActionType.REMOVE_UPLOAD_URL), 
    createUploadUrlRequest: createAction(PinActionType.CREATE_UPLOAD_URL_REQUEST, (payload: any) => payload), 
    createUploadUrlFailing: createAction(PinActionType.CREATE_UPLOAD_URL_FAILING),
    createUploadUrlSuccess: createAction(PinActionType.CREATE_UPLOAD_URL_SUCCESS, (payload: CreateUploadUrlSuccessPayload) => payload)
}

type SetMakePinFullscreenLoaderAction = ReturnType<typeof actionCreators.setMakePinFullscreenLoader>;
type ChangeInputAction = ReturnType<typeof actionCreators.changeInput>;
type InsertTagAction = ReturnType<typeof actionCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof actionCreators.removeTag>;
type SetUploadStatusAction = ReturnType<typeof actionCreators.setUploadStatus>;
type CreateUploadUrlSuccessAction = ReturnType<typeof actionCreators.createUploadUrlSuccess>;

export interface UploadSubState {
    url: string,
    path: string,
    uploading: boolean
}

export interface PinState {
    visible: boolean,
    relation_url: string,
    description: string,
    tags: string[],
    urls: string,
    upload: UploadSubState,
}

const initialState: PinState = {
    visible: false,
    relation_url: '',
    description: '',
    tags: [],
    urls: '',
    upload: {
        url: '',
        path: '',
        uploading: false
    },
}

export default handleActions<PinState, any>({
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
    [PinActionType.CREATE_UPLOAD_URL_FAILING]: (state) => {
        return produce(state, (draft) => {
            return draft;
        })
    },
    [PinActionType.CREATE_UPLOAD_URL_SUCCESS]: (state, action: CreateUploadUrlSuccessAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.upload.url = action.payload.url;
            draft.upload.path = action.payload.path;
        });
    }, 
    [PinActionType.REMOVE_UPLOAD_URL]: (state) => {
        return produce(state, (draft) => {
            draft.upload.url = '',
            draft.upload.path = '',
            draft.upload.uploading = false
        });
    }
}, initialState);