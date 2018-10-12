import { Router } from 'express';
import * as groupCtrl from './group.ctrl';

const group = Router();

group.post('/', groupCtrl.createGroup);
group.get('/list', groupCtrl.groupList);

export default group;