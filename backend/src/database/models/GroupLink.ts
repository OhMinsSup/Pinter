import { Schema, Document, Model, model } from 'mongoose';
import { IGroup } from './Group';
import { IPin } from './Pin';

export interface IGroupLink extends Document {
  _id: string;
  group: IGroup;
  pin: IPin;
}

export interface IGroupLinkModel extends Model<IGroupLink> {
  groupPinList(groupId: string, cursor?: string): Promise<any>;
}

const GroupLink = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
  },
});

GroupLink.statics.groupPinList = function(
  groupId: string,
  cursor?: string
): Promise<any> {
  const query = Object.assign(
    {},
    cursor ? { _id: { $lt: cursor }, group: groupId } : { group: groupId }
  );

  return this.find(query)
    .populate({
      path: 'pin',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
      ],
    })
    .sort({ _id: -1 })
    .limit(20)
    .lean();
};

const GroupLinkModel = model<IGroupLink>(
  'GroupLink',
  GroupLink
) as IGroupLinkModel;

export default GroupLinkModel;
