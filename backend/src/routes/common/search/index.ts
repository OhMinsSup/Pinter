import { Router } from 'express';
import * as searchCtrl from './search.ctrl';

const search = Router();

search.post('/pin', searchCtrl.serachPin);
search.post('/user', searchCtrl.serachUser);
search.post('/tag', searchCtrl.searchTag);

export default search;