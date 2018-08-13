import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';
import { getScrollBottom } from '../../lib/common';
import { actionCreators as listActions } from '../../store/modules/list';
import { StoreState } from '../../store/modules';
import UsersBox from '../../components/users/UsersBox';
import Loading from '../../components/common/Loading';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type UsersListProps = StateProps & DispatchProps;

class UsersList extends React.Component<UsersListProps> {
    public prev: string | null = null;

    public onScroll = throttle(() => {
        const scrollBottom = getScrollBottom();
        if (scrollBottom > 1000) return;
        this.prefetch();
    }, 250);

    public prefetch = async () => {
        const { users, next, ListActions } = this.props;
        if (!users || users.length === 0) return;

        if (this.props.prefetched) {
           ListActions.revealPrefetched('users');
           await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next as string;

        try {
            await ListActions.prefetchUserList(next as string);
        } catch (e) {
            console.log(e);
        }
    }

    public initialize = async () => {
        const { ListActions } = this.props;
        try {
            await ListActions.getUsersList();
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
            <UsersBox users={users}/>
        );
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    users: list.users.user,
    prefetched: list.users.prefetched,
    next: list.users.next,
    loading: list.users.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UsersList);

