import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const ImageIcon = require('react-icons/lib/io/image');
const styles = require('./GroupCard.scss');
const cx = classNames.bind(styles);

type Props = {
    urls?: string;
}

const GroupCard: React.SFC<Props> = ({ urls }) => {
    return (
        <div className={cx('group-card')}>
        {
            <div className={cx('thumbnail-wrapper')}>
            urls ? (
                <img src="https://velopert.com/wp-content/uploads/2018/02/blog-images.002.png" alt="thumbnail" />
            ) : (
                <div className={cx('image-placeholder')}>
                    <ImageIcon />
                </div>
            )
            <div className={cx('white-mask')} />
            </div>
        }
        <div className={cx('card-content')}>
          <Link to="/" className={cx('user-thumbnail-wrapper')}>
            <img src="https://images.velog.io/thumbnails/velopert/0fe0e5e0-933f-11e8-9da6-398b11656879-17202261.png" alt="thumbnail" />
          </Link>
          <div className={cx('content-head')}>
            <Link to="/" className={cx('username')}>
                veloss
            </Link>
            <h3>
                <Link to="/">제목</Link>
            </h3>
          </div>
        </div>
      </div>    
    )
}

export default GroupCard;

