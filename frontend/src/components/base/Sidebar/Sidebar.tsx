import * as React from 'react';
import * as classNames from 'classnames/bind';
import SidebarMenu from '../SidebarMenu';

const styles = require('./Sidebar.scss');
const GroupIcon = require('react-icons/lib/md/people');
const SearchIcon = require('react-icons/lib/fa/search');
const HomeIcon = require('react-icons/lib/fa/home');
const UserIcon = require('react-icons/lib/fa/user');
const LogoutIcon = require('react-icons/lib/fa/sign-out');
const TagIcon = require('react-icons/lib/fa/tags');
const cx = classNames.bind(styles);

type Props = {
    displayName: string | null,
    size: number,
    onClose(): void,
    onLogout(): Promise<void>,
}

const Sidebar: React.SFC<Props> = ({ onClose, displayName, size, onLogout }) => {
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
                                name="그룹"
                                to="/group"
                                icon={<GroupIcon/>}
                                onClick={onClose}
                            />
                            <SidebarMenu
                                to="/search"
                                name="검색"
                                onClick={onClose}
                                icon={<SearchIcon/>}
                            />
                            <SidebarMenu
                                name="로그아웃"
                                onClick={onLogout}
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