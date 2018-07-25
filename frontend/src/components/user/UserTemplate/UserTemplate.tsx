import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UserTemplate.scss')
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    children: React.ReactNode
}

const UserTemplate: React.SFC<Props> = ({ header, children }) => {
    return (
        <div className={cx('user-template')}>
            <div className={cx('header-area')}>{header}</div>
            <main>{children}</main>
        </div>
    );
}

export default UserTemplate;