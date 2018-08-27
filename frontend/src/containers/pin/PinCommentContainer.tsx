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
        const { loading } = this.props;
        if (loading) return null;
        return (
            <React.Fragment>
                <PinComment/>
                <PinComments />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    loading: pin.loading.pin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinCommentContainer);