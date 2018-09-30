import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./GroupCommonLink.scss');
const cx = classNames.bind(styles);

type Props = {
    to: string,
    text: string,
    active?: boolean,
}

const GroupCommonLink: React.SFC<Props> = ({ to, text, active }) => {
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

GroupCommonLink.defaultProps = {
    to: '',
    active: false,
}

export default GroupCommonLink;