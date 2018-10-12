import * as React from 'react';
import GroupPinSettingModal from 'src/components/group/GroupPinSettingModal';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { getScrollBottom } from '../../lib/common';
import { groupCreators } from 'src/store/modules/group';
import { groupsCreators } from 'src/store/modules/list/groups';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type GroupPinSettingContainerProps = StateProps & DispatchProps;

class GroupPinSettingContainer extends React.Component<GroupPinSettingContainerProps> {
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

    public onCancel = () => {
        const { GroupActions } = this.props;
        GroupActions.setGroupPin(false);
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
        const { visible, url, body, tags, groups } = this.props;
        const { onCancel } = this;
        return (
            <GroupPinSettingModal
                url={url}
                body={body}
                groups={groups}
                tags={tags}
                onOpen={visible}
                onCancel={onCancel}
            />
        )
    }
}

const mapStateToProps = ({ group, pin, list }: StoreState) => ({
    visible: group.groupPinModal.visible,
    url: pin.pin.urls[0],
    body: pin.pin.body,
    tags: pin.pin.tags,
    groups: list.groups.groups.groups,
    prefetched: list.groups.groups.prefetched,
    next: list.groups.groups.next,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    GroupActions: bindActionCreators(groupCreators, dispatch),
    ListActions: bindActionCreators(groupsCreators, dispatch),
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupPinSettingContainer);