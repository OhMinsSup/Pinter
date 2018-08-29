import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import ActionButton from '../ActionButton';

const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const styles = require('./CommonCard.scss');
const cx = classNames.bind(styles);

type Props = {
    comments?: number,
    likes?: number,
    displayName?: string,
    thumbnail?: string,
    postThumbnail?: string,
    text?: string,
    relationUrl?: string,
}

const CommonCard: React.SFC<Props>= ({ postThumbnail, thumbnail, displayName, comments, likes, text, relationUrl }) => {
    return (
        <div className={cx('common-card')}>
        {
          postThumbnail ? (
            <Link to="/" className={cx('thumbnail-wrapper')}>
              <img src={postThumbnail} alt={postThumbnail} />
              <div className={cx('white-mask')} />
            </Link>
          ) : null
        }
        <div className={cx('card-content')}>
          <div className={cx('user-thumbnail-wrapper')}>
            <img src={thumbnail} alt={displayName} />
          </div>
          <div className={cx('content-head')}>
            <div className={cx('displayName')}>{displayName}</div>
            <div className={cx('subinfo')}>
              <span>{moment('2018-08-16').format('ll')}</span>
              <span>{comments} 개의 댓글</span>
              <span>{likes} 개의 좋아요</span>
              <section className={cx('action-group')}>
                <ActionButton
                  icon={<HeartIcon/>}
                  id={'1213'}
                  theme="like"
                  onClick={() => console.log('dsds')}
                />
                <ActionButton
                  icon={<CommentIcon/>}
                  id={'1213'}
                  theme="comment"
                  onClick={() => console.log('dsds')}
                />
                <ActionButton
                  icon={<SaveIcon/>}
                  id={'1213'}
                  theme="save"
                  onClick={() => console.log('dsds')}
                />
              </section>
            </div>
          </div>
          <div className={cx('description')}>
            {text}
            <span className={cx('relation')} onClick={() => window.open(`${relationUrl}`)}>{relationUrl}</span>    
          </div>
        </div>
      </div>
    )
}

CommonCard.defaultProps = {
    comments: 5,
    likes: 5,
    displayName: 'veloss',
    text: '테스트다 테스트다 테스트다',
    thumbnail: 'https://pbs.twimg.com/profile_images/1012762345238454272/Q9jiI1pL_bigger.jpg',
    postThumbnail: 'https://pbs.twimg.com/media/Dlr2vRzWsAE2rkh.jpg',
    relationUrl: 'https://www.docker.com/'
}

export default CommonCard;