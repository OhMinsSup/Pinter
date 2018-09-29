import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./GroupNavItem.scss');
const cx = classNames.bind(styles);

type Props = {
    text: string,
    to: string,
    active?: boolean,
}

const GroupNavItem: React.SFC<Props> = ({ active, to, text }) => {
    return (
        <li className={cx('nav-item', { active })}>
            <Link to={to}>
                <div className={cx('text')}>
                    {text}
                </div>
            </Link>
        </li>
    )
}

GroupNavItem.defaultProps = {
    to: '',
    active: false,
}

export default GroupNavItem;