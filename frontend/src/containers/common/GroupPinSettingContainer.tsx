import * as React from 'react';
import GroupPinSettingModal from 'src/components/group/GroupPinSettingModal';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { getScrollBottom } from '../../lib/common';
import { groupCreators } from '../../store/modules/group';
import { groupsCreators } from '../..//store/modules/list/groups';
import { writeCreators } from '../../store/modules/write';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class GroupPinSettingContainer extends React.Component<Props> {
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
      ListActions.groupRevealPrefetched();
      await Promise.resolve();
    }

    if (next === this.prev) return;
    this.prev = next;

    try {
      await ListActions.prefetchGroupList(next);
    } catch (e) {
      console.log(e);
    }
  };

  public onSave = async (groupId: string) => {
    const { pinId, GroupActions } = this.props;

    GroupActions.setGroupPin(false);

    try {
      await GroupActions.groupAddPin(pinId, groupId);
    } catch (e) {
      console.log(e);
    }
  };

  public onCancel = () => {
    const { GroupActions, WriteActions } = this.props;
    WriteActions.initialState();
    GroupActions.setGroupPin(false);
  };

  public onSelectTabActive = (visible: boolean) => {
    const { GroupActions } = this.props;
    GroupActions.setNavActive(visible);
  };

  public initialize = async () => {
    const { ListActions, active, displayName } = this.props;

    try {
      await ListActions.getGroupsList(active, displayName);
    } catch (e) {
      console.log(e);
    }
  };

  public listenScroll = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  public unlistenScroll = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  public componentDidMount() {
    const { groupModal } = this.props;
    if (!groupModal) return;
    this.initialize();
  }

  public componentDidUpdate(preProps: Props) {
    if (preProps.active !== this.props.active) {
      this.initialize();
    }
  }

  public componentWillUnmount() {
    this.unlistenScroll();
  }

  public render() {
    const { visible, url, body, tags, groups, active } = this.props;
    const { onCancel, onSelectTabActive, onSave } = this;
    return (
      <GroupPinSettingModal
        active={active}
        url={url}
        body={body}
        groups={groups}
        tags={tags}
        onOpen={visible}
        onSave={onSave}
        onSelectTab={onSelectTabActive}
        onCancel={onCancel}
      />
    );
  }
}

const mapStateToProps = ({ group, pin, list, user }: StoreState) => ({
  visible: group.groupPinModal.visible,
  url: pin.pin.urls[0],
  body: pin.pin.body,
  tags: pin.pin.tags,
  pinId: pin.pin.pinId,
  groups: list.groups.groups.groups,
  prefetched: list.groups.groups.prefetched,
  next: list.groups.groups.next,
  active: group.active.visible,
  list: list.groups.active,
  groupModal: group.groupPinModal.visible,
  displayName: user.user && user.user.displayName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  GroupActions: bindActionCreators(groupCreators, dispatch),
  WriteActions: bindActionCreators(writeCreators, dispatch),
  ListActions: bindActionCreators(groupsCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(GroupPinSettingContainer);
