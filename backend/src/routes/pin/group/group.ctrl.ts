import { Request, Response } from 'express';
import * as joi from 'joi';
import Group, { IGroup } from '../../../database/models/Group';
import User, { IUser } from '../../../database/models/User';
import Pin, { IPin } from '../../../database/models/Pin';
import GroupLink, { IGroupLink } from '../../../database/models/GroupLink';
import { serializeGroups, serializeGroupPin } from '../../../lib/serialize';

export const createGroup = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    title: string;
    activation: boolean;
  };

  const shcema = joi.object().keys({
    title: joi
      .string()
      .max(200)
      .required(),
    activation: joi.boolean().required(),
  });

  const result = joi.validate(req.body, shcema);

  if (result.error) {
    return res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { title, activation }: BodySchema = req.body;
  const userId: string = req['user']._id;

  if (!title) {
    return res.status(409).json({
      name: 'Group',
      payload: '제목을 입력하지 않아 그룹을 생성할 수 없습니다',
    });
  }

  try {
    await new Group({
      title,
      user: userId,
      activation,
    }).save();

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deleteGroup = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { groupId } = req.params;

  try {
    const groupExists: IGroup = await Group.findById(groupId).lean();

    if (!groupExists) {
      return res.status(404).json({
        name: 'Group',
        payload: '존재하지 않는 그룹',
      });
    }

    await Promise.all([GroupLink.deleteMany({ group: groupId }).lean()]);
    await Group.deleteOne({ _id: groupId }).lean();

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

export const updateGroup = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    title: string;
    activation: boolean;
  };

  const shcema = joi.object().keys({
    title: joi
      .string()
      .max(200)
      .required(),
    activation: joi.boolean().required(),
  });

  const result = joi.validate(req.body, shcema);

  if (result.error) {
    return res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { title, activation }: BodySchema = req.body;
  const { groupId } = req.params;
  console.log(title, activation, groupId);
  
  try {
    const group: IGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        title,
        activation,
      },
      {
        new: true,
      }
    ).lean();

    if (!group) {
      return res.status(404).json({
        name: 'Group',
        payload: '그룹을 수정하지 못했습니다',
      });
    }

    return res.json({
      groupId: group._id,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const groupAddPin = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    pinId: string;
    groupId: string;
  };

  const { pinId, groupId }: BodySchema = req.body;

  try {
    const [pinExists, groupExists]: [IPin, IGroup] = await Promise.all([
      Pin.findById(pinId).lean(),
      Group.findById(groupId).lean(),
    ]);

    if (!pinExists || !groupExists) {
      return res.status(404).json({
        name: '존재하지 않는 그룹및 핀',
        payload: !pinExists ? 'pin' : 'group',
      });
    }

    const exists: IGroupLink = await GroupLink.findOne({
      $and: [{ group: groupExists._id }, { pin: pinExists._id }],
    }).lean();

    if (exists) {
      return res.status(204).json();
    }

    await new GroupLink({
      group: groupId,
      pin: pinId,
    }).save();

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

export const groupDeletePin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { groupId, pinId } = req.params;

  try {
    const [pinExists, groupExists]: [IPin, IGroup] = await Promise.all([
      Pin.findById(pinId).lean(),
      Group.findById(groupId).lean(),
    ]);

    if (!pinExists || !groupExists) {
      return res.status(404).json({
        name: '존재하지 않는 그룹및 핀',
        payload: !pinExists ? 'pin' : 'group',
      });
    }

    await GroupLink.deleteOne({
      group: groupId,
      pin: pinId,
    }).lean();

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

export const groupList = async (req: Request, res: Response): Promise<any> => {
  const { active, displayName } = req.params;
  const { cursor } = req.query;

  try {
    const user: IUser = await User.findByDisplayName(displayName);

    if (!user) {
      return res.status(404).json({
        name: 'User',
        payload: '유저가 존재하지 않습니다.',
      });
    }

    const groups: IGroup[] = await Group.groupList(user._id, active, cursor);

    if (groups.length === 0 || !groups) {
      return res.json({
        next: '',
        groupsWithData: [],
      });
    }

    const next =
      groups.length === 15
        ? `/pin/groups/${displayName}/list/${active}?cursor=${groups[14]._id}`
        : null;

    return res.json({
      next,
      groupsWithData: groups.map(serializeGroups),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const groupPinList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { groupId } = req.params;
  const { cursor } = req.query;

  try {
    const group: IGroup = await Group.findById(groupId).lean();

    if (!group) {
      return res.status(404).json({
        name: 'Group',
        payload: '그룹이 존재하지 않습니다.',
      });
    }

    const pins: IGroupLink[] = await GroupLink.groupPinList(groupId, cursor);

    if (pins.length === 0 || !pins) {
      return res.json({
        next: '',
        pinsWithData: [],
      });
    }

    const next =
      pins.length === 20
        ? `/pin/groups/${groupId}/list?cursor=${pins[19]._id}`
        : null;

    return res.json({
      next,
      pinsWithData: pins.map(serializeGroupPin),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const readGroup = async (req: Request, res: Response): Promise<any> => {
  const { groupId } = req.params;

  try {
    const group: IGroup = await Group.findById(groupId).lean();

    if (!group) {
      return res.status(404).json({
        name: 'Group',
        payload: '그룹이 존재하지 않습니다',
      });
    }

    return res.json({
      title: group.title,
      activation: group.activation,
      groupId: group._id,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
