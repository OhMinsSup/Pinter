import * as React from 'react';
import * as classNames from 'classnames/bind';
import SidebarMenu from '../SidebarMenu';

const styles = require('./Sidebar.scss');
const HomeIcon = require('react-icons/lib/fa/home');
const UserIcon = require('react-icons/lib/fa/user');
const LogoutIcon = require('react-icons/lib/fa/sign-out');
const TagIcon = require('react-icons/lib/fa/tags');
const cx = classNames.bind(styles);

type Props = {
    displayName: string | null,
    size: number,
    onClose(): void
}

const Sidebar: React.SFC<Props> = ({ onClose, displayName, size }) => {
    return (
        <React.Fragment>
            {
                size > 790 ? null : (
                    <React.Fragment>
                        <div className={cx('dimmer')} onClick={onClose}/>
                        <div className={cx('sidebar')}>
                            <SidebarMenu
                                to={`/@${displayName}`}
                                name="내 블로그"
                                icon={<HomeIcon />}
                                onClick={onClose}
                            />
                            <SidebarMenu
                                to="/tags"
                                name="태그"
                                icon={<TagIcon/>}
                                onClick={onClose}
                            />
                            <SidebarMenu
                                to="/users"
                                name="유저"
                                icon={<UserIcon/>}
                                onClick={onClose}
                            />
                            <SidebarMenu
                                name="로그아웃"
                                onClick={onClose}
                                icon={<LogoutIcon/>}
                            />
                        </div>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}

export default Sidebar;