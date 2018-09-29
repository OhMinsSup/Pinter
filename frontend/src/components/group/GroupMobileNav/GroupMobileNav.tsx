import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupMobileLink from '../GroupMobileLink';

const styles = require('./GroupMobileNav.scss');
const cx = classNames.bind(styles);

type Props = {
    size: number,
}

const GroupMobileNav: React.SFC<Props> = ({ size }) => {
    if (size > 875) return null;
    return (
        <div className={cx('group-header-nav')}>
            <GroupMobileLink
                active={true}
                to="/group"
                text="그룹"
            />
            <GroupMobileLink
                active={false}
                to="/group/trending"
                text="인기 그룹"
            />
            <GroupMobileLink
                active={false}
                to="/group/test1"
                text="test1"
            />
            <GroupMobileLink
                active={false}
                to="/group/test2"
                text="test2"
            />
        </div>
    )
}

export default GroupMobileNav;