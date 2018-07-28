import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { StoreState } from '../../store/modules';
import { actionCreators as pinActions } from '../../store/modules/pin';
import { actionCreators as settingActions } from '../../store/modules/setting';
import { actionCreators as followActions } from '../../store/modules/follow';
import UserHead from '../../components/user/UserHead';

type MatchType = {
    displayName: string
}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<MatchType> }

type UserHeadContainerProps = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<UserHeadContainerProps> {
    public onPinScreen = () => {
        const { PinActions } = this.props;
        PinActions.setMakePinFullscreenLoader(true)
    }

    public onFollow = async (displayName: string) => {
        const { FollowActions } = this.props;

        try {
            await FollowActions.follow(displayName);
        } catch (e) {
            console.log(e);
        }
    }

    public onUnFollow = async (displayName: string) => {
        const { FollowActions } = this.props;

        try {
            await FollowActions.unfollow(displayName);
        } catch (e) {
            console.log(e);
        }
    }

    public onSettingScreen = () => {
        const { SettingActions } = this.props;
        SettingActions.setProfileFullscreenLoader(true);
    }

    public initialize = async () => {
        const { match: { params: { displayName } }, FollowActions } = this.props;

        try {
            await FollowActions.checkExistsUserFollow(displayName);
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { username, displayName, thumbnail, match } = this.props;
        const { onPinScreen, onSettingScreen } = this;
        const { url } = match;        
        return (
            <UserHead 
                username={username}
                displayName={displayName}
                thumbnail={thumbnail}
                url={url}
                onPinScreen={onPinScreen}
                onSettingScreen={onSettingScreen}
            />
        )
    }
}

const mapStateToProps = ({ user, pin, setting, follow }: StoreState) => ({
    username: user.user && user.user.username,
    thumbnail: user.user && user.user.thumbnail,
    displayName: user.user && user.user.displayName,
    pin_visible: pin.visible,
    setting_visible: setting.visible,
    follow: follow.user.follow
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinActions, dispatch),
    SettingActions: bindActionCreators(settingActions, dispatch),
    FollowActions: bindActionCreators(followActions, dispatch)
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserHeadContainer);