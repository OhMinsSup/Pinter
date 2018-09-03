import { Request, Response, Router } from 'express';
import User, { IUser } from '../database/models/User';
import Count, { ICount } from '../database/models/Count';
import { serializeUsers } from '../lib/serialize';

class CommonRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    private async getUsers(req: Request, res: Response): Promise<any> {
        const { cursor } = req.query;
        try {
            const user: IUser[] = await User.usersList(cursor);
            const next  = user.length === 15 ? `/common/users?cursor=${user[14]._id}` : null;
            res.json({
                next,
                usersWithData: user.map(serializeUsers),
            });
        } catch (e) {
            console.log(e);
        }
    }

    private async getUserInfo(req: Request, res: Response): Promise<any> {
        const { displayName } = req.params;
        try {
            const user: IUser = await User.findByDisplayName(displayName);
            const count: ICount = await Count.findOne({ user: user._id });
            res.json({
                username: user.username,
                displayName: user.profile.displayName,
                thumbnail: user.profile.thumbnail,
                userId: user._id,
                follower: count.follower,
                following: count.following,
                pin: count.pin,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.get('/users', this.getUsers);
        router.get('/info/:displayName', this.getUserInfo);
    }
}

export default new CommonRouter().router;