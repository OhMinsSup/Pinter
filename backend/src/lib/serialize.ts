import { pick }  from 'lodash';

const serializePin = (data: any) => {
    const {
        _id: pinId,
        relation_url,
        description,
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
        relation_url,
        description,
        urls: url,
        createdAt,
        likes,
        comments,
        tags,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    }
}


const serializeUser = (data: any) => {
    const {
        user
    } = data; 
    return {
        user: {
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeComment = (data: any) => {
    const {
        _id: commentId,
        user,
        text,
        createdAt
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
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeTag = (data: any) => {
    const {
        _id: tagId,
        name,
        pin
    } = data;
    return {
        tagId,
        name,
        count: pin.length
    };
}

const serializeTagPin = (data: any) => {
    const {
        _id: pinId,
        likes,
        comments,
        relation_url,
        description,
        user,
        createdAt,
    } = data;
    const tags = data.tags.map(tag => tag.name);
    const urls = data.urls.map(url => url);
    return {
        pinId,
        description,
        relation_url,
        createdAt,
        tags,
        urls,
        likes,
        comments,
        user: {
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeLocker = (data: any) => {
    const {
        _id: lockerId,
        pin: {
            tags,
            urls,
            likes,
            comments,
            _id: pinId,
            relation_url,
            description,
            createdAt,
            user
        }
    } = data;
    return {
        lockerId,
        likes,
        tags: tags.map(tag => tag.name),
        urls: urls.map(url => url),
        comments,
        pinId,
        relation_url,
        description,
        createdAt,
        user: {
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeFollower = (data: any) => {
    const {
        _id: followId,
        follower
    } = data;
    return {
        followId,
        follower: {
            ...pick(follower, ['_id','username']),
            ...pick(follower.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeFollowing = (data: any) => {
    const {
        _id: followId,
        following
    } = data;
    return {
        followId,
        following: {
            ...pick(following, ['_id','username']),
            ...pick(following.profile, ['displayName', 'thumbnail'])
        }
    }
}

const serializeBoard = (data: any) => {
    const {
        _id: boardId,
        theme
    } = data;
    const user = data.user.map(user => {
        const { profile: { displayName, thumbnail }, id: userId, username } = user;
        return {
            displayName,
            thumbnail,
            userId,
            username
        }
    });
    const pin = data.pin.map(pin => pin);
    return {
        boardId,
        theme,
        pin,
        user
    }
}

const serializeUsers = (data: any) => {
    const user = data;
    return {
        user: {
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        }
    }
}

export {
    serializeUser,
    serializePin,
    serializeComment,
    serializeTag,
    serializeTagPin,
    serializeLocker,
    serializeFollower,
    serializeFollowing,
    serializeBoard,
    serializeUsers
}