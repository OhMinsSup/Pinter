import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const styles = require('./PinComments.scss');
const cx = classNames.bind(styles);

type Props = {
  comments: any[];
  ownUser: any;
  onRemoveComment(commendId: string): Promise<void>;
};

const Comment: React.SFC<{
  text: string;
  createdAt: string;
  tags: string[];
  tagId: string[];
  user: any;
  id: string;
  ownUser: any;
  onClick(commendId: string): Promise<void>;
}> = ({ text, user, createdAt, tags, onClick, id, ownUser }) => {
  const tagList = tags.map((tag: string) => (
    <Link className={cx('tags')} key={tag} to="/">
      {tag}
    </Link>
  ));
  return (
    <div className={cx('comment-item')}>
      <div className={cx('comment-header')}>
        <img className={cx('thumbnail')} src={user.thumbnail} alt="thumbnail" />
        <div className={cx('username')}>@{user.displayName}</div>
        <div className={cx('date')}>{moment(createdAt).format('ll')}</div>
        {user.displayName === ownUser.displayName &&
        user.username === ownUser.username ? (
          <div className={cx('delete')}>
            <button onClick={() => onClick(id)}>삭제</button>
          </div>
        ) : null}
      </div>
      <p>{text}</p>
      <div>{tagList}</div>
    </div>
  );
};

const PinComments: React.SFC<Props> = ({
  comments,
  onRemoveComment,
  ownUser,
}) => {
  const commentList = comments.map(comment => {
    const { commentId, text, createdAt, tagName, tagId, user } = comment;
    return (
      <Comment
        text={text}
        createdAt={createdAt}
        tags={tagName}
        key={commentId}
        id={commentId}
        tagId={tagId}
        user={user}
        onClick={onRemoveComment}
        ownUser={ownUser}
      />
    );
  });
  return <div className={cx('pin-comments')}>{commentList}</div>;
};

export default PinComments;
