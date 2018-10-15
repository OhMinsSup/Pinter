import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserNavItem from '../UserNavItem';

const styles = require('./UserNav.scss');
const cx = classNames.bind(styles);

type Props = {
  url: string;
  displayName: string;
};

const UserNav: React.SFC<Props> = ({ url, displayName }) => {
  return (
    <section className={cx('nav-menu-itmes')}>
      <UserNavItem
        text="핀"
        active={url === `/@${displayName}/pins`}
        to={`/@${displayName}/pins`}
      />
      <UserNavItem
        text="보관함"
        active={url === `/@${displayName}/lockers`}
        to={`/@${displayName}/lockers`}
      />
      <UserNavItem
        text="핀 그룹"
        active={url === `/@${displayName}/groups`}
        to={`/@${displayName}/groups`}
      />
    </section>
  );
};

export default UserNav;
