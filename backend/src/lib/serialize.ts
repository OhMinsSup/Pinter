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

}

export {
    serializeLike,
    serializePin,
    serializeComment
}