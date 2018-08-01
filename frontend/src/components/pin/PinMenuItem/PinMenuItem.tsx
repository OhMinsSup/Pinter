import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles  = require('./PinMenuItem.scss');
const cx = classNames.bind(styles);

type Props = {
    to?: string,
    children: React.ReactNode
}

const PinMenuItem: React.SFC<Props> = ({ to, children }) => {
    if (!to) {
        return (
          <div className={cx("user-menu-item")}>
            {children}
          </div>
        );
      }
    
      return (
        <Link className={cx("user-menu-item")} to={to}>
          {children}
        </Link>
      );
}

export default PinMenuItem;