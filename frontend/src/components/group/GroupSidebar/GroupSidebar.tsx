import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import GroupNavItem from '../GroupNavItem';

const LogoIcon = require('react-icons/lib/fa/pinterest');
const styles = require('./GroupSidebar.scss');
const cx = classNames.bind(styles);

type Props = {
    url: string
}

const GroupSidebar: React.SFC<Props> = ({ url }) => {
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-top')}>
                <div className={cx('logo-section')}>
                    <Link to="/" className={cx('logo')}>
                        <LogoIcon />
                        <span>Pinter</span>
                    </Link>
                </div>
                <div className={cx('primary')}>
                    <ul className={cx('list')}>
                        <GroupNavItem
                            text="Test"
                            active={url === `/group/test`}
                            to={`/group/test`}
                        />
                        <GroupNavItem
                            text="Test1"
                            active={url === `/group/test1`}
                            to={`/group/test1`}
                        />
                        <GroupNavItem
                            text="Test2"
                            active={url === `/group/test2`}
                            to={`/group/test2`}
                        />
                        <GroupNavItem
                            text="Test3"
                            active={url === `/group/test3`}
                            to={`/group/test3`}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GroupSidebar;