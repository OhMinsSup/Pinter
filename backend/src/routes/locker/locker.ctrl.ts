import { Request, Response } from 'express';
import Locker, { ILockerModel, ILocker } from '../../database/models/Locker';
import User, { IUser } from '../../database/models/User';
import { serializeLocker } from '../../lib/serialize';
import { formatShortDescription } from '../../lib/common';

/**@return {void}
 * @description 핀 저장 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const lockerPin = async (req: Request, res: Response): Promise<any> => {
  const userId: string = req['user']._id;
  const pinId: string = req['pin']._id;

  try {
    const exists: ILockerModel = await Locker.checkExists(userId, pinId);

    if (exists) {
      return res.status(409).json({
        name: 'locker',
        payload: '이미 보관중입니다',
      });
    }

    const locker = await Locker.create({ user: userId, pin: pinId });

    return res.json({
      locker: !!locker,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 핀 저장 삭제 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const unLockerPin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId: string = req['user']._id;
  const pinId: string = req['pin']._id;

  try {
    const exists: ILockerModel = await Locker.checkExists(userId, pinId);

    if (!exists) {
      return res.status(409).json({
        name: 'locker',
        payload: '보관하지 않은 핀입니다.',
      });
    }

    await Locker.deleteOne({
      $and: [
        {
          user: userId,
          pin: pinId,
        },
      ],
    })
      .lean()
      .exec();

    return res.json({
      locker: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 핀 저장 여부 체크 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getLockerPin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId: string = req['user']._id;
  const pinId: string = req['pin']._id;

  let locker = false;

  if (userId) {
    const exists = await Locker.checkExists(userId, pinId);
    locker = !!exists;
  }

  try {
    return res.json({
      locker,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 저장한 핀 리스트 (무한 스크롤) api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const lockerList = async (req: Request, res: Response): Promise<any> => {
  type ParamPayload = {
    displayName: string;
  };

  type QueryPayload = {
    cursor?: string;
  };

  const { cursor }: QueryPayload = req.query;
  const { displayName }: ParamPayload = req.params;

  try {
    const user: IUser = await User.findByDisplayName(displayName);

    if (!user) {
      return res.status(404).json({
        name: '유저',
        payload: '존재하지 않는 유저입니다',
      });
    }

    const locker: ILocker[] = await Locker.lockerList(user._id, cursor);

    if (locker.length === 0 || !locker) {
      return res.json({
        next: '',
        pinWithData: [],
      });
    }

    const next =
      locker.length === 10
        ? `/pin/locker/private/list?cusor=${locker[9]._id}`
        : null;
    const pinWithData = locker.map(serializeLocker).map(pin => ({
      ...pin,
      body: formatShortDescription(pin.body),
    }));

    return res.json({
      next,
      pinWithData,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
