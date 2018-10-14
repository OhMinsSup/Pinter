import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import { sendMail } from '../../lib/sendMail';
import { generateToken, decodeToken } from '../../lib/token';
import getSocialProfile, { IProfile } from '../../lib/social';
import User, { IUser } from '../../database/models/User';
import EmailAuth, { IEmailAuth } from '../../database/models/EmailAuth';

export const sendAuthEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    email: string;
  };

  const schema = joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
  });

  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { email }: BodySchema = req.body;

  try {
    const auth: IUser = await User.findByEmailOrUsername('email', email);
    const emailKeywords = auth
      ? {
          type: 'email-login',
          text: '로그인',
        }
      : {
          type: 'email-register',
          text: '회원가입',
        };

    const verification = await EmailAuth.create({
      email,
    });

    await sendMail({
      to: email,
      from: 'veloss <verification@gmail.com>',
      subject: `veloss ${emailKeywords.text}`,
      html: `
            <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
                <b style="black">안녕하세요! </b> ${
                  emailKeywords.text
                }을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
            </div>
            <a href="http://localhost:3000/${emailKeywords.type}?code=${
        verification.code
      }" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">계속하기</a>
            <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="http://localhost:3000/${
              emailKeywords.type
            }?code=${verification.code}">http://localhost:3000/${
        emailKeywords.type
      }?code=${
        verification.code
      }</a></div><br/><div>이 링크는 24시간동안 유효합니다. </div></div>`,
    });

    res.json({
      isUser: !!auth,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const localRegister = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    registerToken: string;
    displayName: string;
    username: string;
  };

  const schema = joi.object().keys({
    registerToken: joi.string().required(),
    displayName: joi
      .string()
      .min(1)
      .max(40)
      .required(),
    username: joi
      .string()
      .min(2)
      .max(16)
      .required(),
  });

  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { registerToken, username, displayName }: BodySchema = req.body;

  try {
    let decoded = await decodeToken(registerToken);

    if (!decoded) {
      return res.status(400).json({
        name: '토큰 발급',
        payload: '토큰이 발급이 되지 않았습니다',
      });
    }

    const { email } = decoded;

    const [emailExists, usernameExists]: IUser[] = await Promise.all([
      User.findByEmailOrUsername('email', email),
      User.findByEmailOrUsername('username', username),
    ]);

    if (emailExists || usernameExists) {
      res.status(409).json({
        name: '중복된 계정',
        payload: emailExists ? 'email' : 'username',
      });
      return;
    }

    const auth: IUser = await new User({
      username,
      email,
      profile: {
        displayName,
      },
    }).save();

    const token: string = await User.generate(auth);

    if (!token) {
      res.status(409).json({
        name: '토큰 발급',
        payload: '토큰이 만들어지지 않았습니다',
      });
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      user: {
        id: auth._id,
        username: auth.username,
        displayName: auth.profile.displayName,
        thumbnail: auth.profile.thumbnail,
      },
      token,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const localLogin = async (req: Request, res: Response): Promise<any> => {
  type BodySchema = {
    code: string;
  };

  const { code }: BodySchema = req.body;

  if (typeof code !== 'string' || !code) {
    res.status(400).json({
      name: '유효성',
      payload: '코드의 타입및 코드의 값이 존재하지 않습니다',
    });
  }

  try {
    const auth: IEmailAuth = await EmailAuth.findCode(code);

    if (!auth) {
      res.status(404).json({
        name: '코드',
        payload: '코드의 타입및 코드의 값이 존재하지 않습니다',
      });
    }

    const { email } = auth;
    const user: IUser = await User.findByEmailOrUsername('email', email);

    if (!user) {
      res.status(401).json({
        name: '계정 체크',
        payload: '유저가 존재하지 않았습니다',
      });
    }

    const token: string = await User.generate(user);

    if (!token) {
      res.status(409).json({
        name: '토큰 발급',
        payload: '토큰이 만들어지지 않았습니다',
      });
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.profile.displayName,
        thumbnail: user.profile.thumbnail,
      },
      token,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const code = async (req: Request, res: Response): Promise<any> => {
  const { code } = req.params;

  if (!code) {
    res.status(400).json({
      name: '유효성',
      payload: '코드의 값이 존재하지 않습니다',
    });
  }

  try {
    const auth: IEmailAuth = await EmailAuth.findCode(code);

    if (!auth) {
      res.status(404).json({
        name: '코드',
        payload: '코드의 타입및 코드의 값이 존재하지 않습니다',
      });
    }

    const { email, code: emailCode } = auth;
    const registerToken: string = await generateToken(
      { email },
      { expiresIn: '1h', subject: 'auth-register' }
    );

    if (!registerToken) {
      res.status(409).json({
        name: '토큰 발급',
        payload: '토큰이 만들어지지 않았습니다',
      });
    }

    await EmailAuth.use(emailCode);

    res.json({
      email,
      registerToken,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const check = async (req: Request, res: Response): Promise<any> => {
  const user = req['user'];

  if (!user) {
    res.status(401).json({
      name: '로그인',
      payload: '로그인을 하지않았습니다.',
    });
  }

  res.json({
    user,
  });
};

export const logout = async (res: Response): Promise<any> => {
  res.cookie('access_token', null, {
    httpOnly: true,
    maxAge: 0,
  });

  res.status(204);
};

export const socialRegister = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    accessToken: string;
    displayName: string;
    username: string;
  };

  const schema = joi.object().keys({
    accessToken: joi.string().required(),
    displayName: joi
      .string()
      .min(1)
      .max(40),
    username: joi
      .string()
      .min(2)
      .max(16)
      .required(),
  });

  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { provider } = req.params;
  const { displayName, username, accessToken }: BodySchema = req.body;

  let profile: IProfile = null;

  try {
    profile = await getSocialProfile(provider, accessToken);
  } catch (e) {
    res.status(500).json(e);
  }

  if (!profile) {
    res.status(401).json({
      name: '소셜 프로필',
      payload: '소셜 프로필을 가져오지 못했습니다',
    });
  }

  const { id: socialId, thumbnail, email } = profile;

  try {
    const [emailExists, usernameExists]: IUser[] = await Promise.all([
      User.findByEmailOrUsername('email', email),
      User.findByEmailOrUsername('username', username),
    ]);

    if (emailExists || usernameExists) {
      res.status(409).json({
        name: '중복된 계정',
        payload: emailExists ? 'email' : 'username',
      });
    }

    const socialExists: IUser = await User.findBySocial(provider, socialId);

    if (socialExists) {
      res.status(409).json({
        name: '소셜 계정',
        payload: '이미 가입한 소셜 계정',
      });
    }

    const auth: IUser = await User.create({
      username,
      email,
      profile: {
        displayName,
        thumbnail,
      },
      social: {
        [provider]: {
          id: socialId,
          accessToken,
        },
      },
    });

    const token: string = await User.generate(auth);

    if (!token) {
      res.status(409).json({
        name: '토큰 발급',
        payload: '토큰이 만들어지지 않았습니다',
      });
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      user: {
        id: auth._id,
        username: auth.username,
        displayName: auth.profile.displayName,
        thumbnail: auth.profile.thumbnail,
      },
      token,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const socialLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    accessToken: string;
  };

  const { accessToken }: BodySchema = req.body;
  const { provider } = req.params;

  let profile: IProfile = null;

  try {
    profile = await getSocialProfile(provider, accessToken);
  } catch (e) {
    res.status(500).json(e);
  }

  if (!profile) {
    res.status(401).json({
      name: '소셜 프로필',
      payload: '소셜 프로필을 가져오지 못했습니다',
    });
  }

  const socialId = profile.id;

  try {
    let user: IUser = await User.findBySocial(provider, socialId);

    if (!user) {
      user = await User.findByEmailOrUsername('email', profile.email);

      if (!user) {
        res.status(404).json({
          name: '계정',
          payload: '등록되어 있지 않습니다.',
        });
      }

      await User.create({
        social: {
          [provider]: {
            id: socialId,
            accessToken,
          },
        },
      });
    }

    const token: string = await User.generate(user);

    if (!token) {
      res.status(409).json({
        name: '토큰 발급',
        payload: '토큰이 만들어지지 않았습니다',
      });
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        displayName: user.profile.displayName,
        thumbnail: user.profile.thumbnail,
      },
      token,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const verifySocial = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    accessToken: string;
  };

  const { accessToken }: BodySchema = req.body;
  const { provider } = req.params;

  let profile: IProfile = null;

  try {
    profile = await getSocialProfile(provider, accessToken);
  } catch (e) {
    res.status(500).json(e);
  }

  if (!profile) {
    res.status(401).json({
      name: '소셜 프로필',
      payload: '소셜 프로필을 가져오지 못했습니다',
    });
  }

  try {
    const [socialAuth, user]: IUser[] = await Promise.all([
      User.findBySocial(provider, profile.id),
      User.findByEmailOrUsername('email', profile.email),
    ]);

    res.json({
      profile,
      exists: !!(socialAuth || user),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
