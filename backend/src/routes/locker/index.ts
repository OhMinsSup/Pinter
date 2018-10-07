import { Router } from 'express';
import * as lockerCtrl from './locker.ctrl';
import needAuth from '../../lib/middleware/needAuth';
import { checkPinExistancy, checkObjectId } from '../../lib/common';

const locker = Router();

locker.post('/:id', needAuth, checkObjectId, checkPinExistancy, lockerCtrl.lockerPin);
locker.delete('/:id', needAuth, checkObjectId, checkPinExistancy, lockerCtrl.unLockerPin);
locker.get('/:id', needAuth, checkObjectId, checkPinExistancy, lockerCtrl.getLockerPin);
locker.get('/:displayName/user', needAuth, lockerCtrl.lockerList);

export default locker;
