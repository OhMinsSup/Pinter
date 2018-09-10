import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./WriteTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
    header: React.ReactNode,
}

const WriteTemplate: React.SFC<Props> = ({ children, header }) => {
    return (
        <div className={cx('write-template')}>
            <header>{header}</header>
            <div className={cx('body')}>{children}</div>
        </div>
    )
}

export default WriteTemplate;