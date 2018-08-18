import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { withRouter, match } from 'react-router-dom';
import PinComments from '../../components/pin/PinComments';
import { StoreState } from '../../store/modules';
import { actionCreators as listActions } from '../../store/modules/list';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProsp>;
type OwnProps = {
    match: match<{ id: string }>,
}

type PinCommentContainerProps = StateProps & DispatchProps & OwnProps

class PinCommentContainer extends React.Component<PinCommentContainerProps> {
    public initialize = async () => {
        const { ListActions, match: { params: { id } } } = this.props;
    
        try {
            await ListActions.getCommentList(id);
        } catch (e) {
            console.log(e);
        }
    }
    
    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { comments, loading } = this.props;

        if (loading) return null;
        return (
            <PinComments 
                comments={comments}
            />
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    comments: list.comments.comments,
    loading: list.comments.loading
});

const mapDispatchToProsp = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProsp
    )
)(PinCommentContainer);