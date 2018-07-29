import { Request, Response, Router } from 'express';
import Tag, { ITag } from '../database/models/Tag';
import Pin, { IPin } from '../database/models/Pin';
import User, { IUser } from '../database/models/User';
import Count, { ICount } from '../database/models/Count';
import { serializeTag, serializeTagPin } from '../lib/serialize';

class CommonRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getTags(req: Request, res: Response): Promise<any> {
        const { sort = 'latest' } = req.query;
        const availableSort = ['latest', 'name'];

        if (availableSort.indexOf(sort) === -1) {
            return res.status(400).json({
                name: '존재하지 않는 정렬입니다'
            });
        }

        const sortBy = Object.assign(
            {},
            sort === 'latest' ? { _id: -1 } : { name: 'asc' } 
        );

        try {
            const tagData = await Tag.find().sort(sortBy);
            res.json(tagData.map(serializeTag));
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async getTagInfo(req: Request, res: Response): Promise<any> {
        const { tag } = req.params;

        try {
            const { pin }: ITag = await Tag.findByTagName(tag);
            const pinData = await Promise.all(pin.map(pinId => Pin.readPinById(pinId._id)));
            res.json({
                pinWithData: pinData.map(serializeTagPin)
            });
        } catch (e) {
            res.status(500).json(e);
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
                pin: count.pin
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.get('/tags', this.getTags);
        router.get('/tags/:tag', this.getTagInfo);
        router.get('/info/:displayName', this.getUserInfo);
    }
}

export default new CommonRouter().router;