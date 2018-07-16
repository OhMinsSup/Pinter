import { pick }  from 'lodash';

export const serializePin = (data: any) => {
    const {
        _id: pinId,
        relation_url,
        description,
        url,
        createdAt,
        updatedAt,
        user,
    } = data;    
    const tags = data.tags.map(tag => tag.tag.name);

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