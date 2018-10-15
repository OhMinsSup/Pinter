import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';

const styles = require('./GroupHeader.scss');
const cx = classNames.bind(styles);

type Props = {
  title: string;
  activation: boolean;
};

const GroupHeader: React.SFC<Props> = ({ title, activation }) => {
  return (
    <div className={cx('group-header')}>
      <section>
        <div className={cx('group-title')}>
          <h1 className={cx('title')}>{title}</h1>
          <p className={cx('active')}>{activation ? '비공개' : '공개'}</p>
        </div>
        <Button theme="default" className={cx('btn')}>
          그룹 수정
        </Button>
        <Button theme="default" className={cx('btn')}>
          핀 추가
        </Button>
        <Button theme="default" className={cx('btn')}>
          핀 삭제
        </Button>
      </section>
    </div>
  );
};

export default GroupHeader;
