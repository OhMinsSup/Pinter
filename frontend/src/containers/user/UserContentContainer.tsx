import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserPin, UserFollowing } from '../../page';
import UserContent from '../../components/user/UserContent';


class UserContentContainer extends React.Component {
    public render() {
        return (
            <UserContent>
                <Switch>
                    <Route path="/@:displayName/pin" component={UserPin} />
                    <Route path="/@:displayName/following" component={UserFollowing} />
                </Switch>
            </UserContent>
        );
    }
}

export default UserContentContainer;