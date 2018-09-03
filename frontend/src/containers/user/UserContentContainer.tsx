import * as React from 'react';
import UserContent from '../../components/user/UserContent';
import { StoreState } from '../../store/modules';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, match } from 'react-router-dom';
import UserPinList from '../list/UserPinList';
import FollowerUserList from '../list/FollowerUserList';
import FollowingUserList from '../list/FollowingUserList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<string> };
type UserContentContainerProps = StateProps & DispatchProps & OwnProps;

class UserContentContainer extends React.Component<UserContentContainerProps> {
    public componentDidUpdate(preProps: UserContentContainerProps) {
        if (preProps.match.url != this.props.match.url) {
            this.render();
        }
    }

    public render() {
        return (
            <UserContent>
                <Switch>
                    <Route exact path="/@:displayName/" component={UserPinList} />
                    <Route exact path="/@:displayName/pin" component={UserPinList} />
                    <Route exact path="/@:displayName/follower" component={FollowerUserList} />                    <Route exact path="/@:displayName/follower" component={FollowerUserList} />
                    <Route exact path="/@:displayName/following" component={FollowingUserList} />
                </Switch>
            </UserContent>
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default compose(
    withRouter, 
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserContentContainer);