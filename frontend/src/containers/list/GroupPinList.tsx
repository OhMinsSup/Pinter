import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { getScrollBottom } from '../../lib/common';
import { baseCreators } from 'src/store/modules/base';
import { pinCreators } from 'src/store/modules/pin';
import { groupsCreators } from 'src/store/modules/list/groups';
import FakePinCards from 'src/components/common/FakePinCards/FakePinCards';
import { groupCreators } from 'src/store/modules/group';
import CommonCardList from 'src/components/common/CommonCardList';
import CommonScreenCard from 'src/components/group/CommonScreenCard';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { id: string; url: string };
type Props = StateProps & DispatchProps & OwnProps;

class GroupPinList extends React.Component<Props> {
  public prev: string | null = null;

  public onScroll = throttle(() => {
    const scrollButton = getScrollBottom();
    if (scrollButton > 1000) return;
    this.prefetch();
  }, 250);

  public prefetch = async () => {
    const { ListActions, pins, next } = this.props;
    if (!pins || pins.length === 0) return;

    if (this.props.prefetched) {
      ListActions.groupPinRevealPrefetched();
      await Promise.resolve();
    }

    if (next === this.prev) return;
    this.prev = next;

    try {
      await ListActions.prefetchGroupPinList(next);
    } catch (e) {
      console.log(e);
    }
  };

  public onOpen = async (id: string) => {
    const { BaseActions, PinActions } = this.props;
    BaseActions.setPinImage(true);

    try {
      await PinActions.getPin(id);
    } catch (e) {
      console.log(e);
    }
  };

  public onDelete = async (pinId: string) => {
    const { GroupActions, id } = this.props;

    try {
      await GroupActions.deleteGroupPin(id, pinId);
    } catch (e) {
      console.log(e);
    }
  };

  public initialize = async () => {
    const { ListActions, id } = this.props;
    try {
      await ListActions.getGroupPinList(id);
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
    if (preProps.id !== this.props.id) {
      this.initialize();
      this.listenScroll();
    }
  }

  public componentWillUnmount() {
    this.unlistenScroll();
  }

  public render() {
    const { pins, loading, visible } = this.props;
    const { onOpen, onDelete } = this;
    if (loading) return <FakePinCards pins={pins} />;

    if (visible) return <CommonScreenCard pins={pins} onDelete={onDelete} />;

    return <CommonCardList pins={pins} onOpen={onOpen} theme="user" />;
  }
}

const mapStateToProps = ({ list, group }: StoreState) => ({
  pins: list.groups.pins.pins,
  prefetched: list.groups.pins.prefetched,
  next: list.groups.pins.next,
  loading: list.groups.pins.loading,
  visible: group.deletePin.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ListActions: bindActionCreators(groupsCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
  PinActions: bindActionCreators(pinCreators, dispatch),
  GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(GroupPinList);
