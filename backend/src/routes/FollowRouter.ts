import { Request, Response, Router } from 'express';

class FollowRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        const { router } = this;

        router.get('/exists/:username')

        router.post('/:followId');
        router.delete('/:followId');

        router.get('/:username/following');
        router.get('/:username/follower');
    }
}

export default new FollowRouter().router;