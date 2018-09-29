import { Router } from 'express';
import * as groupCtrl from './group.ctrl';
import needAuth from '../../lib/middleware/needAuth';

const group = Router();

group.post('/', needAuth, groupCtrl.createGroup);

export default group;