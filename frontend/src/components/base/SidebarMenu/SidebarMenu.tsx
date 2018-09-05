import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles  = require('./SidebarMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    to?: string,
    icon?: React.ReactNode,
    name :string,
    onClick(): void,
}

const SidebarMenu: React.SFC<Props> = ({ to, name, onClick, icon }) => {
    return (
        <div className={cx('sidebar-menu')} onClick={onClick}>
        {
            to ? (
                <React.Fragment>
                    <Link to={to} className={cx('sidebar-menu-item')}>
                        <span>{icon}</span>
                        <span>{name}</span>
                    </Link>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className={cx('sidebar-menu-item')}>
                        <span>{icon}</span>
                        <span>{name}</span>
                    </div>
                </React.Fragment>
            )
        }
        </div>
    )
}

export default SidebarMenu;
