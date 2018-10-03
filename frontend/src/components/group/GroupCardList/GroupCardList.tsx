import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupCard from '../GroupCard/GroupCard';

const styles = require('./GroupCardList.scss');
const cx = classNames.bind(styles);

type Props = {
    groups: any[],
}

const GroupCardList: React.SFC<Props> = ({ groups }) => {
    const groupList = groups.map(group => {
        const {
            groupId, 
            cover,
            title,
            contents,
            creator: {
                displayName,
                thumbnail,
            }
        } = group;

        return (
            <GroupCard 
                key={groupId}
                id={groupId}
                cover={cover}
                title={title}
                contents={contents}
                displayName={displayName}
                thumbnail={thumbnail}
            />
        )
    })
    return (
        <div className={cx('group-card-list')}>
            {groupList}
        </div>
    )
}

export default GroupCardList;