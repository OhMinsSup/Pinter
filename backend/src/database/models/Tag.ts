import { Schema, model, Document, Model } from 'mongoose';
import Pin, { IPin } from './Pin';

export interface ITag extends Document {
    _id: string;
    pin?: Array<IPin>;
    name?: string;
}

export interface ITagModel extends Model<ITag> {
    getTagId(name: string, pinId: string): Promise<any>;
    getTagNames(pinId: string): Promise<any>;
    removeTagsFromPin(pinId: string, tags: Array<string>): Promise<any>;
    addTagsToPin(pinId: string, tags: Array<string>): Promise<any>;
    bulkGetNewId(names: Array<string>, pinId: string): Promise<any>;
    bulkGetMissingId(names: Array<string>, pinId: string): Promise<any>;
    findByTagName(name: string): Promise<any>;
}

const Tag = new Schema({
    pin: [{
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }],
    name: {
        type: String,
        lowercase: true
    }
});

Tag.statics.findByTagName = function(name: string): Promise<any> {
    return this.findOne({
        $and: [
            {   
                $or: [ 
                    { name: name.toLowerCase() },
                    { name: name }
                ]
            },
            { 
                $or: [
                    { name:  (name.replace('/s$', null) || name.replace('/-/', null)) && name.toLowerCase() },
                    { name:  (name.replace('/s$', null) || name.replace('/-/', null)) && name },
                ]
            }  
        ]
    });
}

Tag.statics.getTagId = async function(name: string, pinId: string): Promise<any> {
    try {
        let tag: ITag = await this.findOne({
            $and: [
                {   
                    $or: [ 
                        { name: name.toLowerCase() },
                        { name: name }
                    ]
                },
                { 
                    $or: [
                        { name:  (name.replace('/s$', null) || name.replace('/-/', null)) && name.toLowerCase() },
                        { name:  (name.replace('/s$', null) || name.replace('/-/', null)) && name },
                    ]
                }  
            ]
        });
        
        if (!tag) {
            tag = await this.create({
                name: name,
                pin: pinId
            });
                        
            return tag._id;
        }
        
        tag = await this.findByIdAndUpdate(tag._id, {
            $push: { 
                pin: pinId
            }
        }, { new: true });
        
        return tag._id;
    } catch (e) {
        throw e;
    }
};

Tag.statics.getTagNames = function(pinId: string): Promise<any> {
    return this.find({
        pin: pinId,
    });
};


Tag.statics.bulkGetNewId = async function(names: Array<string>, pinId: string): Promise<any> {
    if (names.length === 0) return;

    try {
        const tagData: Array<ITag> = await this.find({
            $and: [
                {
                    name: names,
                    pin: pinId
                }
            ]
        })

        const missingTags = names.filter(name => tagData.findIndex(tag => tag.name === name) === -1)
        const newTagIds: Array<string> = (await this.create(missingTags.map(name => ({ name })))).map((tag: ITag) => tag._id);
        const tagIds = tagData.map(tag => tag._id);
        return  tagIds.concat(...newTagIds);
    } catch (e) {
        throw e;
    }
}

Tag.statics.bulkGetMissingId = async function(names: Array<string>, pinId: string): Promise<any> {
    if (names.length === 0) return;

    try {
        const tagData: Array<ITag> = await this.find({
            $and: [
                {
                    name: names,
                    pin: pinId
                }
            ]
        });

        const tagIds = tagData.map(tag => tag._id);
        return tagIds;
    } catch (e) {
        throw e;
    }
}

Tag.statics.addTagsToPin = async function(pinId: string, tags: Array<string>): Promise<any> {
    if (tags.length === 0) return;
    
    try {
        const tagIds: Array<string> = await this.bulkGetNewId(tags, pinId);        
        await Promise.all(tagIds.map(tagId => this.findByIdAndUpdate(tagId, {
            $push: { pin: pinId }
        }, { new: true })));

        await Promise.all(tagIds.map(tagId => Pin.findByIdAndUpdate(pinId, {
            $push: { tags: tagId }
        }, { new: true })));
    } catch (e) {
        throw e;
    }
}

Tag.statics.removeTagsFromPin = async function(pinId: string, tags: Array<string>): Promise<any> {
    if (tags.length === 0) return;
    
    try {
        const tagIds: Array<string> = await this.bulkGetMissingId(tags, pinId);
        
        await Promise.all(tagIds.map(tagId => this.findByIdAndUpdate(tagId, {
            $pop: { pin: pinId } 
        }, { new: true })));
        
        
        await Promise.all(tagIds.map(tagId => Pin.findByIdAndUpdate(pinId, {
            $pop: { tags: tagId }
        }, { new: true })));
    } catch (e) {
        throw e;
    }
}

const TagModel = model<ITag>('Tag', Tag) as ITagModel;

export default TagModel;
