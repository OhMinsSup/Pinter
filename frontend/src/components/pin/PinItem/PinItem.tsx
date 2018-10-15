import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinItem.scss');
const cx = classNames.bind(styles);

type Props = {
  icons: React.ReactNode;
  count?: number;
  type: string;
  locker?: boolean;
  onClick?(): Promise<void>;
};

const PinItem: React.SFC<Props> = ({ icons, count, type, onClick, locker }) => {
  return (
    <div className={cx('group')}>
      <button className={cx('btn')} onClick={onClick}>
        <div className={cx('item', type)}>
          {locker === true && type === 'save' ? (
            <span className={cx('save-locker')}>{icons}</span>
          ) : (
            <span>{icons}</span>
          )}
        </div>
        <span className={cx('item-count', type)}>{count}</span>
      </button>
    </div>
  );
};

export default PinItem;
