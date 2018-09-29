import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./GroupMenuItem.scss');
const cx = classNames.bind(styles);

type Props = {
    to?: string,
    children: any
};
  
const GroupMenuItem: React.SFC<Props> = ({ to, children, ...rest }) => {
    if (!to) {
      return (
        <div className={cx('group-menu-item')} {...rest}>
          {children}
        </div>
      );
    }
  
    return (
      <Link className={cx('group-menu-item')} to={to} {...rest}>
        {children}
      </Link>
    );
};
  
GroupMenuItem.defaultProps = {
    to: '/',
};

export default GroupMenuItem;