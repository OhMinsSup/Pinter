import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinAction.scss');
const cx = classNames.bind(styles);
const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');


const PinAction = () => {
    return (
        <div className={cx('pin-action')}>
            <div className={cx('icons')}>
                <span className={cx('icon')}>
                    <HeartIcon className={cx('like')}/>
                </span>
                <span className={cx('icon')}>
                    <CommentIcon className={cx('comment')}/>
                </span>
                <span className={cx('icon', 'right')}>
                    <SaveIcon className={cx('save')}/>
                </span>
            </div>
            <span className={cx('like-count')}>
                좋아요 8개
            </span>
            <span className={cx('comment-count')}>
                댓글 8개
            </span>
        </div>
    );
}

export default PinAction;