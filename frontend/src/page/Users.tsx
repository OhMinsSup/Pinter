import * as React from 'react';
import UsersTemplate from '../components/users/UsersTemplate';
import UsersList from '../containers/list/UsersList';

const Users = () => {
  return (
    <UsersTemplate>
      <UsersList />
    </UsersTemplate>
  );
};

export default Users;
