import * as React from 'react';
import * as classNames from 'classnames/bind';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./PinCancelButton.scss');
const cx = classNames.bind(styles);

const PinCancelButton = () => {
    return (
        <div className={cx('cancel-wrapper')}>
            <CancelIcon />
        </div>
    )
}

export default PinCancelButton;