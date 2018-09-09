import { Router } from 'express';
import needAuth from '../../lib/middleware/needAuth';
import * as tagCtrl from './tag.ctrl';

const tag = Router();

tag.get('/tags/', needAuth, tagCtrl.getTags);
tag.get('/tags/:tag', needAuth, tagCtrl.getTagInfo);

export default tag;