import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FollowTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children?: React.ReactNode
}

const FollowTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('follow-template')}>
            {children}
        </div>
    );
}

export default FollowTemplate;