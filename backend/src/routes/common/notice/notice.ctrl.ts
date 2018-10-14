import { Request, Response } from 'express';
import Notice, { INotice } from '../../../database/models/Notice';
import NoticeMessage, {
  INoticeMessage,
} from '../../../database/models/NoticeMessage';
import Follow, { IFollow } from '../../../database/models/Follow';
import { serializeNoticeRoom } from '../../../lib/serialize';
import { filterUnique } from '../../../lib/common';

export const createNoticeRoom = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId: string = req['user']._id;

  try {
    const exists: INotice = await Notice.findOne({
      creator: userId,
    })
      .populate({
        path: 'creator',
        select: 'username profile.displayName profile.thumbnail',
      })
      .lean();

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
        select: 'username profile.displayName profile.thumbnail',
      })
      .lean();

    res.json({
      noticeWithData: serializeNoticeRoom(noticeData),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    message: string;
  };

  const { message }: BodySchema = req.body;
  const userId: string = req['user']._id;
  const displayName: string = req['user'].displayName;
  let userIds: string[] = [];

  try {
    // 내가 팔로우한 유저
    const followingUsers: IFollow[] = await Follow.find({
      follower: userId,
    }).lean();
    const followerUsers: IFollow[] = await Follow.find({
      following: userId,
    }).lean();

    // 팔로우, 팔로잉 유저의 아이디를 가져와 userIds에 저장
    followingUsers.map(user => userIds.push(user.following as any));
    followerUsers.map(user => userIds.push(user.follower as any));

    // 중복 아이디 제거
    const uniqueUserIds: string[] = filterUnique(userIds);

    // 각 아이디의 notice를 찾아서 온다
    const notice: INotice[] = await Promise.all(
      uniqueUserIds.map(userId =>
        Notice.findOne({ creator: userId })
          .populate({
            path: 'creator',
            select: 'username profile.displayName profile.thumbnail',
          })
          .lean()
      )
    );

    await Promise.all(
      notice.map(notice => {
        const m = new NoticeMessage({
          sender: userId,
          recipient: notice.creator._id,
          notice: notice._id,
          message: `${
            notice.creator.profile.displayName
          }님 ${displayName}님이 ${message} 하였습니다`,
        }).save();
        return m;
      })
    );

    res.status(204);
  } catch (e) {
    res.status(500).json, e;
  }
};

export const getNoticeList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId: string = req['user']._id;

  try {
    const notice: INotice = await Notice.findOne({ creator: userId }).lean();

    if (!notice) {
      res.status(404).json({
        name: '알림방이 존재하지 않습니다',
      });
    }

    const message: INoticeMessage[] = await NoticeMessage.find({
      notice: notice._id,
    })
      .populate('sender')
      .sort({ _id: -1 })
      .lean();

    res.json({
      message: message.map(m => {
        const { message, sender } = m;
        return {
          message,
          thumbnail: sender.profile.thumbnail,
        };
      }),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
