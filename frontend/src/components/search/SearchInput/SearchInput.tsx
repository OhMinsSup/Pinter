import * as React from 'react';
import * as classNames from 'classnames/bind';

const SearchIcon = require('react-icons/lib/fa/search');
const styles = require('./SearchInput.scss');
const cx = classNames.bind(styles);

type Props = {
  value: string | undefined;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const SearchInput: React.SFC<Props> = ({ value, onChange }) => {
  return (
    <div className={cx('search-input')}>
      <SearchIcon className={cx('icons')} />
      <input
        className={cx('input')}
        placeholder="검색"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
