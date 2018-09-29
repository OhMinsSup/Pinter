import { Router } from 'express';
import auth from './auth';
import pin from './pin';
import file from './file';
import follow from './follow';
import locker from './locker';
import tag from './tag';
import common from './common';
import group from './group';

const router = Router();

router.use('/auth', auth);
router.use('/pin', pin);
router.use('/file', file);
router.use('/follow', follow);
router.use('/locker', locker);
router.use('/tag', tag);
router.use('/common', common);
router.use('/group', group);

export default router;