import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinComment from '../PinComment/PinComment';

const styles = require('./PinComments.scss');
const cx = classNames.bind(styles);

type Props = {
    comments: any[]
}

const PinComments: React.SFC<Props> = ({ comments }) => {
    const commentList = comments.map(
        (c) => {
            const { 
                commentId,
                text,
                createdAt,
                tagName,
                user: { _id, username, displayName, thumbnail }
            } = c;
            return (
                <PinComment
                    key={commentId}
                    id={commentId}
                    text={text}
                    createdAt={createdAt}
                    tagName={tagName}
                    userId={_id}
                    username={username}
                    displayName={displayName}
                    thumbnail={thumbnail}
                />
            )
        }
    )
    return(
        <div className={cx('pin-comments')}>
            <h4>{comments.length}개의 댓글</h4>
            <div className={cx('comment-list')}>
                {commentList}
            </div>
        </div>
    );
}

export default PinComments;
