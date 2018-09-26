import * as React from 'react';
import * as classNames from 'classnames/bind';
import SearchMenuItem from '../SearchMenuItem';

const styles = require('./SearchHeader.scss');
const cx = classNames.bind(styles);

type Props = {
  url: string
}

const SearchHeader: React.SFC<Props> = ({ url }) => {
  return (
      <div className={cx('search-tool-bar')}>
        <SearchMenuItem
          text="핀"
          to="/search/pin"
          active={url === '/search/pin'}
        />
        <SearchMenuItem
          text="사용자"
          to="/search/user"
          active={url === '/search/user'}
        />
      </div>
  );
}

export default SearchHeader;