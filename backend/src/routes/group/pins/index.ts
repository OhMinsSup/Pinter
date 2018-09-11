import { Router } from 'express';
import { checkPinExistancy } from '../../../lib/common';
import * as groupPinCtrl from './pins.ctrl';

const groupPin = Router();

groupPin.post('/:id', checkPinExistancy, groupPinCtrl.groupCreatePin);
groupPin.delete('/:id', checkPinExistancy, groupPinCtrl.groupDeletePin);

export default groupPin;