import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
  header: React.ReactNode;
  children: React.ReactNode;
};

const PinTemplate: React.SFC<Props> = ({ header, children }) => {
  return (
    <div className={cx('pin-template')}>
      <header>{header}</header>
      <main className={cx('pin-area')}>{children}</main>
    </div>
  );
};

export default PinTemplate;
