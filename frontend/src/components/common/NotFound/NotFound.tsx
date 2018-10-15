import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../Button';

const styles = require('./NotFound.scss');
const cx = classNames.bind(styles);

type Props = {
  onGoBack(): void;
};

const NotFound: React.SFC<Props> = ({ onGoBack }) => (
  <div className={cx('not-found')}>
    <h2>존재하지 않는 페이지입니다.</h2>
    <Button onClick={onGoBack} theme="default">
      돌아가기
    </Button>
  </div>
);

export default NotFound;
