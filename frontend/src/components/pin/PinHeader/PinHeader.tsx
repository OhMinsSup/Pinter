import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const Dropdown = require('react-icons/lib/fa/angle-down');
const styles = require('./PinHeader.scss');
const cx = classNames.bind(styles);

const PinHeader = () => {
    return (
        <div className={cx('pin-header')}>
            <div className={cx('premalink-header')}>
                <Link className={cx('user-group')} to="/">
                    <img className={cx('profile-thumbnail')} src="https://pbs.twimg.com/profile_images/1012762345238454272/Q9jiI1pL_bigger.jpg" alt="Docker" />
                    <span className={cx('displayName-group')}>
                        <strong className={cx('displayNmae')}>Docker</strong>
                        <span>&rlm;</span>
                    </span>
                    <span className={cx('username')}>@<b>Docker</b></span>
                </Link>
                <div className={cx('follow-bar')}>
                    <Button theme="default">팔로우</Button>
                </div>
                <div className={cx('action-menu')}>
                    <div className={cx('dropdown')}>
                        <button className={cx('action-button')}>
                            <Dropdown />
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('line')} />
        </div>
    )
}

export default PinHeader;