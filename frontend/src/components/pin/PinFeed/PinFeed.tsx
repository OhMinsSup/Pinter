import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinAction from '../PinAction';
import PinInfo from '../PinInfo';
import PinComment from '../PinComment';
import { FaChevronDown } from 'react-icons/lib/fa';

const styles = require('./PinFeed.scss');
const cx = classNames.bind(styles);

type Props = {
    pin: any,
    onToggleLike(): void,
    onClick(): void,
}

const PinFeed: React.SFC<Props> = ({ pin, onToggleLike, onClick }) => {
    return (
        <div className={cx('pin-feed')}>
            <header className={cx('pin-header')}>
                <img className={cx('thumbnail')} src={pin.user.thumbnail} alt={pin.user.username}/>
                <div className={cx('info')}>
                    <span className={cx('displayName')}>{pin.user.displayName}</span>
                    <span className={cx('username')}>{pin.user.username}</span>
                </div>
                <div className={cx('sub')} onClick={onClick}>
                    <FaChevronDown />
                </div>
            </header>
            <div className={cx('pin-image')}>
                <div className={cx('wrapper')}>
                    <img className={cx('image')} src={pin.urls} alt={pin.user.username} />
                </div>
            </div>
            <div className={cx('pin-meta')}>
                <PinAction  likes={pin.likes} comments={pin.comments} onClick={onToggleLike}/>
                <PinInfo relation_url={pin.relation_url} description={pin.description} createdAt={pin.createdAt}/>
                <PinComment />
            </div>
        </div>
    )
}

export default PinFeed;