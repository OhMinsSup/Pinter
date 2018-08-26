import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinContent.scss');
const cx = classNames.bind(styles);

const PinContent = () => {
    return (
        <div className={cx('pin-content')}>
            content
        </div>
    )
}

export default PinContent;