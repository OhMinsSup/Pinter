import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const SettingTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('setting-template')}>
            {children}
        </div>
    );
}

export default SettingTemplate;