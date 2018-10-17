import * as React from 'react';
import GroupCardList from 'src/components/group/GroupCardList';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { getScrollBottom } from '../../lib/common';
import { groupsCreators } from 'src/store/modules/list/groups';
import { groupCreators } from 'src/store/modules/group';
import { match } from 'react-router-dom';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class GroupList extends React.Component<Props> {
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

  public onSelectTabActive = (visible: boolean) => {
    const { GroupActions } = this.props;
    GroupActions.setNavActive(visible);
  };

  public onDelete = async (groupId: string) => {
    const { GroupActions } = this.props;

    try {
      await GroupActions.deleteGroup(groupId);
    } catch (e) {
      console.log(e);
    }
  };

  public initialize = async () => {
    const {
      ListActions,
      active,
      match: {
        params: { displayName },
      },
    } = this.props;

    ListActions.initialize(active);

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
    this.initialize();
    this.listenScroll();
  }

  public componentDidUpdate(preProps: Props) {
    if (
      preProps.active !== this.props.active ||
      preProps.match.params.displayName !== this.props.match.params.displayName
    ) {
      this.initialize();
      this.listenScroll();
    }
  }

  public componentWillUnmount() {
    this.unlistenScroll();
  }

  public render() {
    const {
      groups,
      active,
      commonDisplayName,
      commonUserName,
      ownDisplayName,
      ownUsername,
    } = this.props;
    const { onSelectTabActive, onDelete } = this;

    return (
      <GroupCardList
        commonDisplayName={commonDisplayName}
        commonUserName={commonUserName}
        ownDisplayName={ownDisplayName}
        ownUsername={ownUsername}
        onSelectTab={onSelectTabActive}
        onDelete={onDelete}
        active={active}
        groups={groups}
      />
    );
  }
}

const mapStateToProps = ({ list, group, user, common }: StoreState) => ({
  groups: list.groups.groups.groups,
  prefetched: list.groups.groups.prefetched,
  next: list.groups.groups.next,
  active: group.active.visible,
  ownUsername: user.user && user.user.username,
  ownDisplayName: user.user && user.user.displayName,
  commonUserName: common.profile.username,
  commonDisplayName: common.profile.displayName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  GroupActions: bindActionCreators(groupCreators, dispatch),
  ListActions: bindActionCreators(groupsCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(GroupList);
