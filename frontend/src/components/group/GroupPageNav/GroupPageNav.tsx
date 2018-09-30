import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupCommonLink from '../GroupCommonLink';

const styles = require('./GroupPageNav.scss');
const cx = classNames.bind(styles);

const GroupPageNav = () => {
    return (
        <div className={cx('group-header-nav')}>
            <GroupCommonLink
                active={true}
                to="/group/@test/recent"
                text="최신 핀"
            />
            <GroupCommonLink
                active={false}
                to="/group/@test/trending"
                text="인기 핀"
            />
            <GroupCommonLink
                active={false}
                to="/group/@test/users"
                text="유저"
            />
        </div>
    )
}

export default GroupPageNav;