import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../../lib/common';
import PinItem from '../PinItem';

const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const LikeIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const styles = require('./PinContent.scss');
const cx = classNames.bind(styles);

type Props = {
  pin: any;
  locker: boolean;
  onToggleLike(): Promise<void>;
  onToggleLocker(): Promise<void>;
};

const PinContent: React.SFC<Props> = ({
  pin,
  onToggleLike,
  onToggleLocker,
  locker,
}) => {
  const imageList = pin.urls.map((url: string, index: number) => {
    return (
      <div key={index} className={cx('image-containter')}>
        <div className={cx('images')}>
          <div className={cx('image')}>
            <img src={url} alt={url} />
          </div>
        </div>
      </div>
    );
  });

  const tagList = pin.tags.map((tag: string) => {
    return (
      <Link to={`/tags/${escapeForUrl(tag)}`} key={tag}>
        {tag}
      </Link>
    );
  });

  return (
    <div className={cx('pin-content')}>
      <p className={cx('body')}>
        {pin.body}
        <span
          className={cx('relation-url')}
          onClick={() => window.open(`${pin.relationUrl}`)}
        >
          {pin.relationUrl}
        </span>
      </p>
      {imageList}
      <div className={cx('content-footer')}>
        <div className={cx('action-list')}>
          <PinItem
            icons={<CommentIcon />}
            count={pin.comments}
            type="comment"
          />
          <PinItem
            icons={<LikeIcon />}
            count={pin.likes}
            type="like"
            onClick={onToggleLike}
          />
          <PinItem
            icons={<SaveIcon />}
            type="save"
            locker={locker}
            onClick={onToggleLocker}
          />
        </div>
      </div>
      <div className={cx('tag-container')}>{tagList}</div>
    </div>
  );
};

export default PinContent;
