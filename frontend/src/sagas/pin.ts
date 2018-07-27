import { fork, take, call, put } from 'redux-saga/effects';
import { PinActionType } from '../store/modules/pin';
import * as PinAPI from '../lib/api/pin';
import * as PinPayload from './types/pin';
import { actionCreators as pinActions } from '../store/modules/pin';

function* uploadUrlFlow() {
    const { payload: { file } }: PinPayload.UploadUrlPayload = yield take(PinActionType.CREATE_UPLOAD_URL_REQUEST);       
    const { data: { url, path }, error }: PinPayload.UploadUrlPayload = yield call(PinAPI.createSignedUrl, file);
    
    if ((!url || !path ) && error) {
        yield put(pinActions.createUploadUrlFailing());
        throw error;
    }
    
    yield put(pinActions.createUploadUrlSuccess({url, path}));
    yield put(pinActions.setUploadStatus(false));
}

export default function* pin() {
    yield fork(uploadUrlFlow);
}