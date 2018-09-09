import { Router } from 'express';
import { checkPinExistancy } from '../../../lib/common';
import * as commentCtrl from './comment.ctrl';

const comment = Router();

comment.post('/:id', checkPinExistancy, commentCtrl.writeComment);
comment.delete('/:id/:commentId', checkPinExistancy, commentCtrl.deleteComment);
comment.get('/:id', checkPinExistancy, commentCtrl.getCommentList);

export default comment;