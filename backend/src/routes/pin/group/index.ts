import { Router } from 'express';
import * as groupCtrl from './group.ctrl';

const group = Router();

group.post('/', groupCtrl.createGroup);
group.get('/:displayName/list/:active', groupCtrl.groupList);
group.post('/pin/add', groupCtrl.groupAddPin);

export default group;