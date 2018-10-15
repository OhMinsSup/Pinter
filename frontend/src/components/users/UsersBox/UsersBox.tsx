import * as React from 'react';
import * as classNames from 'classnames/bind';
import UsersItem from '../UsersItem';

const styles = require('./UsersBox.scss');
const cx = classNames.bind(styles);

type Props = {
  users: any[];
};

const UsersBox: React.SFC<Props> = ({ users }) => {
  const usersList = users.map(user => {
    const {
      user: { _id, username, displayName, thumbnail },
    } = user;
    return (
      <UsersItem
        key={_id}
        id={_id}
        username={username}
        displayName={displayName}
        thumbnail={thumbnail}
      />
    );
  });
  return (
    <ul className={cx('users-box')}>
      <li className={cx('title-wrapper')}>
        <h2 className={cx('title')}>추천</h2>
      </li>
      <div className={cx('user-wrapper')}>{usersList}</div>
    </ul>
  );
};

export default UsersBox;
