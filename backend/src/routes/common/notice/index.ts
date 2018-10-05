import { Router } from 'express';
import * as noticeCtrl from './notice.ctrl';

const notice = Router();

notice.post('/', noticeCtrl.createNoticeRoom);
notice.post('/send-message', noticeCtrl.sendMessage);
notice.get('/', noticeCtrl.getNoticeList);

export default notice;