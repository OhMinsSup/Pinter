import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserPin, UserFollowing, UserFollower, UserSaves } from '../../page';
import UserContent from '../../components/user/UserContent';
import ListBoxUsers from '../recent/ListBoxUsers';


class UserContentContainer extends React.Component {
    public render() {
        return (
            <UserContent>
                <Switch>
                    <Route path="/@:displayName/pin" component={UserPin} />
                    <Route path="/@:displayName/following" component={UserFollowing} />
                    <Route path="/@:displayName/follower" component={UserFollower} />
                    <Route path="/@:displayName/saves" component={UserSaves} />
                </Switch>
                <ListBoxUsers />
            </UserContent>
        );
    }
}

export default UserContentContainer;