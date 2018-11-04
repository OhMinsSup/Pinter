import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createPromiseThunk, GenericResponseAction } from '../../lib/common';
import * as commonAPI from '../../lib/API/common';

const NOTICE_CANCEL = 'notice/NOTICE_CANCEL';
const NOTICE_CONFIRM = 'notice/NOTICE_CONFIRM';
const GET_NOTICE_MESSAGE = 'notice/GET_NOTICE_MESSAGE';
const GET_NOTICE_MESSAGE_SUCCESS = 'notice/GET_NOTICE_MESSAGE_SUCCESS';

export const noticeCreators = {
  noticeCancel: createAction(NOTICE_CANCEL),
  noticeConfirm: createAction(NOTICE_CONFIRM),
  getNoticeMessage: createPromiseThunk(
    GET_NOTICE_MESSAGE,
    commonAPI.getNoticeMessageAPI
  ),
};

type GetNoticeMessageAction = GenericResponseAction<
  {
    message: MessageSubState[];
  },
  string
>;

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
    [GET_NOTICE_MESSAGE_SUCCESS]: (state, action: GetNoticeMessageAction) => {
      const {
        payload: { data },
      } = action;
      return produce(state, draft => {
        if (data === undefined) return;
        draft.messages = data.message;
      });
    },
  },
  initialState
);
