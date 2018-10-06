import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const Dropdown = require('react-icons/lib/fa/angle-down');
const styles = require('./PinHeader.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    username: string,
    displayName: string,
    thumbnail: string,
    follow: boolean,
    onFollow(displayName: string): Promise<void>,
    onClick(): void,
}

const PinHeader:React.SFC<Props> = ({ 
    username, 
    displayName, 
    thumbnail, 
    id, 
    follow, 
    onFollow, 
    onClick 
}) => {
    return (
        <div className={cx('pin-header')}>
            <div className={cx('premalink-header')}>
                <Link className={cx('user-group')} to={`/@{displayName}`}>
                    <img className={cx('profile-thumbnail')} src={thumbnail} alt={username} />
                    <span className={cx('displayName-group')}>
                        <strong className={cx('displayNmae')}>{displayName}</strong>
                        <span>&rlm;</span>
                    </span>
                    <span className={cx('username')}>@<b>{username}</b></span>
                </Link>
                <div className={cx('follow-bar')}>
                    {
                        follow ? (
                            <Button theme="default" onClick={() => onFollow(displayName)}>구독중</Button>
                        ) : (
                            <Button theme="default" onClick={() => onFollow(displayName)}>구독하기</Button>
                        )
                    }
                </div>
                <div className={cx('action-menu')}>
                    <div className={cx('dropdown')}>
                        <button className={cx('action-button')} onClick={onClick}>
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