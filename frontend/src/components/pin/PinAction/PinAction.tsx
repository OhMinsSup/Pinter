import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinAction.scss');
const cx = classNames.bind(styles);
const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');

type Props = {
    likes: number,
    comments: number,
    onClick(): void
}

const PinAction: React.SFC<Props> = ({ likes, comments, onClick }) => {
    return (
        <div className={cx('pin-action')}>
            <div className={cx('icons')}>
                <span className={cx('icon')} onClick={onClick}>
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
                좋아요 {likes}개
            </span>
            <span className={cx('comment-count')}>
                댓글 {comments}개
            </span>
        </div>
    );
}

export default PinAction;