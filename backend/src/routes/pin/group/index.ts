import { Router } from 'express';
import * as groupCtrl from './group.ctrl';

const group = Router();

group.post('/', groupCtrl.createGroup);

export default group;