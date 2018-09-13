import { Request, Response } from 'express';
import Tag, { ITag } from '../../database/models/Tag';
import TagLink from '../../database/models/TagLink';
import { serializeTag, serializeTagPin } from '../../lib/serialize';

export const getTags = async (req: Request, res: Response): Promise<any> => {
    const { sort = 'latest' } = req.query;
    const availableSort = ['latest', 'name'];

    if (availableSort.indexOf(sort) === -1) {
        return res.status(400).json({
            name: '존재하지 않는 정렬입니다',
        });
    }

    const sortBy = Object.assign(
        {},
        sort === 'latest' ? { '_id': -1 } : { 'name': 'asc' }, 
    );
    
    try {
        const tagData = await TagLink.aggregate([
            {   
                $group: {
                    _id: '$tagId',
                    tagId: { "$first": "$tagId" },
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tagId",
                    foreignField: "_id",
                    as: "tag_docs"
                },
            },
            { $unwind: '$tag_docs' },
        ]).sort(sortBy);
        
        res.json(tagData.map(serializeTag));
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getTagInfo = async (req: Request, res: Response): Promise<any> => {
    const { tag } = req.params;

    try {
        const tagName: ITag = await Tag.findByTagName(tag);
        const pinData = await TagLink.find({ tagId: tagName._id })
        .populate({
            path: 'pinId',
            populate: {
                path: 'user',
            }
        })
        .lean();
        
        res.json({
            pinWithData: pinData.map(serializeTagPin)
        });
    } catch (e) {
        res.status(500).json(e);
    }
};