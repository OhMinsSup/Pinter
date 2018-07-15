import { Schema, model, Document, Model } from 'mongoose';
import { IPin } from './Pin';
import { IUser } from './User';

export interface ITag extends Document {
    _id: string;
    user?: IUser,
    pin?: IPin,
    name?: string;
}

export interface ITagModel extends Model<ITag> {
    findByTagName(name: string): Promise<any>;
    getTagId(name: string, userId: string, pinId: string): Promise<any>;
}

const Tag = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    name: {
        type: String,
        lowercase: true
    }
});

Tag.statics.findByTagName = async function (name: string): Promise<any> {
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

Tag.statics.getTagId = async function(name: string, userId: string, pinId: string): Promise<any> {
    try {
        let tag = await this.findOne({
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
                user: userId,
                pin: pinId,
                name: name 
            });
        }

        return tag._id;
    } catch (e) {
        throw e;
    }
}

const TagModel = model<ITag>('Tag', Tag) as ITagModel;

export default TagModel;