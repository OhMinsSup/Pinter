import * as React from 'react';
import * as classNames from'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const styles = require('./PinComments.scss');
const cx = classNames.bind(styles);

type Props = {
    comments: any[],
}

const Comment:React.SFC<{ 
    text: string, 
    createdAt: string, 
    tags: string[],
    tagId: string[],
    user: any
}> = ({ text, user, createdAt, tags }) => {
    const tagList = tags.map(
        (tag: string) => <Link className={cx('tags')} key={tag} to='/'>{tag}</Link>
    );    
    return(
        <div className={cx('comment-item')}>
            <div className={cx('comment-header')}>
                <img className={cx('thumbnail')} src={user.thumbnail} alt="thumbnail"/>
                <div className={cx('username')}>@{user.displayName}</div>
                <div className={cx('date')}>{moment(createdAt).format('ll')}</div>
            </div>
            <p>{text}</p>
            <div>
                {tagList}
            </div>
        </div>
    )
}

const PinComments: React.SFC<Props> = ({ comments }) => {
    const commentList = comments.map(
        (comment) => {
            const { commentId, text, createdAt, tagName, tagId, user } = comment;
            return (
                <Comment 
                    text={text}
                    createdAt={createdAt}
                    tags={tagName}
                    key={commentId}
                    tagId={tagId}
                    user={user}
                />
            );
        }
    )
    return (
        <div className={cx('pin-comments')}>
            { commentList }
        </div>
    );
}



export default PinComments;
