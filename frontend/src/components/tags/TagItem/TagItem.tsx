import * as React from 'react';
import * as classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../../lib/common';

const styles = require('./TagItem.scss')
const cx = classNames.bind(styles);

type Props = {
  name: string,
  count: number,
};

const TagItem: React.SFC<Props> = ({ name, count }) => (
  <Link
    className={cx('tag-item')}
    to={`/tags/${escapeForUrl(name)}`}
  >
    <div className={cx('name')}>{name}</div>
    <div className={cx('counts')}>{count}</div>
  </Link>
);

export default TagItem;