import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Group, { IGroup } from '../database/models/Group';
import needAuth from '../lib/middleware/needAuth';
import { serializeGroup } from '../lib/serialize';

class GroupRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async createGroup(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            title: string,
            thumbnail: string,
            description: string,
        };

        const schema = joi.object().keys({
            title: joi.string(),
            thumbnail: joi.string(),
            description: joi.string(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { title, thumbnail, description }: BodySchema = req.body;
        const userId: string = req['user']._id;

        try {
            const group = await Group.create({
                title, thumbnail, description,
                creator: userId,
            });

            if (!group) {
                return res.status(404).json({
                    name: 'Group create error',
                    payload: '그룹이 생성되지 않았습니다',
                });
            }

            const groupData: IGroup = await Group.readGroupId(group._id);

            res.json(serializeGroup(groupData));
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/', needAuth, this.createGroup);
    }
}

export default new GroupRouter().router;