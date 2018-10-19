import { Request, Response } from 'express';
import User, { IUser } from '../../database/models/User';
import { serializeUsers } from '../../lib/serialize';

/**@return {void}
 * @description 유저 리스트 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getUsers = async (req: Request, res: Response): Promise<any> => {
  type QueryPayload = {
    cursor?: string;
  };

  const { cursor }: QueryPayload = req.query;

  try {
    const user: IUser[] = await User.usersList(cursor);

    if (user.length === 0 || !user) {
      return res.json({
        next: '',
        usersWithData: [],
      });
    }

    const next =
      user.length === 15 ? `/common/users?cursor=${user[14]._id}` : null;

    return res.json({
      next,
      usersWithData: user.map(serializeUsers),
    });
  } catch (e) {
    console.log(e);
  }
};

/**@return {void}
 * @description 유저 정보 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  type ParamPayload = {
    displayName: string;
  };

  const { displayName }: ParamPayload = req.params;

  try {
    const user: IUser = await User.findByDisplayName(displayName);

    return res.json({
      username: user.username,
      displayName: user.profile.displayName,
      thumbnail: user.profile.thumbnail,
      userId: user._id,
      follower: user.count.follower,
      following: user.count.following,
      pin: user.count.pin,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
