// @flow
import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupMenuItem from '../GroupMenuItem';

const styles = require('./GroupMenu.scss');
const cx = classNames.bind(styles);


type Props = {
  username?: string,
  onClick?(): void,
  onLogout?(): Promise<any>,
};

const GroupMenu: React.SFC<Props> = ({ onClick, onLogout, username }) => {
  return (
    <div className={cx('group-menu-wrapper')}>
      <div className={cx('group-menu-positioner')}>
        <div className={cx('rotated-square')} />
        <div className={cx('group-menu')} onClick={onClick}>
          <div className={cx('menu-items')}>
            <GroupMenuItem to={`/@${username}`}>내 페이지</GroupMenuItem>
            <div className={cx('separator')} />
            <GroupMenuItem to="/">새 글 작성</GroupMenuItem>
            <GroupMenuItem to="/">임시 글</GroupMenuItem>
            <div className={cx('separator')} />
            <GroupMenuItem to="/">설정</GroupMenuItem>
            <GroupMenuItem>로그아웃</GroupMenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMenu