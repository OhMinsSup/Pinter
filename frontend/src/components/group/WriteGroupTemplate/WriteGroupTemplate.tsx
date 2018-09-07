import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./WriteGroupTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
}

const WriteGroupTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('write-group-template')}>
            <main>{children}</main>
        </div>
    )
}

export default WriteGroupTemplate;