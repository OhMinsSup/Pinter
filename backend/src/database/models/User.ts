import { Schema, model, Document, Model } from 'mongoose';
import { generateToken } from '../../lib/token';

export interface IUser extends Document {
  _id: string;
  username: string;
  email?: string;
  profile?: {
    displayName?: string;
    thumbnail?: string;
  };
  social?: {
    facebook?: {
      id?: string;
      accessToken?: string;
    };
    google?: {
      id?: string;
      accessToken?: string;
    };
  };
  count: {
    following: number;
    follower: number;
    pin: number;
  };
  generate(profile: IUser): Promise<any>;
}

export interface IUserModel extends Model<IUser> {
  findByEmailOrUsername(
    type: 'email' | 'username',
    value: string
  ): Promise<any>;
  findBySocial(provider: string, socialId: string | number): Promise<any>;
  findByDisplayName(value: string): Promise<any>;
  usersList(cursor?: string): Promise<any>;
  generate(profile: IUser): Promise<any>;
  followerCount(userId: string): Promise<any>;
  unfollowerCount(userId: string): Promise<any>;
  followingCount(userId: string): Promise<any>;
  unfollowingCount(userId: string): Promise<any>;
  pinCount(userId: string): Promise<any>;
  unpinCount(userId: string): Promise<any>;
}

const User = new Schema({
  username: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  profile: {
    displayName: {
      type: String,
      index: true,
    },
    thumbnail: {
      type: String,
      default: 'https://avatars.io/platform/userId',
    },
  },
  social: {
    facebook: {
      id: String,
      accessToken: String,
    },
    google: {
      id: String,
      accessToken: String,
    },
  },
  count: {
    following: {
      type: Number,
      default: 0,
    },
    follower: {
      type: Number,
      default: 0,
    },
    pin: {
      type: Number,
      default: 0,
    },
  },
});

User.statics.findByEmailOrUsername = function(
  type: 'email' | 'username',
  value: string
): Promise<any> {
  return this.findOne({
    [type]: value,
  }).lean();
};

User.statics.findByDisplayName = function(value: string): Promise<any> {
  return this.findOne({
    'profile.displayName': value,
  }).lean();
};

User.statics.findBySocial = function(
  provider: string,
  socialId: string | number
): Promise<any> {
  const key = `social.${provider}.id`;

  return this.findOne({
    [key]: socialId,
  }).lean();
};

User.statics.usersList = function(cursor?: string): Promise<any> {
  const query = Object.assign({}, cursor ? { _id: { $lt: cursor } } : {});

  return this.find(query)
    .sort({ _id: -1 })
    .limit(15)
    .lean();
};

User.statics.generate = function(profile: IUser): Promise<any> {
  if (!profile) {
    throw new Error('user profile not found');
  }

  const {
    profile: { displayName, thumbnail },
    _id,
    username,
  } = profile;
  const auth = {
    _id,
    username,
    displayName,
    thumbnail,
  };
  return generateToken(auth);
};

User.statics.followerCount = function(userId: string): Promise<any> {
  return this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        count: {
          follower: 1,
        },
      },
    },
    {
      new: true,
      select: 'count.follower',
    }
  ).lean();
};

User.statics.unfollowerCount = function(userId: string): Promise<any> {
  return this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        count: {
          follower: -1,
        },
      },
    },
    {
      new: true,
      select: 'count.follower',
    }
  ).lean();
};

User.statics.followingCount = function(userId: string): Promise<any> {
  return this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        count: {
          following: 1,
        },
      },
    },
    {
      new: true,
      select: 'count.following',
    }
  ).lean();
};

User.statics.unfollowingCount = function(userId: string): Promise<any> {
  return this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        count: {
          following: -1,
        },
      },
    },
    {
      new: true,
      select: 'count.following',
    }
  ).lean();
};

(User.statics.pinCount = function(userId: string): Promise<any> {
  return this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        count: {
          pin: 1,
        },
      },
    },
    {
      new: true,
      select: 'count.pin',
    }
  ).lean();
}),
  (User.statics.unpinCount = function(userId: string): Promise<any> {
    return this.findByIdAndUpdate(
      userId,
      {
        $inc: {
          count: {
            pin: -1,
          },
        },
      },
      {
        new: true,
        select: 'count.pin',
      }
    ).lean();
  });

const UserModel = model<IUser>('User', User) as IUserModel;

export default UserModel;
