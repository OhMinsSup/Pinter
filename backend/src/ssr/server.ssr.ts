import * as express from 'express';
import ssr from './index';

const app = express();

app.use(ssr);

app.listen(3000, () => {
    console.log(`SSR Server listening on port 3000 ✅`);
});