import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PinAction from '../PinAction';
import PinInfo from '../PinInfo';
import CommentInput from '../CommentInput';
import { FaChevronDown } from 'react-icons/lib/fa';

const styles = require('./PinFeed.scss');
const cx = classNames.bind(styles);

type Props = {
    pin: any,
    value: string,
    onToggleLike(): void,
    onClick(): void,
    onChangeComment(e: any): void,
    onKeyPress(e: any): void
}

const PinFeed: React.SFC<Props> = ({ pin, onToggleLike, onClick, value, onChangeComment, onKeyPress }) => {
    return (
        <div className={cx('pin-feed')}>
            <header className={cx('pin-header')}>
                <Link to={`/@${pin.user.displayName}`}><img className={cx('thumbnail')} src={pin.user.thumbnail} alt={pin.user.username}/></Link>
                <div className={cx('info')}>
                    <span className={cx('displayName')}><Link to={`/@${pin.user.displayName}`}>{pin.user.displayName}</Link></span>
                    <span className={cx('username')}><Link to={`/@${pin.user.displayName}`}>{pin.user.username}</Link></span>
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
                <PinAction  likes={pin.likes} onClick={onToggleLike}/>
                <PinInfo relation_url={pin.relation_url} description={pin.description} createdAt={pin.createdAt}/>
                <CommentInput value={value} onChange={onChangeComment} onKeyPress={onKeyPress}/>
            </div>
        </div>
    )
}

export default PinFeed;