import { Router } from 'express';
import * as groupCtrl from './group.ctrl';

const group = Router();

group.post('/', groupCtrl.createGroup);
group.delete('/:groupId', groupCtrl.deleteGroup);
group.put('/:groupId', groupCtrl.updateGroup);

group.post('/pin/add', groupCtrl.groupAddPin);
group.delete('/:groupId/pin/delete/:pinId', groupCtrl.groupDeletePin);

group.get('/:displayName/list/:active', groupCtrl.groupList);
group.get('/:groupId/list', groupCtrl.groupPinList);

export default group;