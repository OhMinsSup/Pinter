import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    creator?: IUser;
    cover?: string;
    title?: string;
    contents?: string;
    creatrAt?: string;
    updateAt?: string;
}

export interface IGroupModel extends Model<IGroup> {
    findByTitle(value: string): Promise<any>;
    readGroupList(cursor?: string): Promise<any>;
}

const Group = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    cover: String,
    title: {
        type: String,
        unique: true,
    },
    contents: String,
}, {
    timestamps: true
});

Group.statics.findByTitle = function(value: string): Promise<any> {
    return this.findOne({
        title: value,
    })
    .lean();
};

Group.statics.readGroupList = function(cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor ? { _id: { $lt: cursor } } : {}
    )

    return this.find(query)
    .populate('creator')
    .sort({ _id: -1 })
    .limit(10)
    .lean();
}

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;