import * as Router from 'koa-router';
import { Context } from 'koa';
import { indexHtml } from '../ssr/index';

const router = new Router();

router.get('/index.html', (ctx: Context) => {
    ctx.body = indexHtml;
});

export default router;