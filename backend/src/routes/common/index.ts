import { Router } from 'express';
import needAuth from '../../lib/middleware/needAuth';
import * as commonCtrl from './common.ctrl';
const common = Router();

common.get('/users', needAuth, commonCtrl.getUsers);
common.get('/info/:displayName', commonCtrl.getUserInfo);

export default common;