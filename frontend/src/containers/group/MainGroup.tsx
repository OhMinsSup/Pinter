import * as React from 'react';
import GroupCardList from '../../components/group/GroupCardList';
import GroupCommonNav from '../../components/group/GroupCommonNav';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { throttle } from 'lodash';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { groupsCreators } from '../../store/modules/list/groups';
import { getScrollBottom } from '../../lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type MainGroupProps = StateProps & DispatchProps;

class MainGroup extends React.Component<MainGroupProps> {
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
            ListActions.revealPrefetched('group');
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
            await ListActions.getGroupList();
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
        const { size, groups } = this.props;
        return (
            <React.Fragment>
                <GroupCommonNav size={size}/>
                <GroupCardList groups={groups}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ base, list }: StoreState) => ({
    size: base.size,
    groups: list.groups.group.groups,
    prefetched: list.groups.group.prefetched,
    next: list.groups.group.next,
    loading: list.groups.group.loading,
});

const  mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    ListActions: bindActionCreators(groupsCreators, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainGroup);