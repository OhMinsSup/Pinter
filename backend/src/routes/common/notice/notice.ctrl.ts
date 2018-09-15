import { Request, Response } from 'express';
import Notice, { INotice } from '../../../database/models/Notice';
import NoticeMessage, { INoticeMessage } from '../../../database/models/NoticeMessage';
import Follow, { IFollow } from '../../../database/models/Follow';
import { serializeNoticeRoom, serializeNoticeMessage } from '../../../lib/serialize';
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
        senderId: string,
        recipientId: string,
        noticeId: string,
        message: string,
    }

    const { senderId, noticeId, message, recipientId }: BodySchema = req.body;
    const userId: string = req['user']._id;

    try {
        const followUsers: IFollow[] = await Follow.find({ follower: userId }).lean();
        const userIds = followUsers.map(users => users.following);
        const notices: INotice[] = await Promise.all(userIds.map(userId => Notice.findOne({ creator: userId }).lean()));

        const noticeMessage: INoticeMessage = await new NoticeMessage({
            sender: senderId,
            recipient: recipientId,
            notice: noticeId,
            message,
        }).save();

        const messageData = await NoticeMessage.findById(noticeMessage._id)
        .populate({
            path: 'sender',
            select: 'username profile.displayName profile.thumbnail'
        })
        .populate({
            path: 'recipient',
            select: 'username profile.displayName profile.thumbnail'
        })
        .lean();

        notices.map(notice => socketServer.getSocket.to(notice._id).emit('new-message', {
            messageWithData: serializeNoticeMessage(messageData),
        }))

        res.json({
            messageWithData: serializeNoticeMessage(messageData),
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