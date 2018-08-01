import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles  = require('./PinMenuItem.scss');
const cx = classNames.bind(styles);

type Props = {
    to?: string,
    children: React.ReactNode
    onClick?(): void
}

const PinMenuItem: React.SFC<Props> = ({ to, children, onClick }) => {
    if (!to) {
        return (
          <div className={cx("user-menu-item")} onClick={onClick}>
            {children}
          </div>
        );
      }
    
      return (
        <Link className={cx("user-menu-item")} to={to} onClick={onClick}>
          {children}
        </Link>
      );
}

export default PinMenuItem;