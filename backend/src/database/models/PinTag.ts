import { Schema, model, Document, Model } from 'mongoose';
import { IPin } from './Pin';
import Tag, { ITag } from './Tag';

export interface IPinTag extends Document {
    tag: ITag;
    pin: IPin;
}

export interface IPinTagModel extends Model<IPinTag> {
    link(pinId: string, tagIds: Array<string>): Promise<any>;
    removeTagsFromPin(pinId: string, tags: Array<string>): Promise<any>;
    addTagsToPin(pinId: string, tags: Array<string>): Promise<any>;
    getTagNames(pinId: string): Promise<any>;
}

const PinTag = new Schema({
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }
});


PinTag.statics.link = function (pinId: string, tagIds: Array<string>): Promise<any> {
    const promises = tagIds.map(tagId => this.create({
        tag: tagId,
        pin: pinId
    }))

    return Promise.all(promises);
};

PinTag.statics.getTagNames = function(pinId: string): Promise<any> {
    return this.find({
        pin: pinId
    }, {
        select: 'tag'
    })
    .populate({
        path: 'tag',
        select: 'name'
    });
};

PinTag.statics.addTagsToPin = async function(pinId: string, tags: Array<string>): Promise<any> {
    try {
        const tagIds = await Tag.bulkGetId(tags);
        await this.create(tagIds.map(tagId => ({ pin: pinId, tag: tagId })));
    } catch (e) {
        throw e;
    }
}

PinTag.statics.removeTagsFromPin = async function(pinId: string, tags: Array<string>): Promise<any> {
    if (tags.length === 0) return;
    
    try {
        const tagIds = await Tag.bulkGetId(tags);
        /*
        await this.deleteMany({
            $or: [ 
                { tag: tagIds }
            ],
            pin: pinId
        })
        */
    } catch (e) {
        throw e;
    }
}

const PinTagModel = model<IPinTag>('Pin_Tag', PinTag) as IPinTagModel;

export default PinTagModel;
