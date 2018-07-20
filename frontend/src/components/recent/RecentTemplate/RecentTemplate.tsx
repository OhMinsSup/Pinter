import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./RecentTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const MainTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('recent-template')}>
            <div className={cx('grid-centered')}>{children}</div>
        </div>
    );
}

export default MainTemplate;