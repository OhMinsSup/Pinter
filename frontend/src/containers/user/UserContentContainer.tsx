import * as React from 'react';
import { Route } from 'react-router-dom';
import { UserPin, UserFollowing } from '../../page';
import UserContent from '../../components/user/UserContent';


class UserContentContainer extends React.Component {
    public render() {
        return (
            <UserContent>
                <Route exact path="/@:displayName/pin" component={UserPin} />
                <Route exact path="/@:displayName/following" component={UserFollowing} />
            </UserContent>
        );
    }
}

export default UserContentContainer;