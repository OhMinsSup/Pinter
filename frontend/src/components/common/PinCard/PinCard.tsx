import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';
import PinSubInfo from '../PinSubInfo';


const styles = require('./PinCard.scss');
const cx = classNames.bind(styles);

const PinCard = () => {
    return (
    <div className={cx('common-card')}>
      <Link to="/" className={cx('thumbnail-wrapper')}>
        <img src="https://i.pinimg.com/564x/4b/0b/40/4b0b4085cd5a0fb5fb23f977a4ed0de5.jpg" />
        <div className={cx('white-mask')} />
      </Link>
      <div className={cx('card-content')}>
        <div className={cx('user-thumbnail-wrapper')}>
          <img src="https://c.disquscdn.com/uploads/users/19534/9041/avatar92.jpg?1481015527" />
        </div>
        <div className={cx('content-head')}>
          <div className={cx('username')}>@veloss</div>
          <h3>
            <Link to="/">description</Link>
          </h3>
          <PinSubInfo />
        </div>
        <div className={cx('tags')}>
          # tags
        </div>
      </div>
    </div>
    );
}

export default PinCard;