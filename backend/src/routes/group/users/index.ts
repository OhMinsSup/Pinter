import { Router } from 'express';
import * as groupUserCtrl from './users.ctrl';

const groupUser = Router();

groupUser.post('/signUp', groupUserCtrl.groupSignUp);
groupUser.delete('/signOut', groupUserCtrl.groupSignOut);

export default groupUser;