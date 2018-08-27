import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinComment from '../../components/pin/PinComment';
import PinComments from '../../components/pin/PinComments';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PinCommentContainerProps = StateProps & DispatchProps;

class PinCommentContainer extends React.Component<PinCommentContainerProps> {
    public render() {
        return (
            <React.Fragment>
                <PinComment/>
                <PinComments />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinCommentContainer);