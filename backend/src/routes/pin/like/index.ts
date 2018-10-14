import { Router } from 'express';
import * as likeCtrl from './like.ctrl';
import { checkPinExistancy, checkObjectId } from '../../../lib/common';

const like = Router();

like.get('/:id', checkObjectId, checkPinExistancy, likeCtrl.getLike);
like.post('/:id', checkObjectId, checkPinExistancy, likeCtrl.like);
like.delete('/:id', checkObjectId, checkPinExistancy, likeCtrl.unlike);

export default like;
