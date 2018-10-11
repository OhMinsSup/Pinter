import { Schema, Document, Model, model } from 'mongoose';
import { IGroup } from './Group';
import { IPin } from './Pin';

export interface IGroupLink extends Document {
    _id: string;
    group: IGroup;
    pin: IPin;
}

export interface IGroupLinkModel extends Model<IGroupLink> {
    Link(groupId: string, pinIds: string[]): Promise<any>;
}

const GroupLink = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }
});

GroupLink.statics.Link = function(groupId: string, pinIds: string[]): Promise<any> {
    const promises = pinIds.map(pinId => this.create({
        group: groupId,
        pin: pinId
    }));

    return Promise.all(promises);
}

const GroupLinkModel = model<IGroupLink>('GroupLink', GroupLink) as IGroupLinkModel;

export default GroupLinkModel;