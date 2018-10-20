import { Request, Response, NextFunction } from 'express';

/**
 * @description CORS 설정 미들웨어
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction} next()
 */
export default (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
