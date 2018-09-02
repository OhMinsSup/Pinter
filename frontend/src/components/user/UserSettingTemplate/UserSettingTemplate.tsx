import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UserSettingTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const UserSettingTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('user-setting-template')}>
            {children}
        </div>
    );
}

export default UserSettingTemplate;