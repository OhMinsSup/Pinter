import { Request, Response } from 'express';
import User, { IUser } from '../../database/models/User';
import { serializeUsers } from '../../lib/serialize';

export const getUsers = async (req: Request, res: Response): Promise<any> => {
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
};

export const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const { displayName } = req.params;
    
    try {
        const user: IUser = await User.findByDisplayName(displayName);
        
        res.json({
            username: user.username,
            displayName: user.profile.displayName,
            thumbnail: user.profile.thumbnail,
            userId: user._id,
            follower: user.count.follower,
            following: user.count.following,
            pin: user.count.pin,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};