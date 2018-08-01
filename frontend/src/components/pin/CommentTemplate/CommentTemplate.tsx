import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./CommentTemplate.scss');
const cx = classNames.bind(styles);

const CommentTemplate = () => {
    return (
        <div className={cx('comment-template')}>
            <section>
                <div className={cx('title')}>#댓글</div>
                <ul className={cx('list')}>
                    <li className={cx('comments')}>
                        <span className={cx('username')}>veloss</span>{" "}
                        <span className={cx('comment')}>임시 댓글</span>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default CommentTemplate;