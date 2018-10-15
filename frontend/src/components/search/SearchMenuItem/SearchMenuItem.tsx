import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';
const styles = require('./SearchMenuItem.scss');

const cx = classNames.bind(styles);

type Props = {
  text: string;
  to: string;
  active?: boolean;
};

const SearchMenuItem: React.SFC<Props> = ({ text, to, active }) => {
  return (
    <div className={cx('search-menu-item', { active })}>
      <Link to={to}>
        <div className={cx('text')}>{text}</div>
      </Link>
    </div>
  );
};

SearchMenuItem.defaultProps = {
  to: '',
  active: false,
};

export default SearchMenuItem;
