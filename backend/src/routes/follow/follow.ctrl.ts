import { Request, Response } from 'express';
import User, { IUser } from '../../database/models/User';
import Follow, { IFollow } from '../../database/models/Follow';
import { serializeFollower, serializeFollowing } from '../../lib/serialize';

/**@return {void}
 * @description 팔로우 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const follow = async (req: Request, res: Response): Promise<any> => {
  type ParamsPayload = {
    followName: string;
  };

  const displayName: string = req['user'].displayName;
  const userId: string = req['user']._id;
  const { followName }: ParamsPayload = req.params;

  if (followName === displayName) {
    return res.status(400).json({
      name: 'follow',
      payload: '자기 자신을 팔로우 할 수 없습니다.',
    });
  }

  try {
    // 유저 존재여부 체크
    const user: IUser = await User.findByDisplayName(followName);

    if (!user) {
      return res.status(404).json({
        name: '유저',
        payload: '존재하지 않는 유저입니다',
      });
    }

    const followId = user._id;

    // 팔로우 여부 체크
    const exists: IFollow = await Follow.checkExists(userId, followId);

    if (exists) {
      return res.status(409).json({
        name: 'follow',
        payload: '이미 팔로우 중입니다..',
      });
    }

    // 팔로우 새성
    await Follow.create({ following: followId, follower: userId });

    // 카운터
    await User.followerCount(userId);
    await User.followingCount(followId);
    return res.json({
      follow: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 언팔로우 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const unfollow = async (req: Request, res: Response): Promise<any> => {
  type ParamsPayload = {
    followName: string;
  };

  const displayName: string = req['user'].displayName;
  const userId: string = req['user']._id;
  const { followName }: ParamsPayload = req.params;

  if (followName === displayName) {
    return res.status(400).json({
      name: 'follow',
      payload: '자기 자신을 언팔로우 할 수 없습니다.',
    });
  }

  try {
    // 유저 존재여부 체크
    const user: IUser = await User.findByDisplayName(followName);

    if (!user) {
      return res.status(404).json({
        name: '유저',
        payload: '존재하지 않는 유저입니다',
      });
    }

    const followId = user._id;

    // 팔로우 여부 체크
    const exists: IFollow = await Follow.checkExists(userId, followId);

    if (!exists) {
      return res.status(409).json({
        name: 'follow',
        payload: '팔로우 상태가 아닙니다.',
      });
    }

    // 팔로우 삭제
    await Follow.deleteOne({ following: followId, follower: userId })
      .lean()
      .exec();

    // 카운터
    await User.unfollowerCount(userId);
    await User.unfollowingCount(followId);

    return res.json({
      follow: false,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 팔로우 체크 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getFollow = async (req: Request, res: Response): Promise<any> => {
  type ParamsPayload = {
    displayName: string;
  };

  const userId: string = req['user']._id;
  const { displayName }: ParamsPayload = req.params;

  let follow: boolean = false;

  try {
    // 팔로우 되어있는지 확인
    const following: IUser = await User.findByDisplayName(displayName);

    if (!following) {
      return res.status(404).json({
        name: 'follow',
        payload: '존재하지 않는 팔로우 유저입니다',
      });
    }

    if (userId) {
      // 팔로우 체크
      const exists = await Follow.checkExists(userId, following._id);
      follow = !!exists;
    }

    return res.json({
      follow,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 팔로잉 리스트 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getFollowing = async (
  req: Request,
  res: Response
): Promise<any> => {
  type ParamsPayload = {
    displayName: string;
  };

  type QueryPayload = {
    cursor: boolean;
  };

  const { displayName }: ParamsPayload = req.params;
  const { cursor }: QueryPayload = req.query;

  try {
    const user: IUser = await User.findByDisplayName(displayName);

    if (!user) {
      return res.status(404).json({
        name: '유저',
        payload: '존재하지 않는 유저입니다',
      });
    }

    // 팔로잉 리스트 (true 이면 전체 false 이면 10개만 보여준다)
    const following: IFollow[] = await Follow.followingList(user._id, cursor);

    if (following.length === 0 || !following) {
      return res.json({
        usersWithData: [],
      });
    }

    const usersWithData = following.map(serializeFollowing);

    return res.json({
      usersWithData,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 팔로우 리스트 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getFollower = async (
  req: Request,
  res: Response
): Promise<any> => {
  type ParamsPayload = {
    displayName: string;
  };

  type QueryPayload = {
    cursor: boolean;
  };

  const { displayName }: ParamsPayload = req.params;
  const { cursor }: QueryPayload = req.query;

  try {
    const user: IUser = await User.findByDisplayName(displayName);

    if (!user) {
      return res.status(404).json({
        name: '유저',
        payload: '존재하지 않는 유저입니다',
      });
    }

    // 팔로우 리스트 (true 이면 전체 false 이면 10개만 보여준다)
    const follwer: IFollow[] = await Follow.followerList(user._id, cursor);

    if (follwer.length === 0 || !follwer) {
      return res.json({
        usersWithData: [],
      });
    }

    const usersWithData = follwer.map(serializeFollower);

    return res.json({
      usersWithData,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
