import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupCommonLink from '../GroupCommonLink';

const styles = require('./GroupCommonNav.scss');
const cx = classNames.bind(styles);

type Props = {
    size: number,
}

const GroupCommonNav: React.SFC<Props> = ({ size }) => {
    if (size > 875) return null;
    return (
        <div className={cx('group-header-nav')}>
            <GroupCommonLink
                active={true}
                to="/group"
                text="그룹"
            />
            <GroupCommonLink
                active={false}
                to="/group/trending"
                text="인기 그룹"
            />
            <GroupCommonLink
                active={false}
                to="/group/test1"
                text="test1"
            />
            <GroupCommonLink
                active={false}
                to="/group/test2"
                text="test2"
            />
        </div>
    )
}

export default GroupCommonNav;