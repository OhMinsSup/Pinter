import * as React from 'react';
import UsersTemplate from '../components/users/UsersTemplate';
import UsersList from '../containers/recent/UsersList';

const Users = () => {
    return (
        <UsersTemplate>
            <UsersList />
        </UsersTemplate>
    )
}

export default Users;