import { Router } from 'express';
import * as lockerCtrl from './locker.ctrl';
import needAuth from '../../lib/middleware/needAuth';
import { checkPinExistancy } from '../../lib/common';

const locker = Router();

locker.post('/:id', needAuth, checkPinExistancy, lockerCtrl.lockerPin);
locker.delete('/:id', needAuth, checkPinExistancy, lockerCtrl.unLockerPin);
locker.get('/:id', needAuth, checkPinExistancy, lockerCtrl.getLockerPin);
locker.get('/:displayName/user', needAuth, lockerCtrl.lockerList);

export default locker;
