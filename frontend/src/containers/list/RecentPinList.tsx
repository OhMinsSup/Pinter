import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { withRouter, match } from 'react-router-dom';
import { baseCreators } from '../../store/modules/base';
import CommonCardList from '../../components/common/CommonCardList';
import { getScrollBottom, createArray } from '../../lib/common';
import { recentCreators } from '../../store/modules/list/recent';
import { pinCreators } from '../../store/modules/pin';
import FakePinCard from '../../components/common/FakePinCard';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };

type RecentPinListProps = StateProps & DispatchProps & OwnProps;

class RecentPinList extends React.Component<RecentPinListProps> {
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
            ListActions.revealPrefetched('recent');
            await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next;

        try {
            await ListActions.prefetchPinList(next);
        } catch (e) {
            console.log(e);
        }
    }

    public onOpen = async (id: string) => {
        const { BaseActions, PinActions } = this.props;
        BaseActions.setPinImage(true);

        try {
            await PinActions.getPin(id);
        } catch (e) {
            console.log(e);
        }
    }

    public initialize = async () => {
        const { ListActions } = this.props;
        try {
            await ListActions.getPinList();
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
        const { pins, loading } = this.props;
        const { onOpen } = this;

        if (!loading) return createArray(pins.length).map(num => <FakePinCard key={num} />);

        return (
            <CommonCardList
                pins={pins} 
                onOpen={onOpen}
            />
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    pins: list.recent.recent.pins,
    prefetched: list.recent.recent.prefetched,
    next: list.recent.recent.next,
    loading: list.recent.recent.loading
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    ListActions: bindActionCreators(recentCreators, dispatch),
    PinActions: bindActionCreators(pinCreators, dispatch),
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(RecentPinList);