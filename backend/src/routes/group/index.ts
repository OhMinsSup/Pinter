import { Router } from 'express';
import { checkGroupExistancy } from '../../lib/common';
import * as groupCtrl from './group.ctrl';
import needAuth from '../../lib/middleware/needAuth';
import groupUser from './users';
import groupPin from './pins';

const group = Router();

group.post('/', needAuth, groupCtrl.writeGroup);

group.use('/:id/user', checkGroupExistancy, groupUser);
group.use('/:id/pin', checkGroupExistancy, groupPin);

export default group;