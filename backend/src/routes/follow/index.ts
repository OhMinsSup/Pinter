import { Router } from 'express';
import needAuth from '../../lib/middleware/needAuth';
import * as followCtrl from './follow.ctrl';

const follow = Router();

follow.get('/exists/:displayName', needAuth, followCtrl.getFollow);
follow.post('/:followName', needAuth, followCtrl.follow);
follow.delete('/:followName', needAuth, followCtrl.unfollow);
follow.get('/:displayName/following', needAuth, followCtrl.getFollowing);
follow.get('/:displayName/follower', needAuth, followCtrl.getFollower);

export default follow;