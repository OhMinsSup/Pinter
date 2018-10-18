import { Request, Response } from 'express';
import * as joi from 'joi';
import Comment, { IComment } from '../../../database/models/Comment';
import User, { IUser } from '../../../database/models/User';
import Pin from '../../../database/models/Pin';
import { serializeComment } from '../../../lib/serialize';

export const writeComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  type BodySchema = {
    text: string;
    tags: string[];
  };

  const schema = joi.object().keys({
    text: joi.string(),
    tags: joi
      .array()
      .items(joi.string())
      .required(),
  });

  const result = joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });
  }

  const { text, tags }: BodySchema = req.body;
  const pinId: string = req['pin']._id;
  const userId: string = req['user']._id;

  try {
    const tagUserNames: IUser[] = await Promise.all(
      tags.map(tag =>
        User.findOne({ 'profile.displayName': tag })
          .select('_id')
          .lean()
          .exec()
      )
    );
    const tagIds = tagUserNames.map(id => id).filter(e => e);

    const comment = await Comment.create({
      pin: pinId,
      user: userId,
      text,
      has_tags: tagIds,
    });

    await Pin.comment(pinId);
    const commentWithData = await Comment.readComment(comment._id);
    res.json(serializeComment(commentWithData));
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { commentId } = req.params;
  const pinId: string = req['pin']._id;

  try {
    const comment: IComment = await Comment.findById(commentId)
      .lean()
      .exec();

    if (!comment) {
      return res.status(404).json({
        name: '존재하지않는 댓글은 삭제할 수 없습니다.',
      });
    }

    await Pin.uncomment(pinId);
    await Comment.deleteOne({
      $and: [
        {
          _id: commentId,
          pin: pinId,
        },
      ],
    })
      .lean()
      .exec();

    return res.status(204).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getCommentList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const pinId: string = req['pin']._id;

  try {
    const comment: IComment[] = await Comment.getCommentList(pinId);

    if (comment.length === 0 || !comment) {
      return res.json({
        commentWithData: [],
      });
    }

    const commentWithData = comment.map(serializeComment);
    return res.json({
      commentWithData,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
