import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinHeader from '../../components/pin/PinHeader';
import PinContent from '../../components/pin/PinContent';
import { bindActionCreators } from 'redux';
import { pinCreators } from '../../store/modules/pin';
import FakePin from '../../components/pin/FakePin';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    id: string
}

type PinViewerProps = StateProps & DispatchProps &OwnProps;

class PinViewer extends React.Component<PinViewerProps> {
    public initialize = async () => {
        const { PinActions, id } = this.props;
        try {
            await PinActions.getPin(id);
        } catch (e) {
            console.log(e);
        }
    }
    
    public componentDidMount() {
        this.initialize();
    }

    public render() {    
        const { pin, loading } = this.props;

        if (loading) return <FakePin />

        return(
            <React.Fragment>
                <PinHeader 
                    username={pin.user.username} 
                    displayName={pin.user.displayName} 
                    thumbnail={pin.user.thumbnail}
                    id={pin.user._id}
                />
                <PinContent
                    pin={pin}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    pin: pin.pin && pin.pin,
    loading: pin.loading.pin
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinCreators, dispatch),
})

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinViewer);