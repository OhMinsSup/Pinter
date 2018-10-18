import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';

const styles = require('./GroupHeader.scss');
const cx = classNames.bind(styles);

type Props = {
  title: string;
  activation: boolean;
  visible: boolean;
  onSetUpdate(): void;
  onSetDelete(): void;
};

const GroupHeader: React.SFC<Props> = ({
  title,
  activation,
  onSetDelete,
  visible,
  onSetUpdate,
}) => {
  return (
    <div className={cx('group-header')}>
      <section>
        <div className={cx('group-title')}>
          <h1 className={cx('title')}>{title}</h1>
          <p className={cx('active')}>{activation ? '비공개' : '공개'}</p>
        </div>
        <Button theme="default" className={cx('btn')} onClick={onSetUpdate}>
          그룹 수정
        </Button>
        <Button theme="default" className={cx('btn')} onClick={onSetDelete}>
          {visible ? '취소' : '핀 삭제'}
        </Button>
      </section>
    </div>
  );
};

export default GroupHeader;
