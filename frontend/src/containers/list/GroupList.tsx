import * as React from 'react';
import GroupCardList from 'src/components/group/GroupCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { getScrollBottom } from '../../lib/common';
import { groupsCreators } from 'src/store/modules/list/groups';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type GroupListProps = StateProps & DispatchProps;

class GroupList extends React.Component<GroupListProps> {
    public prev: string | null = null;

    public onScroll = throttle(() => {
        const scrollButton = getScrollBottom();
        if (scrollButton > 1000) return;
        this.prefetch();
    }, 250);
    
    public prefetch = async () => {
        const { ListActions, groups, next } = this.props;
        if (!groups || groups.length === 0) return;

        if (this.props.prefetched) {
            ListActions.revealPrefetched();
            await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next;

        try {
            await ListActions.prefetchGroupList(next);
        } catch (e) {
            console.log(e);
        }
    }

    public initialize = async () => {
        const { ListActions } = this.props;

        try {
            await ListActions.getGroupsList();
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
    }

    public componentWillUnmount() {
        this.unlistenScroll();
    }

    public render() {
        const { groups } = this.props;

        return (
            <GroupCardList 
                groups={groups}
            />
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    groups: list.groups.groups.groups,
    prefetched: list.groups.groups.prefetched,
    next: list.groups.groups.next,
    loading: list.groups.groups.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(groupsCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupList);
