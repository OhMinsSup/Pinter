import { Schema, model, Document, Model } from 'mongoose';

export interface ITag extends Document {
    _id: string;
    name?: string;
}

export interface ITagModel extends Model<ITag> {
    findByTagName(name: string): Promise<any>;
    getTagId(name: string): Promise<any>;
    bulkGetId(names: Array<string>): Promise<any>;
}

const Tag = new Schema({
    name: {
        type: String,
        lowercase: true
    }
});

Tag.statics.findByTagName = function (name: string): Promise<any> {
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

Tag.statics.getTagId = async function(name: string): Promise<any> {
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
                name: name 
            });
        }

        return tag._id;
    } catch (e) {
        throw e;
    }
}

Tag.statics.bulkGetId = async function(names: Array<string>): Promise<any> {
    if (names.length === 0) return [];

    try {
        const tagData = await this.find({
            $or: [ 
                { name: names },
            ]
        });

        const missingTags = names.filter(name => tagData.findIndex(tag => tag.name === name) === -1);
        console.log(missingTags, 'gkgk');
        const newTagIds = missingTags.map(name => console.log(name));
        

        /*        
        const missingTags = names.filter(name => tagData.findIndex(tag => tag.name === name) === -1);
        const newTagIds = (await this.create(missingTags.map(name => ({ name })))).map(tag => tag._id);
        const tagIds = tagData.map(tag => tag._id);
        return tagIds.concat(newTagIds);
        */ 
    } catch (e) {
        throw e;
    }
}

const TagModel = model<ITag>('Tag', Tag) as ITagModel;

export default TagModel;