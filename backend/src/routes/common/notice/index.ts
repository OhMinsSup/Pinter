import { Router } from 'express';
import * as noticeCtrl from './notice.ctrl';

const notice = Router();

notice.post('/', noticeCtrl.getNoticeRoom);
notice.post('/send-message', noticeCtrl.sendMessage);
notice.get('/', noticeCtrl.getNoticeList);

export default notice;