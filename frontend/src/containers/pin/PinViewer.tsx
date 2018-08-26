import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinHeader from '../../components/pin/PinHeader';
import PinContent from '../../components/pin/PinContent';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type PinViewerProps = StateProps & DispatchProps;

class PinViewer extends React.Component<PinViewerProps> {
    public render() {
        return(
            <React.Fragment>
                <PinHeader />
                <PinContent/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinViewer);