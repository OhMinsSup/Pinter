import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
}

const PinTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('pin-template')}>
            {children}
        </div>
    );
}

export default PinTemplate;