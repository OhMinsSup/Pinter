import { Router } from 'express';
import { checkPinExistancy, checkObjectId } from '../../../lib/common';
import * as commentCtrl from './comment.ctrl';

const comment = Router();

comment.post('/:id', checkObjectId, checkPinExistancy, commentCtrl.writeComment);
comment.delete('/:id/:commentId', checkObjectId, checkPinExistancy, commentCtrl.deleteComment);
comment.get('/:id', checkObjectId, checkPinExistancy, commentCtrl.getCommentList);

export default comment;