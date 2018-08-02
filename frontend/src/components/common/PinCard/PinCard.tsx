import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';
import SubInfoButton from '../SubInfoButton';
import * as moment from 'moment';

const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
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
  onBoxClick(name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any>
}

const PinCard: React.SFC<Props> = ({ id, displayName, thumbnail, relationUrl, description, urls, createdAt, likes, comments, tags, onBoxClick }) => {
    return (
    <div className={cx('common-card')}>
      <Link to={`/pin/${id}`} className={cx('thumbnail-wrapper')}>
        <img src={urls} />
        <div className={cx('white-mask')} />
      </Link>
      <div className={cx('card-content')}>
        <div className={cx('user-thumbnail-wrapper')}>
          <img src={thumbnail} />
        </div>
        <div className={cx('content-head')}>
          <div className={cx('username')}>
            @{displayName}
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
                    id={id}
                    theme="like"
                    onClick={onBoxClick}
                />
                <SubInfoButton 
                    icon={<CommentIcon/>}
                    id={id}
                    theme="comment"
                    onClick={onBoxClick}
                />
                <SubInfoButton 
                    icon={<SaveIcon/>}
                    id={id}
                    theme="save"
                    onClick={onBoxClick}
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