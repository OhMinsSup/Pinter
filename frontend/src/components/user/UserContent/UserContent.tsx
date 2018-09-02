import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UserContent.scss');
const cx = classNames.bind(styles);

type Props = {
    children?: React.ReactNode,
    side?: React.ReactNode,
}

const UserContent:React.SFC<Props> = ({ children, side }) => {
    return (
        <div className={cx('user-content')}>
            <div className={cx('tab-wrapper')}>{children}</div>
            <div className={cx('side-wrapper')}>{side}</div>
        </div>
    )
}

export default UserContent;