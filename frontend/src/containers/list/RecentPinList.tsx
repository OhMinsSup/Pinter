import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, match } from 'react-router-dom';
import CommonCardList from '../../components/common/CommonCardList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };

type RecentPinListProps = StateProps & DispatchProps & OwnProps

class RecentPinList extends React.Component<RecentPinListProps> {
    public render() {
        return (
            <CommonCardList />
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    pins: list.recent.recent.pins,
    prefetched: list.recent.recent.prefetched,
    loading: list.recent.recent.loading
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(RecentPinList);