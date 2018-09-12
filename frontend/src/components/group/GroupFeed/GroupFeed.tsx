import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';

const styles = require('./GroupFeed.scss');
const cx = classNames.bind(styles);


const FeedHeader = () => {
    return (
        <div className={cx('feed-header')}>
            <div className={cx('header')}>
                <div className={cx('group-image')}>
                    <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_180,h_180,c_thumb/v1534512408213/rJeQpSNIX.png" alt='imgae'/>
                </div>
                <div className={cx('group-details')}>
                    <h1>Python</h1>
                    <p>
                        Python is a widely used high-level programming language for general-purpose programming, created by Guido van Rossum and first released in 1991
                    </p>
                    <div className={cx('button-wrapper')}>
                        <Button theme="default">가입하기</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FeedNavItem: React.SFC<{
    text: string,
}> = ({ text }) => {
    return (
        <li className={cx('nav-item')}>
            <Link to="/" className={cx('nav-link')}>
                {text}
            </Link>
        </li>
    )
}

const GroupFeed = () => {
    return (
        <div className={cx('group-feed')}>
            <FeedHeader />
            <div className={cx('group-nav')}>
                <ul className={cx('feed-nav')}>
                    <FeedNavItem 
                        text="Week"
                    />
                    <FeedNavItem 
                        text="Month"
                    />
                    <FeedNavItem 
                        text="Year"
                    />
                    <FeedNavItem 
                        text="Recent"
                    />
                </ul>
            </div>
        </div>
    )
}

export default GroupFeed;