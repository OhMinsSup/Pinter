import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FakePin.scss');
const cx = classNames.bind(styles);

type Props = {};

const FakePin: React.SFC<Props> = () => {
  return (
    <div className={cx('fake-pin')}>
      <div className={cx('head')} />
      <div className={cx('line')} />
      <div className={cx('content')}>
        <div className={cx('content-wrapper')} />
      </div>
      <div className={cx('line')} />
    </div>
  );
};

export default FakePin;
