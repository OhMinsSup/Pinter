import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const styles = require('./PinHeader.scss');
const cx = classNames.bind(styles);

const PinHeader = () => {
    return (
        <div className={cx('pin-header')}>
            <Link to="/" className={cx('user-group-profile')}>
                <img src="https://pbs.twimg.com/profile_images/835393591652470784/uPIoXEvf_bigger.jpg" alt="displayname" />
                <span className={cx('full-name-group')}>
                    <strong className={cx('displayName')}>Veloss</strong>
                    <span>&rlm;</span>
                    <span className={cx('username-bades')} />
                    <span className={cx('username-break')} />
                </span>
                <span className={cx('username')}>
                    @<b>veloss</b>
                </span>
                <Button className={cx('profile-button')} to="/" theme="default">
                    프로필
                </Button>
                
            </Link>
        </div>
    )
}

export default PinHeader;