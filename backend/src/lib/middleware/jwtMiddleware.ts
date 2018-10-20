import { Request, Response, NextFunction } from 'express';
import { decodeToken, generateToken } from '../token';

/**
 * @description JWT 미들웨어
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction} next()
 */
export async function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | void = req.cookies.access_token;

  if (!token) {
    req['user'] = null;
    return next();
  }

  try {
    const decoded: any = await decodeToken(token);
    const cookiesOptions: any = {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    };

    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, username, displayName, thumbnail } = decoded;
      const payload: any = {
        _id,
        username,
        displayName,
        thumbnail,
      };
      const freshToken: any = await generateToken(payload);
      res.cookie('access_token', freshToken, cookiesOptions);
    }

    req['user'] = decoded;
  } catch (e) {
    req['user'] = null;
  }
  return next();
}
