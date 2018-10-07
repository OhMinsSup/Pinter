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
    ownDisplayName: any,
    ownUsername: any,
    onFollow(displayName: string): Promise<void>,
    onClick(): void,
}

const PinHeader:React.SFC<Props> = ({ 
    username, 
    displayName, 
    thumbnail, 
    ownDisplayName,
    ownUsername,
    follow, 
    onFollow, 
    onClick 
}) => {
    return (
        <div className={cx('pin-header')}>
            <div className={cx('premalink-header')}>
                <Link className={cx('user-group')} to={`/@${displayName}`}>
                    <img className={cx('profile-thumbnail')} src={thumbnail} alt={username} />
                    <span className={cx('displayName-group')}>
                        <strong className={cx('displayNmae')}>{displayName}</strong>
                        <span>&rlm;</span>
                    </span>
                    <span className={cx('username')}>@<b>{username}</b></span>
                </Link>
                <div className={cx('follow-bar')}>
                    {   
                        (displayName === ownDisplayName) && (username === ownUsername) ? null : (
                            <React.Fragment>
                                {
                                    follow ? (
                                        <Button theme="default" onClick={() => onFollow(displayName)}>구독중</Button>
                                    ) : (
                                        <Button theme="default" onClick={() => onFollow(displayName)}>구독하기</Button>
                                    )
                                }
                            </React.Fragment>
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