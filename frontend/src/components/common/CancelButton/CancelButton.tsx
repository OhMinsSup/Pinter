import * as React from 'react';
import * as classNames from 'classnames/bind';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./CancelButton.scss');
const cx = classNames.bind(styles);

interface Props {
  onClick(): void;
}

const CancelButton: React.SFC<Props> = ({ onClick }) => {
  return (
    <div className={cx('cancel-wrapper')}>
      <button className={cx('cancel-btn')} onClick={onClick}>
        <CancelIcon />
      </button>
    </div>
  );
};

export default CancelButton;
