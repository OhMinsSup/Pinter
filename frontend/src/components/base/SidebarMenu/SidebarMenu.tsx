import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles  = require('./SidebarMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    to: string,
    name :string
}

const SidebarMenu: React.SFC<Props> = ({ to, name }) => {
    return (
        <div className={cx('sidebar-menu')}>
            <Link  to={to} className={cx('sidebar-menu-item')}>{name}</Link>
        </div>
    )
}

export default SidebarMenu;
