import { Request, Response } from 'express';
import Pin from '../../../database/models/Pin';
import Like, { ILike } from '../../../database/models/Like';

/**@return {void}
 * @description 좋아요 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const like = async (req: Request, res: Response): Promise<any> => {
  const pinId: string = req['pin']._id;
  const userId: string = req['user']._id;

  try {
    const exists: ILike = await Like.checkExists(userId, pinId);

    if (exists) {
      return res.status(409).json({
        name: 'like',
        payload: '이미 like 중입니다',
      });
    }

    await Like.create({
      user: userId,
      pin: pinId,
    });

    await Pin.like(pinId);
    const pin = await Pin.findById(pinId)
      .lean()
      .exec();

    if (!pin) {
      return res.status(500).json({
        name: 'Pin',
        payload: '핀이 존재하지 않았습니다.',
      });
    }

    return res.json({
      liked: true,
      likes: pin.likes,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 안 좋아요 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const unlike = async (req: Request, res: Response): Promise<any> => {
  const pinId: string = req['pin']._id;
  const userId: string = req['user']._id;

  const exists: ILike = await Like.checkExists(userId, pinId);

  if (!exists) {
    return res.status(409).json({
      name: 'like',
      payload: 'like를 하지 않았습니다',
    });
  }

  await Like.deleteOne({
    $and: [
      {
        pin: pinId,
        user: userId,
      },
    ],
  })
    .lean()
    .exec();
  await Pin.unlike(pinId);
  const pin = await Pin.findById(pinId)
    .lean()
    .exec();

  if (!pin) {
    return res.status(500).json({
      name: 'Pin',
      payload: '핀이 존재하지 않았습니다.',
    });
  }

  return res.json({
    liked: false,
    likes: pin.likes,
  });
};

/**@return {void}
 * @description 좋아요 체크 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getLike = async (req: Request, res: Response): Promise<any> => {
  const pinId: string = req['pin']._id;
  const userId: string = req['user']._id;

  let liked: boolean = false;

  try {
    if (userId) {
      const exists = await Like.checkExists(userId, pinId);
      liked = !!exists;
    }

    const pin = await Pin.findById(pinId)
      .lean()
      .exec();

    if (!pin) {
      return res.status(500).json({
        name: 'Pin',
        payload: '핀이 존재하지 않았습니다.',
      });
    }

    return res.json({
      liked,
      likes: pin.likes,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
