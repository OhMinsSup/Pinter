import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const AlphabeticalIcon = require('react-icons/lib/md/sort-by-alpha');
const HotIcon = require('react-icons/lib/md/whatshot');
const styles = require('./TagsTab.scss');
const cx = classNames.bind(styles);

type Props = {
  sort: string | null;
};

const TagsTab: React.SFC<Props> = ({ sort }) => (
  <div className={cx('tags-tab')}>
    <Link className={cx({ active: sort === 'latest' })} to="/tags?sort=latest">
      <HotIcon />
      최신순
    </Link>
    <Link className={cx({ active: sort === 'name' })} to="/tags?sort=name">
      <AlphabeticalIcon />
      이름순
    </Link>
  </div>
);

TagsTab.defaultProps = {
  sort: 'popular',
};

export default TagsTab;
