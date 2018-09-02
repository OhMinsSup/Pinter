import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles  = require('./SidebarMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    to: string,
    name :string,
    onClick(): void,
}

const SidebarMenu: React.SFC<Props> = ({ to, name, onClick }) => {
    return (
        <div className={cx('sidebar-menu')} onClick={onClick}>
            <Link  to={to} className={cx('sidebar-menu-item')}>{name}</Link>
        </div>
    )
}

export default SidebarMenu;
