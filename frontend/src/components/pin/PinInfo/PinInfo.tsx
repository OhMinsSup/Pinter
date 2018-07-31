import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const styles = require('./PinInfo.scss');
const cx = classNames.bind(styles);

const PinInfo = () => {
    return (
        <div className={cx('pin-info')}>
            <Button theme="default">www.velopert.com</Button>
            <p className={cx('description')}>설명설명설명</p>
            <span className={cx('date')}>Jue 08 16</span>
        </div>
    );
}

export default PinInfo;