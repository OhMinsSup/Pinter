import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import Button from 'src/components/common/Button';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./CommonScreenCard.scss');
const cx = classNames.bind(styles);

const ScreenCard: React.SFC<{
  comments: number;
  likes: number;
  username: string;
  displayName: string;
  thumbnail: string;
  urls: string[];
  body: string;
  createdAt: string;
  relationUrl: string;
  id: string;
  onDelete(pinId: string): Promise<void>;
}> = ({
  urls,
  thumbnail,
  createdAt,
  displayName,
  comments,
  likes,
  body,
  relationUrl,
  username,
  onDelete,
  id,
}) => {
  return (
    <div className={cx('screen-card')}>
      <div className={cx('screen')}>
        <Button
          theme="default"
          className={cx('btn')}
          onClick={() => onDelete(id)}
        >
          <CancelIcon />
        </Button>
      </div>
      {urls ? (
        <div className={cx('thumbnail-wrapper')}>
          <img src={urls[0]} alt={username} />
          <div className={cx('white-mask')} />
        </div>
      ) : null}
      <div className={cx('card-content')}>
        <div className={cx('user-thumbnail-wrapper')}>
          <img src={thumbnail} alt={displayName} />
        </div>
        <div className={cx('content-head')}>
          <div className={cx('displayName')}>{displayName}</div>
          <div className={cx('subinfo')}>
            <span>{moment(createdAt).format('ll')}</span>
            <span>{comments} 개의 댓글</span>
            <span>{likes} 개의 좋아요</span>
          </div>
        </div>
        <div className={cx('description')}>
          {body}
          <span className={cx('relation')}>{relationUrl}</span>
        </div>
      </div>
    </div>
  );
};

const CommonScreenCard: React.SFC<{
  pins: any[];
  onDelete(pinId: string): Promise<void>;
}> = ({ pins, onDelete }) => {
  const pinList = pins.map((pin, index) => {
    const {
      comments,
      likes,
      user: { displayName, thumbnail, username },
      urls,
      body,
      createdAt,
      relationUrl,
      pinId,
    } = pin;

    return (
      <ScreenCard
        comments={comments}
        likes={likes}
        displayName={displayName}
        thumbnail={thumbnail}
        urls={urls}
        body={body}
        username={username}
        relationUrl={relationUrl}
        key={index}
        id={pinId}
        createdAt={createdAt}
        onDelete={onDelete}
      />
    );
  });
  return <div className={cx('common-screen-card')}>{pinList}</div>;
};

export default CommonScreenCard;
