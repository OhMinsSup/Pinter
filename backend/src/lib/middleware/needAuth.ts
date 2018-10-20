import { Request, Response, NextFunction } from 'express';

/**
 * @description 로그인 체크
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction} next()
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const user = req['user'];

  if (!user) {
    return res.status(401);
  }

  return next();
};
