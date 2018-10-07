import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinHeader from '../../components/pin/PinHeader';
import PinContent from '../../components/pin/PinContent';
import { bindActionCreators } from 'redux';
import { pinCreators } from '../../store/modules/pin';
import FakePin from '../../components/pin/FakePin';
import { lockerCreators } from '../../store/modules/locker';
import { followCreators } from '../../store/modules/follow';
import PinMenu from '../../components/pin/PinMenu';
import { baseCreators } from '../../store/modules/base';
import { writeCreators } from '../../store/modules/write';
import { History } from 'history';
import { commonCreators } from '../../store/modules/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { id: string, history: History };

type PinViewerProps = StateProps & DispatchProps & OwnProps;

class PinViewer extends React.Component<PinViewerProps> {
    public initialize = async () => {
        const { PinActions, LockerActions, id, FollowActions, pin: { user: { displayName } } } = this.props;
        try {
            await PinActions.getPin(id);
            await PinActions.getLike(id);
            await LockerActions.getLockerPin(id);
            await FollowActions.checkExistsUserFollow(displayName);
        } catch (e) {
            console.log(e);
        }
    }

    public onAskRemove = (id: string) => {
        const { BaseActions, WriteActions } = this.props;
        BaseActions.setModal(true);
        WriteActions.setpinId(id);
    }

    public onClickUpdate = async (id: string) => {
        const { WriteActions } = this.props;
        WriteActions.setpinId(id);

        try {
            await WriteActions.getPinData(id);
            this.props.history.push('/write');
        } catch (e) {
            console.log(e);
        }
    }

    public onClick = () => {
        const { BaseActions, menuVisible } = this.props;
        menuVisible ? BaseActions.setMenu(false) : BaseActions.setMenu(true);
    }
    
    public onToggleLike = async () => {
        const { PinActions, id, liked, CommonActions } = this.props;

        try {
            if (liked) {
                await PinActions.unlikePin(id);
            } else {
                await PinActions.likePin(id);            
            } 
            await CommonActions.sendMessage('작성하신 핀을 좋아요');
        } catch (e) {
            console.log(e);
        }
    }

    public onToggleFollow = async (displayName: string) => {
        const { FollowActions, follow } = this.props;

        try {
            if (follow) {
                await FollowActions.unfollow(displayName);
            } else {
                await FollowActions.follow(displayName);
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
        const { pin, loading, follow, username, displayName, menuVisible, locker } = this.props;
        const { onToggleLike, onToggleLocker, onToggleFollow, onClick, onClickUpdate, onAskRemove } = this;
        if (loading) return <FakePin />;

        return(
            <React.Fragment>
                <PinHeader 
                    username={pin.user.username} 
                    displayName={pin.user.displayName} 
                    thumbnail={pin.user.thumbnail}
                    ownDisplayName={displayName}
                    ownUsername={username}
                    id={pin.user._id}
                    follow={follow}
                    onFollow={onToggleFollow}
                    onClick={onClick}
                />
                <PinMenu
                    ownDisplayName={displayName}
                    ownUsername={username}
                    username={pin.user.username}
                    displayName={pin.user.displayName}
                    visible={menuVisible}
                    onClick={onClick}
                    id={pin.pinId}
                    onAskRemove={onAskRemove}
                    onClickUpdate={onClickUpdate}
                />
                <PinContent
                    pin={pin}
                    locker={locker}
                    onToggleLocker={onToggleLocker}
                    onToggleLike={onToggleLike}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin, locker, follow, user, base }: StoreState) => ({
    pin: pin.pin && pin.pin,
    loading: pin.loading.pin,
    liked: pin.liked,
    locker: locker.locker,
    follow: follow.user.follow,
    username: user.user && user.user.username,
    displayName: user.user && user.user.displayName,
    menuVisible: base.menu.visible,
    modalVisible: base.modal.visible,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinCreators, dispatch),
    LockerActions: bindActionCreators(lockerCreators, dispatch),
    FollowActions: bindActionCreators(followCreators, dispatch),
    BaseActions: bindActionCreators(baseCreators, dispatch),
    WriteActions: bindActionCreators(writeCreators, dispatch),
    CommonActions: bindActionCreators(commonCreators, dispatch),
})

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(PinViewer);