import * as React from 'react';
import GroupHeader from 'src/components/group/GroupHeader';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, compose } from 'redux';
import { withRouter, match } from 'react-router-dom';
import GroupPinList from '../list/GroupPinList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type GroupPageViewerProps = StateProps & DispatchProps & OwnProps;

class GroupPageViewer extends React.Component<GroupPageViewerProps> {
    public render() {
        const { match: { params: { id } } } = this.props;
        return (
            <React.Fragment>
                <GroupHeader />
                <GroupPinList id={id}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(GroupPageViewer);