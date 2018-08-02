import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { throttle } from 'lodash';
import { StoreState } from '../../store/modules';
import { getScrollBottom } from '../../lib/common';
import { actionCreators as baseActions } from '../../store/modules/base';
import { actionCreators as listActions } from '../../store/modules/list';
import PinCardList from '../../components/common/PinCardList';
import Loading from '../../components/common/Loading';

type MatchType = {
    displayName?: string
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    location: Location,
    match: match<MatchType>,
}

type RecentPinsCardProps = StateProps & DispatchProps & OwnProps;

class RecentPinsCard extends React.Component<RecentPinsCardProps> {
    public prev: string | null = null;

    public onScroll = throttle(() => {
        const scrollBottom = getScrollBottom();
        if (scrollBottom > 1000) return;
        this.prefetch();
    }, 250);

    public prefetch = async () => {
        const { pins, next, ListActions } = this.props;
        if (!pins || pins.length === 0) return;

        if (this.props.prefetched) {
           ListActions.revealPrefetched('list');
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

    public onBoxClick = async (name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any> => {
        const { BaseActions, ListActions } = this.props;

        BaseActions.boxFullscreenLoader({
            id: id,
            name: name,
            theme: theme,
            visible: true
        })

        try {
            if (theme === 'like') {
                await ListActions.likeUserList(id);
            } else if (theme === 'comment') {
                await ListActions.commentUserList(id);
            } else if (theme === 'save') {
                await ListActions.lockerUserList(id);
            }
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
        const { onBoxClick } = this;
        if (loading) return <Loading />;
        
        return (
            <PinCardList pins={pins} onBoxClick={onBoxClick}/>
        );
    }
}

const mapStateToProps = ({ list, base }: StoreState) => ({
    pins: list.list.pins,
    prefetched: list.list.prefetched,
    next: list.list.next,
    loading: list.list.loading,
    like: base.box.like,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
});

export default compose( 
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
      mapStateToProps,
      mapDispatchToProps
    )
)(RecentPinsCard);
