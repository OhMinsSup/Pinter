import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';
import SubInfoButton from '../SubInfoButton';
import SpriteChevron from '../SpriteChevron';

const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const RightIcon = require('react-icons/lib/fa/arrow-circle-right');
const LeftIcon = require('react-icons/lib/fa/arrow-circle-left');
const styles = require('./PinCard.scss');
const cx = classNames.bind(styles);

const PinCard = () => {
    return (
    <div className={cx('common-card')}>
      <Link to="/" className={cx('thumbnail-wrapper')}>
        <img src="https://i.pinimg.com/564x/4b/0b/40/4b0b4085cd5a0fb5fb23f977a4ed0de5.jpg" />
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
          <img src="https://c.disquscdn.com/uploads/users/19534/9041/avatar92.jpg?1481015527" />
        </div>
        <div className={cx('content-head')}>
          <div className={cx('username')}>
            @veloss <SpriteChevron />
          </div>
          <h3>
            <Link to="/">description</Link>
          </h3>
          <div className={cx('subinfo')}>
            <section className={cx('info')}>
                <span>댓글 8개</span>
                <span>좋아요 48개</span>     
            </section>
            <section className={cx('subinfo-wrapper')}>
                <SubInfoButton 
                    icon={<HeartIcon/>}
                    theme="like"
                    to="/"
                />
                <SubInfoButton 
                    icon={<CommentIcon/>}
                    theme="comment"
                    to="/"                
                />
                <SubInfoButton 
                    icon={<SaveIcon/>}
                    theme="save"
                    to="/"                
                />
                <span className={cx('date')}>Jul 16. 2018</span>       
            </section>
          </div>
        </div>
        <div className={cx('tags')}>
          # tags
        </div>
      </div>
    </div>
    );
}

export default PinCard;