import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./MainTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    children: React.ReactNode
}

const MainTemplate: React.SFC<Props> = ({ header, children }) => {
    return (
        <div className={cx('main-template')}>
            <header>{header}</header>
            <main>{children}</main>
        </div>
    );
}

export default MainTemplate;