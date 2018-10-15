import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { match } from 'react-router-dom';
import { baseCreators } from '../../store/modules/base';
import CommonCardList from '../../components/common/CommonCardList';
import { getScrollBottom } from '../../lib/common';
import { pinCreators } from '../../store/modules/pin';
import { lockersCreators } from '../../store/modules/list/lockers';
import FakePinCards from '../../components/common/FakePinCards/FakePinCards';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class LockerPinList extends React.Component<Props> {
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
      ListActions.revealLockerPrefetched();
      await Promise.resolve();
    }

    if (next === this.prev) return;
    this.prev = next;

    try {
      await ListActions.prefetchLockerList(next);
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

  public initialize = async () => {
    const {
      ListActions,
      match: {
        params: { displayName },
      },
    } = this.props;
    try {
      await ListActions.getLockerList(displayName);
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
    const { pins, loading } = this.props;
    const { onOpen } = this;

    if (loading) return <FakePinCards pins={pins} />;

    return <CommonCardList pins={pins} onOpen={onOpen} theme="user" />;
  }
}

const mapStateToProps = ({ list }: StoreState) => ({
  pins: list.lockers.locker.pins,
  prefetched: list.lockers.locker.prefetched,
  next: list.lockers.locker.next,
  loading: list.lockers.locker.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
  ListActions: bindActionCreators(lockersCreators, dispatch),
  PinActions: bindActionCreators(pinCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LockerPinList);
