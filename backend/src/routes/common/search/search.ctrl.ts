import { Request, Response } from 'express';
import Pin, { IPin } from '../../../database/models/Pin';
import User, { IUser } from '../../../database/models/User';
import { serializePinList, serializeUsers } from '../../../lib/serialize';
import { formatShortDescription } from '../../../lib/common';

/**@return {void}
 * @description 핀 검색 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const serachPin = async (req: Request, res: Response): Promise<any> => {
  type BodySchema = {
    value: string;
  };

  const { value }: BodySchema = req.body;
  const { cursor } = req.query;

  if (!value) {
    return res.status(204).json({
      next: '',
      Data: [],
    });
  }

  const searchBy = Object.assign({}, cursor ? { _id: { $lt: cursor } } : {});

  try {
    const pins: IPin[] = await Pin.find(searchBy)
      .or([{ body: { $regex: value } }, { relationUrl: { $regex: value } }])
      .populate('user')
      .sort({ _id: -1 })
      .limit(10)
      .lean()
      .exec();

    const next =
      pins.length === 10 ? `/common/search/pin?cursor=${pins[9]._id}` : null;

    return res.json({
      next,
      Data: pins.map(serializePinList).map(pin => ({
        ...pin,
        body: formatShortDescription(pin.body),
      })),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 유저 검색 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const serachUser = async (req: Request, res: Response): Promise<any> => {
  type BodySchema = {
    value?: string;
  };

  const { value }: BodySchema = req.body;
  const { cursor } = req.query;

  if (!value) {
    return res.status(204).json({
      next: '',
      Data: [],
    });
  }

  const searchBy = Object.assign(
    {},
    cursor
      ? {
          _id: {
            $lt: cursor,
          },
          'profile.displayName': {
            $regex: value,
          },
        }
      : {
          'profile.displayName': {
            $regex: value,
          },
        }
  );

  try {
    const users: IUser[] = await User.find(searchBy)
      .limit(10)
      .sort({ _id: -1 })
      .lean()
      .exec();

    const next =
      users.length === 10 ? `/common/search/user?cursor=${users[9]._id}` : null;

    return res.json({
      next,
      Data: users.map(serializeUsers),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
