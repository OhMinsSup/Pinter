import { Router } from 'express';
import * as likeCtrl from './like.ctrl';
import { checkPinExistancy } from '../../../lib/common';

const like = Router();

like.get('/:id', checkPinExistancy, likeCtrl.getLike);
like.post('/:id', checkPinExistancy, likeCtrl.like);
like.delete('/:id', checkPinExistancy, likeCtrl.unlike);

export default like;