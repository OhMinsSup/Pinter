import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./UsersItem.scss');
const cx = classNames.bind(styles);

type Props = {
  id: string;
  username: string;
  displayName: string;
  thumbnail: string;
};

const UsersItem: React.SFC<Props> = ({
  id,
  username,
  thumbnail,
  displayName,
}) => {
  return (
    <li className={cx('user-list')}>
      <div className={cx('list-wrapper')}>
        <div className={cx('wrapper')}>
          <div className={cx('user-info')}>
            <Link to={`/@${displayName}`} className={cx('thumbnail-wrapper')}>
              <img className={cx('thumbnail')} src={thumbnail} alt={username} />
            </Link>
            <div className={cx('username-wrapper')}>
              <div className={cx('displayName-wrapper')}>
                <div className={cx('displayName')}>
                  <Link to={`/@${displayName}`}>{displayName}</Link>
                </div>
              </div>
              <div className={cx('username')}>
                <Link to={`/@${displayName}`}>{username}</Link>
              </div>
            </div>
            <div className={cx('button-wrapper')}>
              <button className={cx('button')}>
                <Link to={`/@${displayName}`}>프로필</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default UsersItem;
