import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const styles = require('./FollowCard.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string;
    username: string;
    displayName: string;
    thumbnail: string;
}

const FollowCard: React.SFC<Props> = ({ id, username, displayName, thumbnail }) => {
    return (
        <div className={cx('follow-card')}>
            <div className={cx('content')}>
                <div className={cx('head')}>
                    <Link className={cx('thumbnail-wrapper')} to={`/@${displayName}`}>
                        <img className={cx('thumbnail')} src={thumbnail} alt={username}/>
                    </Link>
                    <div className={cx('name-wrapper')}>
                        <Link className={cx('displayName')} to={`/@${displayName}`}>{displayName}</Link>
                        <Link className={cx('username')} to={`/@${displayName}`}>{username}</Link>
                    </div>
                </div>
            </div>
            <div className={cx('button')}>
                <Button theme="flex" to={`/@${displayName}`}>
                    프로필
                </Button>
            </div>
        </div>
    )
}

export default FollowCard;
