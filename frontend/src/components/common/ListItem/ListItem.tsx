import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ListItem.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    username: string,
    displayName: string,
    thumbnail: string
}

const ListItem: React.SFC<Props> = ({ username, displayName, thumbnail }) => {
    return (
        <li className={cx('list-item')}>
            <div className={cx('item-wrapper')}>
                <div className={cx('user-info')}>
                    <a className={cx('thumbnail-wrapper')}>
                        <img className={cx('thumbnail')} src={thumbnail} alt={username}/>
                    </a>
                    <div className={'username-wrapper'}>
                        <div className={cx('displayName-wrapper')}><a className={cx('displayName')}>{displayName}</a></div>
                        <div className={cx('username')}>{username}</div>
                    </div>
                    <div className={cx('user-button')}>
                        <button className={cx('button')}>팔로잉</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ListItem;