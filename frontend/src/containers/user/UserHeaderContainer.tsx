import * as React from 'react';
import UserHeader from '../../components/user/UserHeader';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { withRouter, match } from 'react-router';
import { connect } from 'react-redux';
import UserNav from '../../components/user/UserNav/UserNav';
import { baseCreators } from '../../store/modules/base';
import { commonCreators } from '../../store/modules/common';
import FullscreenLoader from '../../components/base/FullscreenLoader';
import { followCreators } from '../../store/modules/follow';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type UserHeadContainerProps = StateProps & DispatchProps & OwnProps

class UserHeadContainer extends React.Component<UserHeadContainerProps> {
    public onSetting = () => {
        const { BaseActions } = this.props;
        BaseActions.setProfile(true);
    }

    public onClick = () => {
        const { BaseActions, pin } = this.props;
        pin ? BaseActions.openPinBox(false) : BaseActions.openPinBox(true);
    }

    public onToggleFollow = async () => {
        const { 
            FollowActions, 
            follow, 
            match: { 
                params: { 
                    displayName 
                } 
            } 
        } = this.props;
        
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

    public initialize = async () => {
        const { CommonActions, FollowActions } = this.props;
        const { displayName } = this.props.match.params;
        if (!displayName) return;

        try {
            CommonActions.initializeProfile();
            CommonActions.getProfile(displayName);
            await FollowActions.checkExistsUserFollow(displayName);
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidUpdate(preProps: UserHeadContainerProps) {
        if (preProps.visible !== this.props.visible) {
            this.initialize();
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { match: { url }, profile, loading, follow } = this.props;
        const { onClick, onSetting, onToggleFollow } = this;

        if (loading) return <FullscreenLoader visible={loading}/>
        return (
            <React.Fragment>
                <UserHeader
                    profile={profile}
                    follow={follow}
                    onClick={onClick}
                    onSetting={onSetting}
                    onFollow={onToggleFollow}
                />
                <UserNav
                    url={url}
                    displayName={profile.displayName}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ base, common, follow }: StoreState) => ({
    pin: base.pin.visible,
    profile: common.profile,
    loading: common.profile.loading,
    visible: base.profile.visible,
    follow: follow.user.follow,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    CommonActions: bindActionCreators(commonCreators, dispatch),
    FollowActions: bindActionCreators(followCreators, dispatch),
});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserHeadContainer);