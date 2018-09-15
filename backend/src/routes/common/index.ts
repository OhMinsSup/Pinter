import { Router } from 'express';
import needAuth from '../../lib/middleware/needAuth';
import notice from './notice';
import recommend from './recommend';
import * as commonCtrl from './common.ctrl';

const common = Router();

common.get('/users', needAuth, commonCtrl.getUsers);
common.get('/info/:displayName', needAuth, commonCtrl.getUserInfo);

common.use('/notice', needAuth, notice);
common.use('/recommend', needAuth, recommend);

export default common;