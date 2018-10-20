import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Pin from '../database/models/Pin';

/**
 * @description 중복 값을 제거
 * @param {string[]} array
 * @returns {string[]} array
 */
export const filterUnique = (array: string[]) => {
  return [...new Set(array)];
};

/**
 * @description 핀이 존재하는지 체크하는 미들웨어
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction} next()
 */
export const checkPinExistancy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const pin = await Pin.findById(id)
      .lean()
      .exec();

    if (!pin) {
      return res.status(404).json({
        name: 'pin이 존재하지 않습니다',
      });
    }

    req['pin'] = pin;
  } catch (e) {
    return res.status(500).json(e);
  }
  return next();
};

/**
 * @description id값이 오브젝트 id값인지 체크
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction} next()
 */
export const checkObjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type ParamPayload = {
    id: string;
  };

  const { id }: ParamPayload = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400); // 400 Bad Request
  }
  return next();
};

/**
 * @description 글자수가 200자 이상이면  나머지 문자를 생략하고 ...으로 교체
 * @param {string} body
 * @returns {string} replaced
 */
export function formatShortDescription(body: string): string {
  const replaced = body.replace(/\n/g, ' ');
  return replaced.slice(0, 100) + (replaced.length > 100 ? '...' : '');
}
