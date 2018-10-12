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
            title,
            user: {
                displayName,
                thumbnail,
            },
        } = group;

        return (
            <GroupCard
                key={groupId}
                groupId={groupId}
                title={title}
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