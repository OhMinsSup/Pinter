import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinAction from '../PinAction';
import PinInfo from '../PinInfo';
import PinComment from '../PinComment';
import { FaChevronDown } from 'react-icons/lib/fa';

const styles = require('./PinFeed.scss');
const cx = classNames.bind(styles);

const PinFeed = () => {
    return (
        <div className={cx('pin-feed')}>
            <header className={cx('pin-header')}>
                <img className={cx('thumbnail')} src="https://scontent-icn1-1.cdninstagram.com/vp/a384fe9be6b1d6009273aea1b12e74b6/5C0A73A9/t51.2885-19/s150x150/36148209_280384249190671_9090634509203800064_n.jpg" alt="username"/>
                <div className={cx('info')}>
                    <span className={cx('displayName')}>veloss</span>
                    <span className={cx('username')}>오민섭</span>
                </div>
                <div className={cx('sub')}>
                    <FaChevronDown />
                </div>
            </header>
            <div className={cx('pin-image')}>
                <div className={cx('wrapper')}>
                    <img className={cx('image')} src="https://scontent-icn1-1.cdninstagram.com/vp/497c0ec7c7865bb46a88472de9c899ff/5BDA9C38/t51.2885-15/e35/35616535_215789532393765_5988592786234933248_n.jpg" alt="username" />
                </div>
            </div>
            <div className={cx('pin-meta')}>
                <PinAction />
                <PinInfo />
                <PinComment />
            </div>
        </div>
    )
}

export default PinFeed;