import * as Koa from 'koa';
import router from './routes';
import ssr from './ssr';

class Server {
    public app: Koa;

    constructor() {
        this.middleware();
    }

    private middleware(): void {
        this.app.use(router.routes()).use(router.allowedMethods());
        this.app.use(ssr);
    }
}

export default new Server().app;