import { Request, Response, Router } from 'express';
import Pin from '../database/models/Pin';
import Tag from '../database/models/Tag';
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
            const count: ICount = await Count.findOne({ user: user._id }).lean();
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

    private async search(req: Request, res: Response): Promise<any> {
        type BodySchema = { 
            value: string,
            type: string,
        };

        const { value, type }: BodySchema = req.body;
        let search: any[] = [];
        try {
            if (type === 'pin') {
                search = await Pin.find()
                .or([
                    { title: { $regex: value } },
                    { description: { $regex: value } },
                    { relation_url: { $regex: value } },
                    { urls: { $regex: value } },
                ])
                .sort({ _id: -1 });
            } else if (type === 'user') {
                search = await User.find()
                .or([
                    { username: { $regex: value } },
                    { 'profile.displayName': { $regex: value } },
                ])
                .sort({ _id: -1 });
            } else if (type === 'tag') {
                search = await Tag.find({
                    name: {
                        $regex: value,
                    },
                })
                .sort({ _id: -1 });
            }

            res.json(search);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.get('/users', this.getUsers);
        router.get('/info/:displayName', this.getUserInfo);
        router.post('/search', this.search);
    }
}

export default new CommonRouter().router;