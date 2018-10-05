import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./UserNavItem.scss');
const cx = classNames.bind(styles);

type Props = {
    text: string,
    to: string,
    active?: boolean,
};

const UserNavItem: React.SFC<Props> = ({ text, to, active }) => {
    return (
        <div className={cx('nav-item', { active })}>
            <Link to={to}>
                <div className={cx('text')}>{text}</div>
            </Link>
        </div>
    );
}

UserNavItem.defaultProps = {
    to: '',
    active: false,
};


export default UserNavItem;