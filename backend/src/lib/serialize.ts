import { pick }  from 'lodash';

const serializePin = (data: any) => {
    const {
        _id: pinId,
        relation_url,
        description,
        url,
        createdAt,
        updatedAt,
        user,
    } = data;    
    const tags = data.tags.map(tag => tag.name);
    return {
        pinId,
        relation_url,
        description,
        url,
        createdAt,
        updatedAt,
        tags,
        user: {
            ...pick(user, ['_id', 'username']),
            ...pick(user.profile, ['displayName', 'thumbnail']),
        },
    }
}

const serializeLike = (data: any) => {
    const { 
        _id: likeId,
        user,
    } = data;
    return {
        likeId,
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
    const pinData = data.map(pin => {
        return {
            pinId: pin._id,
            relation_url: pin.relation_url,
            description: pin.description,
            url: pin.url,
            createdAt: pin.createdAt,
            likes: pin.likes,
            comments: pin.comments,
            user: {
                ...pick(pin.user, ['_id','username']),
                ...pick(pin.user.profile, ['displayName', 'thumbnail'])
            },
        }
    });
    return pinData;
}

const serializeBoard = (data: any) => {
    const {
        _id: boardId,
        user,
    } = data;

    const pin = data.pin.map(pin => {
        return {
            pinId: pin._id,
            relation_url: pin.relation_url,
            description: pin.description,
            url: pin.url,
            createdAt: pin.createdAt,
            likes: pin.likes,
            comments: pin.comments,
            user: {
                ...pick(pin.user, ['_id','username']),
                ...pick(pin.user.profile, ['displayName', 'thumbnail'])
            },
        }
    });
    
    return {
        boardId,
        user: {
            ...pick(user, ['_id','username']),
            ...pick(user.profile, ['displayName', 'thumbnail'])
        },
        pin
    }
}

export {
    serializeLike,
    serializePin,
    serializeComment,
    serializeTag,
    serializeTagPin,
    serializeBoard
}