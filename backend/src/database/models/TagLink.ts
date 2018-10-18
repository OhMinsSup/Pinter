import { Schema, model, Document, Model } from 'mongoose';
import Tag, { ITag } from './Tag';
import { IPin } from './Pin';

export interface ITagLink extends Document {
  _id: string;
  tagId?: ITag;
  pinId?: IPin;
}

export interface ITagLinkModel extends Model<ITagLink> {
  Link(pinId: string, tagIds: string[]): Promise<any>;
  addTagsToPin(pinId: string, tags: string[]): Promise<any>;
  removeTagsPin(pinId: string, tags: string[]): Promise<any>;
  getTagNames(pinId: string): Promise<any>;
}

const TagLink = new Schema({
  pinId: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    index: true,
  },
  tagId: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    index: true,
  },
});

TagLink.statics.Link = function(pinId: string, tagIds: string[]): Promise<any> {
  const promises = tagIds.map(tagId =>
    this.create({
      pinId,
      tagId,
    })
  );
  return Promise.all(promises);
};

TagLink.statics.addTagsToPin = async function(
  pinId: string,
  tags: string[]
): Promise<any> {
  if (tags.length === 0) return;

  try {
    const tagIds: string[] = await Tag.bulkGetNewId(tags);
    await this.create(tagIds.map(tagId => ({ pinId, tagId })));
  } catch (e) {
    throw e;
  }
};

TagLink.statics.removeTagsPin = async function(
  pinId: string,
  tags: string[]
): Promise<any> {
  if (tags.length === 0) return;

  try {
    const tagIds: string[] = await Tag.bulkGetMissingId(tags);
    await this.deleteMany({
      $and: [
        {
          $or: [{ pinId }, { tagId: tagIds }],
        },
      ],
    })
      .lean()
      .exec();
  } catch (e) {
    throw e;
  }
};

TagLink.statics.getTagNames = function(pinId: string): Promise<any> {
  if (!pinId) return;

  return this.find({
    pinId,
  })
    .populate({
      path: 'tagId',
      select: 'name',
    })
    .lean()
    .exec();
};

const TagLinkModel = model<ITagLink>('TagLink', TagLink) as ITagLinkModel;

export default TagLinkModel;
