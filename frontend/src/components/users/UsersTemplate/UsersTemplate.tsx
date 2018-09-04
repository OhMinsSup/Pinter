import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UsersTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const UsersTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('users-template')}>
            <div className={cx('wrapper')}>
                {children}
            </div>
        </div>
    )
}

export default UsersTemplate;