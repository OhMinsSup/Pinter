import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinHeader from '../../components/pin/PinHeader';
import PinContent from '../../components/pin/PinContent';
import { bindActionCreators } from 'redux';
import { pinCreators } from '../../store/modules/pin';
import FakePin from '../../components/pin/FakePin';
import { lockerCreators } from '../../store/modules/locker';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { id: string }

type PinViewerProps = StateProps & DispatchProps & OwnProps;

class PinViewer extends React.Component<PinViewerProps> {
    public initialize = async () => {
        const { PinActions, LockerActions, id } = this.props;
        try {
            await PinActions.getPin(id);
            await PinActions.getLike(id);
            await LockerActions.getLockerPin(id);
        } catch (e) {
            console.log(e);
        }
    }
    
    public onToggleLike = async () => {
        const { PinActions, id, liked } = this.props;

        try {
            if (liked) {
                await PinActions.unlikePin(id);
            } else {
                await PinActions.likePin(id);            
            } 
        } catch (e) {
            console.log(e);
        }
    }

    public onToggleLocker = async () => {
        const { LockerActions, id, locker } = this.props;

        try {
            if (locker) {
                await LockerActions.unlockerPin(id);
            } else {
                await LockerActions.lockerPin(id);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {    
        const { pin, loading } = this.props;
        const { onToggleLike, onToggleLocker } = this;
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
                    onToggleLocker={onToggleLocker}
                    onToggleLike={onToggleLike}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin, locker }: StoreState) => ({
    pin: pin.pin && pin.pin,
    loading: pin.loading.pin,
    liked: pin.liked,
    locker: locker.locker,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinCreators, dispatch),
    LockerActions: bindActionCreators(lockerCreators, dispatch),
})

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinViewer);