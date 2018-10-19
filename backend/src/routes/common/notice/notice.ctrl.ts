import { Request, Response } from 'express';
import Notice, { INotice } from '../../../database/models/Notice';
import NoticeMessage, {
  INoticeMessage,
} from '../../../database/models/NoticeMessage';
import Follow, { IFollow } from '../../../database/models/Follow';
import { serializeNoticeRoom } from '../../../lib/serialize';
import { filterUnique } from '../../../lib/common';

/**@return {void}
 * @description 알림방 생성및 체크 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
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
      .lean()
      .exec();

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
      .lean()
      .exec();

    return res.json({
      noticeWithData: serializeNoticeRoom(noticeData),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 핀 작성, 수정, 팔로우, 언팔로우, 좋아요, 안좋아요를 메세지 보내는 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
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
    })
      .lean()
      .exec();
    const followerUsers: IFollow[] = await Follow.find({
      following: userId,
    })
      .lean()
      .exec();

    if (
      (!followingUsers || followingUsers.length === 0) &&
      (!followerUsers || followerUsers.length === 0)
    ) {
      return res.status(204).json();
    }

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
          .exec()
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

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 알림 메세지 리스트 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getNoticeList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId: string = req['user']._id;

  try {
    const notice: INotice = await Notice.findOne({ creator: userId })
      .lean()
      .exec();

    if (!notice) {
      return res.status(404).json({
        name: '알림방이 존재하지 않습니다',
      });
    }

    const message: INoticeMessage[] = await NoticeMessage.find({
      notice: notice._id,
    })
      .populate('sender')
      .sort({ _id: -1 })
      .lean()
      .exec();

    return res.json({
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
