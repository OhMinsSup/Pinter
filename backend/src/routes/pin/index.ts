import { Router } from 'express';
import * as pinCtrl from './pin.ctrl';
import needAuth from '../../lib/middleware/needAuth';
import { checkPinExistancy } from '../../lib/common';
import like from './like';
import comment from './comment';

const pin = Router();

pin.post('/', needAuth, pinCtrl.writePin);
pin.patch('/:id', needAuth, checkPinExistancy, pinCtrl.updatePin);
pin.delete('/:id', needAuth, checkPinExistancy, pinCtrl.deletePin);
pin.get('/:id', needAuth, pinCtrl.readPin);
pin.get('/', needAuth, pinCtrl.listPin);
pin.get('/:displayName/user', needAuth, pinCtrl.listPin);
pin.use('/likes', needAuth, like);
pin.use('/comments', needAuth, comment);

export default pin;