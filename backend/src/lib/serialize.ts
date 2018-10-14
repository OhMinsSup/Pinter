import { pick } from "lodash";

const serializePin = (pinData: any, tagData: any) => {
    const {
        _id: pinId,
        relationUrl,
        body,
        createdAt,
        urls,
        comments,
        likes,
        user,
    } = pinData;
    const url = urls.map(url => url);
    const tags = tagData.map(tag => tag.tagId.name);
    
    return {
        pinId,
        relationUrl,
        body,
        urls: url,
        createdAt,
        likes,
        comments,
        tags,
        user: {
            ...pick(user, ["_id", "username"]),
            ...pick(user.profile, ["displayName", "thumbnail"]),
        },
    };
};

const serializePinList = (data: any) => {
    const {
        _id: pinId,
        relationUrl,
        body,
        createdAt,
        urls,
        comments,
        likes,
        user,
    } = data;    
    const url = urls.map(url => url);
    return {
        pinId,
        relationUrl,
        body,
        urls: url,
        createdAt,
        likes,
        comments,
        user: {
            ...pick(user, ["_id", "username"]),
            ...pick(user.profile, ["displayName", "thumbnail"]),
        },
    };
};

const serializeComment = (data: any) => {
    const {
        _id: commentId,
        user,
        text,
        createdAt,
    } = data;

    const tagId = data.has_tags.map(tag => tag._id);
    const tagName = data.has_tags.map(tag => tag.profile.displayName);

    return {
        commentId,
        text,
        createdAt,
        tagId,
        tagName,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeFollower = (data: any) => {
    const {
        follower,
    } = data;
    return {
        ...pick(follower, ['_id', 'username']),
        ...pick(follower.profile, ['displayName', 'thumbnail']),
    };
};

const serializeFollowing = (data: any) => {
    const {
        following,
    } = data;
    return {
        ...pick(following, ['_id', 'username']),
        ...pick(following.profile, ['displayName', 'thumbnail']),
    };
};

const serializeLocker = (data: any) => {
    const {
        _id: lockerId,
        pin: {
            urls,
            likes,
            comments,
            _id: pinId,
            relationUrl,
            body,
            createdAt,
            user,
        },
    } = data;
    return {
        lockerId,
        likes,
        urls: urls.map(url => url),
        comments,
        pinId,
        relationUrl,
        body,
        createdAt,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeTag = (data: any) => {
    const {
        count,
        tag_docs: {
            _id: tagId,
            name
        },
    } = data;
    return {
        tagId,
        name,
        count
    };
};

const serializeTagPin = (data: any) => {
    const {
        pinId: {
            _id: pinId,
            likes,
            comments,
            relationUrl,
            body,
            user,
            urls,
            createdAt,   
        }
    } = data;
    return {
        pinId,
        body,
        relationUrl,
        createdAt,
        urls: urls.map(url => url),
        likes,
        comments,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeUsers = (data: any) => {
    const user = data;
    return {
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeNoticeRoom = (data: any) => {
    const { 
        _id: noticeId,
        creator,
        createdAt
    } = data;

    return {
        noticeId,
        creator: {
            ...pick(creator, ['_id', 'username']),
            ...pick(creator.profile, ['displayName', 'thumbnail']),
        },
        createdAt,
    }
}

const serializeNoticeMessage = (data: any) => {
    const {
        sender,
        recipient,
        notice: noticeId,
        message,
        createdAt,
    } = data;

    return {
        noticeId,
        sender: {
            ...pick(sender, ['_id', 'username']),
            ...pick(sender.profile, ['displayName', 'thumbnail']),
        },
        recipient: {
            ...pick(recipient, ['_id', 'username']),
            ...pick(recipient.profile, ['displayName', 'thumbnail']),
        },
        message,
        createdAt
    }
}

const serializeGroups = (data: any) => {
    const {
        _id: groupId,
        title,
        user,
        activation,
    } = data;

    return {
        groupId,
        title,
        activation,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    }
}

const serializeGroupPin = (data: any) => {
    const {
        pin: {
            pinId,
            body,
            relationUrl,
            createdAt,
            urls,
            likes,
            comments,
        }
    } = data;

    return {
        pinId,
        body,
        relationUrl,
        createdAt,
        urls: urls.map(url => url),
        likes,
        comments
    }
}

export {
    serializePin,
    serializePinList,
    serializeComment,
    serializeFollower,
    serializeFollowing,
    serializeLocker,
    serializeTag,
    serializeTagPin,
    serializeUsers,
    serializeNoticeRoom,
    serializeNoticeMessage,
    serializeGroups,
    serializeGroupPin
};