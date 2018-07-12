import { fork, take, call, put } from 'redux-saga/effects';
import { 
    UserActionType, 
    actionCreators as userActions 
} from '../store/modules/user';
import * as UserAPI from '../lib/api/user';
import * as UserPayload from './types/user';

function* checkUserFlow() {
    yield take(UserActionType.CHECK_USER_REQUEST);

    const { data: { user }, error }: UserPayload.CheckUserTypes = yield call(UserAPI.checkAPI);

    if (!user && error) {
        yield put(userActions.checkUserFailing());
        return;
    }

    yield put(userActions.checkUserSuccess({ user }));
}

export default function* user() {
    yield fork(checkUserFlow);

}