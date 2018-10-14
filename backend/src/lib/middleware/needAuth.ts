import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const user = req['user'];

  if (!user) {
    return res.status(401);
  }

  return next();
};
