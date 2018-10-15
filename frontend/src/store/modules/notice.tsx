import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk } from '../../lib/common';
import * as commonAPI from '../../lib/API/common';

const NOTICE_CANCEL = 'notice/NOTICE_CANCEL';
const NOTICE_CONFIRM = 'notice/NOTICE_CONFIRM';
const GET_NOTICE_MESSAGE = 'notice/GET_NOTICE_MESSAGE';

export const noticeCreators = {
  noticeCancel: createAction(NOTICE_CANCEL),
  noticeConfirm: createAction(NOTICE_CONFIRM),
  getNoticeMessage: createPromiseThunk(
    GET_NOTICE_MESSAGE,
    commonAPI.getNoticeMessageAPI
  ),
};

export interface MessageSubState {
  message: string;
  thumbnail: string;
}

export interface NoticeState {
  messages: MessageSubState[];
  notice: {
    visible: boolean;
  };
}

const initialState: NoticeState = {
  messages: [],
  notice: {
    visible: false,
  },
};

export default handleActions<NoticeState, any>(
  {
    [NOTICE_CANCEL]: state => {
      return produce(state, draft => {
        draft.notice.visible = false;
      });
    },
    [NOTICE_CONFIRM]: state => {
      return produce(state, draft => {
        draft.notice.visible = true;
      });
    },
  },
  initialState
);
