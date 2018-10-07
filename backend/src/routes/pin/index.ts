import { Router } from 'express';
import * as pinCtrl from './pin.ctrl';
import needAuth from '../../lib/middleware/needAuth';
import { checkPinExistancy, checkObjectId } from '../../lib/common';
import like from './like';
import comment from './comment';

const pin = Router();

pin.post('/', needAuth, pinCtrl.writePin);
pin.patch('/:id', needAuth, checkObjectId, checkPinExistancy, pinCtrl.updatePin);
pin.delete('/:id', needAuth, checkObjectId, checkPinExistancy, pinCtrl.deletePin);
pin.get('/:id', needAuth, checkObjectId, pinCtrl.readPin);
pin.get('/', needAuth, pinCtrl.listPin);
pin.get('/:displayName/user', needAuth, pinCtrl.listPin);

pin.use('/likes', needAuth, like);
pin.use('/comments', needAuth, comment);

export default pin;