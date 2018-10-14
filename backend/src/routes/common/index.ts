import { Router } from 'express';
import needAuth from '../../lib/middleware/needAuth';
import notice from './notice';
import * as commonCtrl from './common.ctrl';
import search from './search';

const common = Router();

common.get('/users', needAuth, commonCtrl.getUsers);
common.get('/info/:displayName', needAuth, commonCtrl.getUserInfo);

common.use('/notice', needAuth, notice);
common.use('/search', needAuth, search);

export default common;
