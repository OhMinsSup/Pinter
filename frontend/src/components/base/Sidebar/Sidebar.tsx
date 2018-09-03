import * as React from 'react';
import * as classNames from 'classnames/bind';
import SidebarMenu from '../SidebarMenu';

const styles = require('./Sidebar.scss');
const cx = classNames.bind(styles);

type Props = {
    displayName: string | null,
    onClose(): void
}

const Sidebar: React.SFC<Props> = ({ onClose, displayName }) => {
    return (
        <React.Fragment>
            <div className={cx('dimmer')} onClick={onClose}/>
            <div className={cx('sidebar')}>
                <SidebarMenu
                    to={`/@${displayName}`}
                    name="내 블로그"
                    onClick={onClose}
                />
                <SidebarMenu
                    to="/tags"
                    name="태그"
                    onClick={onClose}
                />
                <SidebarMenu
                    to="/users"
                    name="유저"
                    onClick={onClose}
                />
                <SidebarMenu
                    name="로그아웃"
                    onClick={onClose}
                />
            </div>
        </React.Fragment>
    );
}

export default Sidebar;