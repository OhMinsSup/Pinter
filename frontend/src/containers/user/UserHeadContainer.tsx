import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { StoreState } from '../../store/modules';
import { actionCreators as pinActions } from '../../store/modules/pin';
import UserHead from '../../components/user/UserHead';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<string> }

type UserHeadContainerProps = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<UserHeadContainerProps> {
    public onPinScreen = () => {
        const { PinActions, visible } = this.props;
        if (!visible) return PinActions.setMakePinFullscreenLoader(true);
        return PinActions.setMakePinFullscreenLoader(false);
    }

    public render() {
        const { username, displayName, thumbnail, match } = this.props;
        const { onPinScreen } = this;
        const { url } = match;        
        return (
            <UserHead 
                username={username}
                displayName={displayName}
                thumbnail={thumbnail}
                url={url}
                onPinScreen={onPinScreen}
            />
        )
    }
}

const mapStateToProps = ({ user, pin }: StoreState) => ({
    username: user.user && user.user.username,
    thumbnail: user.user && user.user.thumbnail,
    displayName: user.user && user.user.displayName,
    visible: pin.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinActions, dispatch)
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserHeadContainer);