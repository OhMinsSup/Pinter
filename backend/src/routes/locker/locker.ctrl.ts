import { Request, Response } from 'express';
import Locker, { ILockerModel, ILocker } from '../../database/models/Locker';
import User, { IUser } from '../../database/models/User';
import { serializeLocker } from '../../lib/serialize';
import { formatShortDescription } from '../../lib/common';

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
    }).lean();

    return res.json({
      locker: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

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

export const lockerList = async (req: Request, res: Response): Promise<any> => {
  const { cursor } = req.query;
  const { displayName } = req.params;

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
