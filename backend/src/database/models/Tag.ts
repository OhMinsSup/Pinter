import { Schema, model, Document, Model } from 'mongoose';

export interface ITag extends Document {
  _id: string;
  name?: string;
}

export interface ITagModel extends Model<ITag> {
  getTagId(name: string): Promise<any>;
  bulkGetNewId(names: string[]): Promise<any>;
  bulkGetMissingId(names: string[]): Promise<any>;
  findByTagName(name: string): Promise<any>;
}

const Tag = new Schema({
  name: {
    type: String,
    lowercase: true,
    index: true,
  },
});

Tag.statics.getTagId = async function(name: string): Promise<any> {
  try {
    let tag: ITag = await this.findOne({
      $and: [
        {
          $or: [{ name: name.toLowerCase() }, { name }],
        },
        {
          $or: [
            {
              name:
                (name.replace('/s$', null) || name.replace('/-/', null)) &&
                name.toLowerCase(),
            },
            {
              name:
                (name.replace('/s$', null) || name.replace('/-/', null)) &&
                name,
            },
          ],
        },
      ],
    }).lean();

    if (!tag) {
      tag = await this.create({
        name,
      });

      return tag._id;
    }

    return tag._id;
  } catch (e) {
    throw e;
  }
};

Tag.statics.bulkGetNewId = async function(names: string[]): Promise<any> {
  if (names.length === 0) return;

  try {
    const tagData: ITag[] = await this.find({
      name: names,
    }).lean();

    const missingTags = names.filter(
      name => tagData.findIndex(tag => tag.name === name) === -1
    );
    const newTagIds: string[] = (await this.create(
      missingTags.map(name => ({ name }))
    )).map((tag: ITag) => tag._id);

    return newTagIds.map(tag => tag);
  } catch (e) {
    throw e;
  }
};

Tag.statics.bulkGetMissingId = async function(names: string[]): Promise<any> {
  if (names.length === 0) return;

  try {
    const tagData: ITag[] = await this.find({
      $and: [
        {
          name: names,
        },
      ],
    }).lean();

    const tagIds = tagData.map(tag => tag._id);
    return tagIds;
  } catch (e) {
    throw e;
  }
};

Tag.statics.findByTagName = function(name: string): Promise<any> {
  return this.findOne({
    $and: [
      {
        $or: [{ name: name.toLowerCase() }, { name }],
      },
      {
        $or: [
          {
            name:
              (name.replace('/s$', null) || name.replace('/-/', null)) &&
              name.toLowerCase(),
          },
          {
            name:
              (name.replace('/s$', null) || name.replace('/-/', null)) && name,
          },
        ],
      },
    ],
  }).lean();
};

const TagModel = model<ITag>('Tag', Tag) as ITagModel;

export default TagModel;
