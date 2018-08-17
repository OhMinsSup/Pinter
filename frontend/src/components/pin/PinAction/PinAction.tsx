import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinAction.scss');
const cx = classNames.bind(styles);
const HeartIcon = require('react-icons/lib/fa/heart-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');

type Props = {
    likes: number,
    onClick(): void
}

const PinAction: React.SFC<Props> = ({ likes, onClick }) => {
    return (
        <div className={cx('pin-action')}>
            <div className={cx('icons')}>
                <span className={cx('icon')} onClick={onClick}>
                    <HeartIcon className={cx('like')}/>
                </span>
                <span className={cx('icon', 'right')}>
                    <SaveIcon className={cx('save')}/>
                </span>
            </div>
            <span className={cx('like-count')}>
                좋아요 {likes}개
            </span>
        </div>
    );
}

export default PinAction;