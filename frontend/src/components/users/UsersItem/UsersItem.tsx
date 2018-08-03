import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./UsersItem.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string
    username: string
    displayName: string
    thumbnail: string
}

const UsersItem: React.SFC<Props> = ({ id, username, thumbnail, displayName }) => {
    return (
        <li className={cx('user-list')}>
            <div className={cx('list-wrapper')}>
                <div className={cx('wrapper')}>
                    <div className={cx('user-info')}>
                        <a className={cx('thumbnail-wrapper')}>
                            <img className={cx('thumbnail')} src={thumbnail} alt={username}/>
                        </a>
                        <div className={cx('username-wrapper')}>
                            <div className={cx('displayName-wrapper')}>
                                <a className={cx('displayName')}>{displayName}</a>
                            </div>
                            <div className={cx('username')}>{username}</div>
                        </div>
                        <div className={cx('button-wrapper')}>
                            <button className={cx('button')}>프로필</button>
                        </div>
                    </div>
                </div>    
            </div>
        </li>

    )
}

export default UsersItem;