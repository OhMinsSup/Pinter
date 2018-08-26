import * as React from 'react';
import * as classNames from 'classnames/bind';
import SidebarMenu from '../SidebarMenu';

const styles = require('./Sidebar.scss');
const cx = classNames.bind(styles);

type Props = {
    onClose(): void
}

const Sidebar: React.SFC<Props> = ({ onClose }) => {
    return (
        <React.Fragment>
            <div className={cx('dimmer')} onClick={onClose}/>
            <div className={cx('sidebar')}>
                <SidebarMenu
                    to="/"
                    name="내 블로그"
                />
                <SidebarMenu
                    to="/"
                    name="태그"
                />
                <SidebarMenu
                    to="/"
                    name="유저"
                />
                <SidebarMenu
                    to="/"
                    name="로그아웃"
                />
            </div>
        </React.Fragment>
    );
}

export default Sidebar;