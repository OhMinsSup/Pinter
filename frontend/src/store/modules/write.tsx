import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as WriteAPI from '../../lib/API/write';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';

const INITIAL_STATE = 'write/INITIAL_STATE';
const CHANGE_INPUT  = 'write/CHANGE_INPUT';
const INSERT_TAG = 'write/INSERT_TAG';
const REMOVE_TAG = 'write/REMOVE_TAG';
const SET_UPLOAD_STATUS = 'write/SET_UPLOAD_STATUS';
const REMOVE_UPLOAD_URL = 'write/REMOVE_UPLOAD_URL';

const CREATE_UPLOAD_URL = 'write/CREATE_UPLOAD_URL';
const CREATE_UPLOAD_URL_SUCCESS = 'write/CREATE_UPLOAD_URL_SUCCESS';
const CREATE_UPLOAD_URL_ERROR = 'write/CREATE_UPLOAD_URL_ERROR';

const WRITE_SUBMIT = 'write/WRITE_SUBMIT';
const WRITE_SUBMIT_SUCCESS = 'write/WRITE_SUBMIT_SUCCESS';
const WRITE_SUBMIT_ERROR = 'write/WRITE_SUBMIT_ERROR';

type ChangeInputPayload = { name: string, value: string };

export const writeCreators = {
    initialState: createAction(INITIAL_STATE),
    changeInput: createAction(CHANGE_INPUT, (payload: ChangeInputPayload) => payload),
    insertTag: createAction(INSERT_TAG, (tag: string) => tag),
    removeTag: createAction(REMOVE_TAG, (tag: string) => tag),
    setUploadStatus: createAction(SET_UPLOAD_STATUS, (uploading: boolean) => uploading),
    createUploadUrl: createPromiseThunk(CREATE_UPLOAD_URL, WriteAPI.createSignedUrl),
    removeUploadUrl: createAction(REMOVE_UPLOAD_URL, (url: string) => url),
    writeSubmit: createPromiseThunk(WRITE_SUBMIT, WriteAPI.writePinAPI),
}

type ChangeInputAction = ReturnType<typeof writeCreators.changeInput>;
type InsertTagAction = ReturnType<typeof writeCreators.insertTag>;
type RemoveTagAction = ReturnType<typeof writeCreators.removeTag>;
type SetUploadStatusAction = ReturnType<typeof writeCreators.setUploadStatus>;
type CreateSignedUrlAction = GenericResponseAction<{ url: string, path: string }, string>;
type RemoveUploadUrlAction = ReturnType<typeof writeCreators.removeUploadUrl>;
type WriteSubmitAction = GenericResponseAction<{ pinId: string } ,string>;

export interface WriteState {
    form: {
        relation_url: string,
        body: string,
        tags: string[],
        urls: string[],
    },
    upload: {
        url: string,
        path: string,
        uploading: boolean
    },
    pinId: string,
}

const initialState: WriteState = {
    form: {
        relation_url: '',
        body: '',
        tags: [],
        urls: []
    },
    upload: {
        url: '',
        path: '',
        uploading: false
    },
    pinId: '',
}

export default handleActions<WriteState, any>({
    [INITIAL_STATE]: (state) => {
        return produce(state, (draft) => {
            draft.form = {
                relation_url: '',
                body: '',
                tags: [],
                urls: []
            };
            draft.upload = {
                url: '',
                path: '',
                uploading: false
            };
            draft.pinId = '';
        });
    },
    [CHANGE_INPUT]: (state, action: ChangeInputAction) => {
        const { payload } = action;
        return produce(state, (draft) => {
            if (payload === undefined) return;
            draft.form[payload.name] = payload.value;
        })
    },
    [INSERT_TAG]: (state, action: InsertTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.form.tags.push(action.payload);
        })
    },
    [REMOVE_TAG]: (state, action: RemoveTagAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.form.tags = draft.form.tags.filter(t => t !== action.payload);
        })
    },
    [SET_UPLOAD_STATUS]: (state, action: SetUploadStatusAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.upload.uploading = action.payload;
        })
    },
    [CREATE_UPLOAD_URL_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.upload = {
                url: '',
                path: '',
                uploading: false
            },
            draft.form.urls= [];
        })
    },
    [CREATE_UPLOAD_URL_SUCCESS]: (state, action: CreateSignedUrlAction) => {
        const { payload: { data } } = action;
        return produce(state, (draft) => {
            if (data === undefined) return;
            draft.upload = {
                url: data.url,
                path: data.path,
                uploading: false
            };
            draft.form.urls.push(data.url);
        })
    },
    [REMOVE_UPLOAD_URL]: (state, action: RemoveUploadUrlAction) => {
        return produce(state, (draft) => {
            if (action.payload === undefined) return;
            draft.form.urls = draft.form.urls.filter(u => u !== action.payload);
        })
    },
    [WRITE_SUBMIT_SUCCESS]: (state, action: WriteSubmitAction) => {
        return produce(state, (draft) => {
            draft.pinId = action.payload.data.pinId;
        })
    },
    [WRITE_SUBMIT_ERROR]: (state) => {
        return produce(state, (draft) => {
            draft.pinId = '';
        })
    }
}, initialState)