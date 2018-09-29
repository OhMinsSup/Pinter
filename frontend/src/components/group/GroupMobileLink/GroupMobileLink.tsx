import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./GroupMobileLink.scss');
const cx = classNames.bind(styles);

type Props = {
    to: string,
    text: string,
    active?: boolean,
}

const GroupMobileLink: React.SFC<Props> = ({ to, text, active }) => {
    return (
        <li className={cx('mobile-nav-item', { active })}>
            <Link to={to}>
                <div className={cx('text')}>
                    {text}
                </div>
            </Link>
        </li>
    )
}

GroupMobileLink.defaultProps = {
    to: '',
    active: false,
}

export default GroupMobileLink;