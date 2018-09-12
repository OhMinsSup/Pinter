import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GroupTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const GroupTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('group-template')}>
            {children}
        </div>
    )
}

export default GroupTemplate;