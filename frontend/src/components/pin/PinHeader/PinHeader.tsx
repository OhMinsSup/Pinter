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
}

const PinHeader:React.SFC<Props> = ({ username, displayName, thumbnail, id }) => {
    return (
        <div className={cx('pin-header')}>
            <div className={cx('premalink-header')}>
                <Link className={cx('user-group')} to="/">
                    <img className={cx('profile-thumbnail')} src={thumbnail} alt={username} />
                    <span className={cx('displayName-group')}>
                        <strong className={cx('displayNmae')}>{displayName}</strong>
                        <span>&rlm;</span>
                    </span>
                    <span className={cx('username')}>@<b>{username}</b></span>
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