import { Request, Response } from 'express';
import Tag, { ITag } from '../../database/models/Tag';
import TagLink from '../../database/models/TagLink';
import { serializeTag, serializeTagPin } from '../../lib/serialize';
import { formatShortDescription } from '../../lib/common';
import { IPin } from '../../database/models/Pin';

/**@return {void}
 * @description 태그정보와 갯수를 보여주는 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getTags = async (req: Request, res: Response): Promise<any> => {
  type QueryPayload = {
    sort: string;
  };

  const { sort = 'latest' }: QueryPayload = req.query;

  // 이름순 최신순
  const availableSort = ['latest', 'name'];

  if (availableSort.indexOf(sort) === -1) {
    res.status(400).json({
      name: '존재하지 않는 정렬입니다',
    });
  }

  const sortBy = Object.assign(
    {},
    sort === 'latest' ? { _id: -1 } : { name: 'asc' }
  );

  try {
    // 태그 정보를 가져오면서 갯수를 가져온다
    const tagData = await TagLink.aggregate([
      {
        $group: {
          _id: '$tagId',
          tagId: { $first: '$tagId' },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tagId',
          foreignField: '_id',
          as: 'tag_docs',
        },
      },
      { $unwind: '$tag_docs' },
    ])
      .sort(sortBy)
      .exec();

    return res.json(tagData.map(serializeTag));
  } catch (e) {
    res.status(500).json(e);
  }
};

/**@return {void}
 * @description 태그에 대한 핀정보를 가져오는 api
 * @param {Response} res HTTP 요청을 받으면 Express 응용 프로그램이 보내는 HTTP 응답을 나타냅니다
 * @param {Request} req HTTP 요청을 나타내며 요청 쿼리 문자열, 매개 변수, 본문, HTTP 헤더 등에 대한 속성을 포함합니다
 */
export const getTagInfo = async (req: Request, res: Response): Promise<any> => {
  type ParamsPayload = {
    tag: string;
  };

  const { tag }: ParamsPayload = req.params;

  try {
    const tagName: ITag = await Tag.findByTagName(tag);
    const pinData: IPin[] = await TagLink.find({ tagId: tagName._id })
      .populate({
        path: 'pinId',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();

    return res.json({
      pinWithData: pinData
        .map(serializeTagPin)
        .map(pin => ({ ...pin, body: formatShortDescription(pin.body) })),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};
