import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupCard from '../GroupCard/GroupCard';

const styles = require('./GroupCardList.scss');
const cx = classNames.bind(styles);

const GroupCardList = () => {
    return (
        <div className={cx('group-card-list')}>
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
        </div>
    )
}

export default GroupCardList;