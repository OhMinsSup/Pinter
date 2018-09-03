import * as React from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { match } from 'react-router-dom';
import { getScrollBottom } from '../../lib/common';
import FollowCardList from '../../components/follow/FollowCardList';
import { followsCreators } from '../../store/modules/list/follows';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type FollowerUserListProps = StateProps & DispatchProps & OwnProps;

class FollowerUserList extends React.Component<FollowerUserListProps> {
    public prev: string | null = null;

    public onScroll = throttle(() => {
        const scrollButton = getScrollBottom();
        if (scrollButton > 1000) return;
        this.prefetch();
    }, 250);

    public prefetch = async () => {
        const { ListActions, users, next } = this.props;
        if (!users || users.length === 0) return;

        if (this.props.prefetched) {
            ListActions.revealFollowPrefetched('follower');
            await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next;

        try {
            await ListActions.prefetchfollowerList(next);
        } catch (e) {
            console.log(e);
        }
    }

    public initialize = async () => {
        const { ListActions, match: { params: { displayName } } } = this.props;
        try {
            await ListActions.getFollowerList(displayName);
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

        if (loading) return null;

        return (
            <FollowCardList
                users={users}
            />
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({ 
    users: list.follows.follower.user,
    prefetched: list.follows.follower.prefetched,
    next: list.follows.follower.next,
    loading: list.follows.follower.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(followsCreators, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(FollowerUserList);