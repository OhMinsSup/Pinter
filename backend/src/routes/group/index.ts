import { Router } from 'express';
import * as groupCtrl from './group.ctrl';
import needAuth from '../../lib/middleware/needAuth';

const group = Router();

group.post('/', needAuth, groupCtrl.createGroup);
group.get('/', needAuth, groupCtrl.listGroup);
group.get('/:title/group', needAuth, groupCtrl.listGroup);

export default group;