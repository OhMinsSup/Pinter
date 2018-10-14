import { Model, Document, Schema, model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
  _id: string;
  title: string;
  user: IUser;
  activation: boolean;
}

export interface IGroupModel extends Model<IGroup> {
  groupList(userId: string, active: boolean, cursor?: string): Promise<any>;
}

const Group = new Schema({
  title: {
    type: String,
    lowercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  activation: {
    type: Boolean,
    default: false,
  },
});

Group.statics.groupList = function(
  userId: string,
  active: boolean,
  cursor?: string
): Promise<any> {
  const query = Object.assign(
    {},
    cursor
      ? { _id: { $lt: cursor }, user: userId, activation: active }
      : { user: userId, activation: active }
  );

  return this.find(query)
    .populate('user')
    .sort({ _id: -1 })
    .limit(15)
    .lean();
};

const GroupModel = model<IGroup>('Group', Group) as IGroupModel;

export default GroupModel;
