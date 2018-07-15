import { pick }  from 'lodash';

export const serializePin = (data: any) => {
    const {
        id,
        relation_url,
        description,
        url,
        created_at,
        updated_at,
        user
    } = data;
    const tags = data.tags.name(tag => tag.name);
    // TODO 카테고리
    return {
        id,
        relation_url,
        description,
        url,
        created_at,
        updated_at,
        user: {
            ...pick(user, ['id', 'username']),
            ...pick(user.user_profile, ['display_name', 'thumbnail']),
        }
    }
}
