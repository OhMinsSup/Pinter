import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./Responsive.scss');
const cx = classNames.bind(styles);

type Props  = {
    children: React.ReactNode,
    className: string,
}

const Responsive: React.SFC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={cx('common', 'responsive', className)} {...rest}>
      { children }
    </div>
  );
};

export default Responsive;