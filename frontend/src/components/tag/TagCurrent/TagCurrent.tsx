import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const BackIcon = require('react-icons/lib/io/android-arrow-back');
const styles = require('./TagCurrent.scss');
const cx = classNames.bind(styles);

type Props = {
  name?: string;
  count?: number | null;
  lastSort?: string;
};

const TagCurrent: React.SFC<Props> = ({ name, count, lastSort }) => {
  return (
    <div className={cx('tag-current')}>
      <Link
        className={cx('backwards-btn')}
        to={`/tags${lastSort === 'latest' ? '' : '?sort=name'}`}
      >
        <BackIcon />
        전체태그 보기
      </Link>
      <hr />
      <h2>
        #{name}{' '}
        {typeof count === 'number' && (
          <span className={cx('lighten')}>
            ({count && count.toLocaleString()}
            개의 포스트)
          </span>
        )}
      </h2>
    </div>
  );
};
export default TagCurrent;
