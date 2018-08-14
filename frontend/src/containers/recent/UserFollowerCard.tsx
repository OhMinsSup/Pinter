import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { throttle } from 'lodash';
import { StoreState } from '../../store/modules';
import { actionCreators as listActions } from '../../store/modules/list';
import FollowCardList from '../../components/follow/FollowCardList';
import { getScrollBottom } from '../../lib/common';
import Loading from '../../components/common/Loading';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    displayName: string
}
type UserFollowerCardProps = StateProps & DispatchProps & OwnProps;

class UserFollowerCard extends React.Component<UserFollowerCardProps> {
    public prev: string | null = null;
    
    public onScroll = throttle(() => {
        const scrollBottom = getScrollBottom();
        if (scrollBottom > 1000) return;
        this.prefetch();
    }, 250);
    
    public initialize = async () => {
        const { ListActions, displayName } = this.props;
        
        try {
            await ListActions.getFollowerList(displayName);
        } catch (e) {
            console.log(e);
        }
    }
    
    public prefetch = async () => {
        const { users, next, ListActions } = this.props;
        if (!users || users.length === 0) return;

        if (this.props.prefetched) {
           ListActions.revealPrefetched('follower');
           await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next as string;

        try {
            await ListActions.prefetchFollowerList(next as string);
        } catch (e) {
            console.log(e);
        }
    }
    
    public listenScroll = () => {
        window.addEventListener('scroll', this.onScroll);
    };
    
    public unlistenScroll = () => {
        window.removeEventListener('scroll', this.onScroll);
    };
    
    public componentDidMount() {
        this.initialize();
        this.listenScroll();
    }
    
    public componentWillUnmount() {
        this.unlistenScroll();
    }
    
    public render() {
        const { users, loading } = this.props;

        if (loading) return <Loading />;
        return (
            <FollowCardList users={users}/>
        );
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    users: list.follower.user,
    prefetched: list.follower.prefetched,
    next: list.follower.next,
    loading: list.follower.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
});

export default compose(
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserFollowerCard);
