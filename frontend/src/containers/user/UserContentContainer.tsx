import * as React from 'react';
import UserContent from '../../components/user/UserContent';
import { StoreState } from '../../store/modules';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, match } from 'react-router-dom';
import UserPinList from '../list/UserPinList';
import LockerPinList from '../list/LockerPinList';
import UserFollowView from '../../components/user/UserFollowView';
import { followsCreators } from '../../store/modules/list/follows';
import GroupList from '../list/GroupList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type UserContentContainerProps = StateProps & DispatchProps & OwnProps;

class UserContentContainer extends React.Component<UserContentContainerProps> {
    public onSelectTabFollow = (value: string) => {
        const { ListActions } = this.props;
        ListActions.selectTabFollow(value);
    }

    public onUserMore = (value: boolean) => {
        const { ListActions } = this.props;
        value ? ListActions.followUsersMore(false) : ListActions.followUsersMore(true);
    }

    public initialize = async () => {
        const { tab, cursor, ListActions, match: { params: { displayName } } } = this.props;
        try {
            if (tab === 'follow') {
                await ListActions.getFollowerList(displayName, cursor);
            } else if (tab === 'following') {
                await ListActions.getFollowingList(displayName, cursor);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount () {
        this.initialize();
    }
    
    public componentDidUpdate(preProps: UserContentContainerProps) {
        if ((preProps.match.url != this.props.match.url) || 
            (preProps.tab != this.props.tab) || 
            (preProps.cursor != this.props.cursor) || 
            (preProps.match.params.displayName !== this.props.match.params.displayName)) {
            this.initialize();
        }
    }

    public render() {
        const { tab, cursor, users } = this.props;
        const { onSelectTabFollow, onUserMore } = this;
        
        return (
            <UserContent
                side={
                    <UserFollowView 
                        tab={tab}
                        cursor={cursor}
                        followDatas={users}
                        onSelectTab={onSelectTabFollow}
                        onUserMore={onUserMore}
                    />
                }
            >
                <Switch>
                    <Route exact path="/@:displayName/" component={UserPinList} />
                    <Route exact path="/@:displayName/pin" component={UserPinList} />
                    <Route exact path="/@:displayName/locker" component={LockerPinList} />
                    <Route exact path="/@:displayName/group" component={GroupList} />
                </Switch>
            </UserContent>
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    users: list.follows.follow.users,
    tab: list.follows.tab.value,
    cursor: list.follows.tab.cursor,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(followsCreators, dispatch),
});

export default compose(
    withRouter, 
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserContentContainer);