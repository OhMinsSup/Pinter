import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UserContent.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const UserContent: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('user-content')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default UserContent;