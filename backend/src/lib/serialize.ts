import { pick } from "lodash";

const serializePin = (data: any) => {
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
    const tags = data.tags.map(tag => tag.name);
    const url = urls.map(url => url);
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

const serializeUser = (data: any) => {
    const {
        user,
    } = data; 
    return {
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
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

const serializeTag = (data: any) => {
    const {
        _id: tagId,
        name,
        pin,
    } = data;
    return {
        tagId,
        name,
        count: pin.length,
    };
};

const serializeTagPin = (data: any) => {
    const {
        _id: pinId,
        likes,
        comments,
        relationUrl,
        body,
        user,
        createdAt,
    } = data;
    const tags = data.tags.map(tag => tag.name);
    const urls = data.urls.map(url => url);
    return {
        pinId,
        body,
        relationUrl,
        createdAt,
        tags,
        urls,
        likes,
        comments,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeLocker = (data: any) => {
    const {
        _id: lockerId,
        pin: {
            tags,
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
        tags: tags.map(tag => tag.name),
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

const serializeFollower = (data: any) => {
    const {
        _id: followId,
        follower,
    } = data;
    return {
        follower: {
            ...pick(follower, ['_id', 'username']),
            ...pick(follower.profile, ['displayName', 'thumbnail']),
        },
    };
};

const serializeFollowing = (data: any) => {
    const {
        _id: followId,
        following,
    } = data;
    return {
        following: {
            ...pick(following, ['_id', 'username']),
            ...pick(following.profile, ['displayName', 'thumbnail']),
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

export {
    serializeUser,
    serializePin,
    serializeComment,
    serializeTag,
    serializeTagPin,
    serializeLocker,
    serializeFollower,
    serializeFollowing,
    serializeUsers,
};