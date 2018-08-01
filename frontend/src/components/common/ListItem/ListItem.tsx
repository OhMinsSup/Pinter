import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ListItem.scss');
const cx = classNames.bind(styles);

const ListItem = () => {
    return (
        <li className={cx('list-item')}>
            <div className={cx('item-wrapper')}>
                <div className={cx('user-info')}>
                    <a className={cx('thumbnail-wrapper')}>
                        <img className={cx('thumbnail')} src="https://scontent-icn1-1.cdninstagram.com/vp/82930d9f25c67d74f059fde4189dda46/5C0A73A9/t51.2885-19/s150x150/36148209_280384249190671_9090634509203800064_n.jpg?_nc_eui2=AeEnOJ04h_VGMj0LA7cGWHhP4u-cIM_laf0r6b4I8hwa75r0_-fyzxwUaY6-eo79h9wnLvoxLV36vDki2ZbgU2EKu3DMo0gUK5ugi69eSpR4wA" alt="username"/>
                    </a>
                    <div className={'username-wrapper'}>
                        <div className={cx('displayName-wrapper')}><a className={cx('displayName')}>veloss</a></div>
                        <div className={cx('username')}>오민섭</div>
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