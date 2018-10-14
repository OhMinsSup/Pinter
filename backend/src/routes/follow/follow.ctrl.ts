import { Request, Response } from 'express';
import User, { IUser } from '../../database/models/User';
import Follow, { IFollow } from '../../database/models/Follow';
import { serializeFollower, serializeFollowing } from '../../lib/serialize';

export const follow = async (req: Request, res: Response): Promise<any> => {
    const username: string = req['user'].username;
    const userId: string = req['user']._id;
    const { followName } = req.params;

    if (followName === username) {
        res.status(400).json({
            name: 'follow',
            payload: '자기 자신을 팔로우 할 수 없습니다.',
        });
    }

    try {
        const user: IUser = await User.findByDisplayName(followName);    

        if (!user) {
            res.status(404).json({
                name: '유저',
                payload: '존재하지 않는 유저입니다',
            });
        }

        const followId = user._id;
        const exists: IFollow = await Follow.checkExists(userId, followId);

        if (exists) {
            res.status(409).json({
                name: 'follow',
                payload: '이미 팔로우 중입니다..',
            });
        }

        await Follow.create({ following: followId, follower: userId });
        await User.followerCount(userId);
        await User.followingCount(followId);
        res.json({
            follow: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const unfollow = async (req: Request, res: Response): Promise<any> => {
    const username: string = req['user'].username;
    const userId: string = req['user']._id;
    const { followName } = req.params;
    
    if (followName === username) {
        res.status(400).json({
            name: 'follow',
            payload: '자기 자신을 언팔로우 할 수 없습니다.',
        });
    }

    try {
        const user: IUser = await User.findByDisplayName(followName);    
        
        if (!user) {
            res.status(404).json({
                name: '유저',
                payload: '존재하지 않는 유저입니다',
            });
        }

        const followId = user._id;
        const exists: IFollow = await Follow.checkExists(userId, followId);
        
        if (!exists) {
            res.status(409).json({
                name: 'follow',
                payload: '팔로우 상태가 아닙니다.',
            });
        }

        await Follow.deleteOne({ following: followId, follower: userId }).lean();
        await User.unfollowerCount(userId);
        await User.unfollowingCount(followId);

        res.json({
            follow: false,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getFollow = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const { displayName } = req.params;

    let follow = false;
    try {
        const following: IUser = await User.findByDisplayName(displayName);
        
        if (!following) {
            return res.status(404).json({
                name: 'follow',
                payload: '존재하지 않는 유저입니다',
            });
        }

        if (userId) {
            const exists = await Follow.checkExists(userId, following._id);
            follow = !!exists;
        }

        res.json({
            follow,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getFollowing = async (req: Request, res: Response): Promise<any> => {
    const { displayName } = req.params;
    const { cursor } = req.query;
    
    try {
        const user: IUser = await User.findByDisplayName(displayName);
        
        if (!user) {
            res.status(404).json({
                name: '유저',
                payload: '존재하지 않는 유저입니다',
            });
        }

        const following: IFollow[] = await Follow.followingList(user._id, cursor);

        if (following.length === 0 || !following) {
            return res.json({
                usersWithData: [],
            })
        }
        
        const usersWithData = following.map(serializeFollowing);
        res.json({
            usersWithData,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getFollower = async (req: Request, res: Response): Promise<any> => {
    const { displayName } = req.params;
    const { cursor } = req.query;
    
    try {
        const user: IUser = await User.findByDisplayName(displayName);
        
        if (!user) {
            res.status(404).json({
                name: '유저',
                payload: '존재하지 않는 유저입니다',
            });
        }

        const follwer: IFollow[] = await Follow.followerList(user._id, cursor);

        if (follwer.length === 0 || !follwer) {
            return res.json({
                usersWithData: [],
            })
        }
        
        const usersWithData = follwer.map(serializeFollower);
        res.json({
            usersWithData,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};