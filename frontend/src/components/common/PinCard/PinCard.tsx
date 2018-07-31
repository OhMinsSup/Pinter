import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';
import SubInfoButton from '../SubInfoButton';
import SpriteChevron from '../SpriteChevron';
import * as moment from 'moment';

const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const RightIcon = require('react-icons/lib/fa/arrow-circle-right');
const LeftIcon = require('react-icons/lib/fa/arrow-circle-left');
const styles = require('./PinCard.scss');
const cx = classNames.bind(styles);

type Props = {
  id: string,
  relationUrl: string,
  description: string,
  urls: string[] | any,
  createdAt: string,
  likes: number,
  comments: number,
  tags: string[],
  displayName: string,
  thumbnail: string,
}

const PinCard: React.SFC<Props> = ({ id, displayName, thumbnail, relationUrl, description, urls, createdAt, likes, comments, tags }) => {
    return (
    <div className={cx('common-card')}>
      <Link to={`/pin/${id}`} className={cx('thumbnail-wrapper')}>
        <img src={urls} />
        <div className={cx('white-mask')}>
          <div className={cx('next-right')}>
            <RightIcon />
          </div>
          <div className={cx('next-left')}>
            <LeftIcon />
          </div>
        </div>
      </Link>
      <div className={cx('card-content')}>
        <div className={cx('user-thumbnail-wrapper')}>
          <img src={thumbnail} />
        </div>
        <div className={cx('content-head')}>
          <div className={cx('username')}>
            @{displayName} <SpriteChevron />
          </div>
          <h3>
            <Link to={`/pin/${id}`}>{description}</Link>
          </h3>
          <div className={cx('subinfo')}>
            <section className={cx('info')}>
                <span>댓글 {comments}개</span>
                <span>좋아요 {likes}개</span>   
                <span>{relationUrl}</span>  
            </section>
            <section className={cx('subinfo-wrapper')}>
                <SubInfoButton 
                    icon={<HeartIcon/>}
                    theme="like"
                />
                <SubInfoButton 
                    icon={<CommentIcon/>}
                    theme="comment"
                />
                <SubInfoButton 
                    icon={<SaveIcon/>}
                    theme="save"
                />
                <span className={cx('date')}>{moment(createdAt).format('ll')}</span>       
            </section>
          </div>
        </div>
        <div className={cx('tag-wrapper')}>
          <div className={cx('tags')}>{tags.map(t => <a key={t}>{t}</a>)}</div>
        </div>
      </div>
    </div>
    );
}

export default PinCard;