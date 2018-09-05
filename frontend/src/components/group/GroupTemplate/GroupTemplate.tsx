import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GroupTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
    box: React.ReactNode,
}

const GroupTemplate: React.SFC<Props> = ({ children, box }) => {
    return (
        <div className={cx('group-template')}>
            <div className={cx('box')}>{box}</div>
            <main>{children}</main>
        </div>
    )
}

export default GroupTemplate;