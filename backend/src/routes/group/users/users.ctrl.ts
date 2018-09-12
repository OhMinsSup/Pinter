import { Request, Response } from 'express';
import GroupUser, { IGroupUser } from '../../../database/models/GroupUser';
import Group from '../../../database/models/Group';

export const groupSignUp = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const groupId: string = req['group']._id;

    try {
        const exists: IGroupUser = await GroupUser.checkExists(userId, groupId);

        if (exists) {
            return res.status(409).json({
                name: '이미 가입한 유저입니다',
            });
        }

        await GroupUser.create({ userId, groupId });
        await Group.userCounts(groupId);

        res.json({
            group: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const groupSignOut = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const groupId: string = req['group']._id;

    try {
        const exists: IGroupUser = await GroupUser.checkExists(userId, groupId);

        if (!exists) {
            return res.status(409).json({
                name: '가입하지 않은 유저입니다',
            });
        }

        await GroupUser.deleteOne({ 
            $and: [ 
                { 
                    userId: userId, groupId: groupId 
                }
            ] 
        });
        await Group.unUserCounts(groupId);

        res.json({
            group: false,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const groupSignCheck = async (req: Request, res: Response): Promise<any> => {
    
}