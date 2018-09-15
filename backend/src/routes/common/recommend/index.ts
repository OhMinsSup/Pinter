import { Router } from 'express';
import * as recommendCtrl from './recommend.ctrl';

const recommend = Router();

recommend.get('/', recommendCtrl.friendRecommend);

export default recommend;