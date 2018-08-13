import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const styles = require('./FollowCard.scss');
const cx = classNames.bind(styles);

const FollowCard = () => {
    return (
        <div className={cx('follow-card')}>
            <div className={cx('content')}>
                <div className={cx('head')}>
                    <Link className={cx('thumbnail-wrapper')} to='/'>
                        <img className={cx('thumbnail')} src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/hnad7r5atupz4fwxt1ld/1482944365.jpg" alt="username"/>
                    </Link>
                    <div className={cx('name-wrapper')}>
                        <Link className={cx('displayName')} to="/">veloss</Link>
                        <Link className={cx('username')} to="/">오민섭</Link>
                    </div>
                </div>
            </div>
            <div className={cx('button')}>
                <Button theme="flex">
                    프로필
                </Button>
            </div>
        </div>
    )
}

export default FollowCard;
