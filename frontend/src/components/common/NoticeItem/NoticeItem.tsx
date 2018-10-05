import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./NoticeItem.scss');
const cx = classNames.bind(styles);

type Props = {
  message: string,
  thumbnail: string,
}

const NoticeItem: React.SFC<Props> = ({ message, thumbnail }) => {
  return (
    <div className={cx('notice-item')}>
      <Link to="/" className={cx("wrapper")}>
        <div className={cx('left')}>
          <img src={thumbnail} alt="thumbnail"/>
        </div>
        <div className={cx('right')}>
          {message}
        </div>
      </Link>
    </div>
  );
}
  
  export default NoticeItem;