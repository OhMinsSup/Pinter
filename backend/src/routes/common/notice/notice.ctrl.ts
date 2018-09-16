import { Request, Response } from 'express';
import Notice, { INotice } from '../../../database/models/Notice';
import NoticeMessage, { INoticeMessage } from '../../../database/models/NoticeMessage';
import Follow, { IFollow } from '../../../database/models/Follow';
import { serializeNoticeRoom } from '../../../lib/serialize';
import socketServer from '../../../lib/socket';

export const getNoticeRoom = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;

    try {
        const exists: INotice = await Notice.findOne({
            creator: userId
        }).populate({
            path: 'creator',
            select: 'username profile.displayName profile.thumbnail'
        }).lean();

        if (exists) {
            return res.json({
                noticeWithData: serializeNoticeRoom(exists),
            });
        }

        const notice: INotice = await new Notice({
            creator: userId,
        }).save();
        
        const noticeData: INotice = await Notice.findById(notice._id)
        .populate({ 
            path: 'creator',
            select: 'username profile.displayName profile.thumbnail'
        }).lean();

        res.json({
            noticeWithData: serializeNoticeRoom(noticeData),
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
    type BodySchema = {
        message: string,
    }

    const { message }: BodySchema = req.body;
    const userId: string = req['user']._id;
    const username: string = req['user'].displayName;

    try {
        const followingUsers: IFollow[] = await Follow.find({ follower: userId }).lean();

        const followingIds = followingUsers.map(user => user.following);

        const following: INotice[] =  await Promise.all(followingIds.map(follower => Notice.findOne({ creator: follower })
        .populate({
            path: 'creator',
            select: 'username profile.displayName profile.thumbnail'
        })
        .lean()));
        
        const messageData: INoticeMessage[] = await Promise.all(following.map(user => {
            const notice = new NoticeMessage({
                sender: userId,
                recipient: user.creator._id,
                notice: user._id,
                message: `${user.creator.profile.displayName}님 ${username}님이 ${message} 하였습니다`,
            }).save();
            return notice;
        })) 

        messageData.map(message => {
            socketServer.getSocket.to((message.notice as any)).emit('new-message', {
                message: message.message,
            });
        });

        res.json({
            messageWithData: messageData,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const getNoticeList = async (req: Request, res: Response): Promise<any> => {
    try {
        res.json('리스트')
    } catch (e) {
        res.status(500).json(e);
    }
}