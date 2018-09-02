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

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type UserHeadContainerProps = StateProps & DispatchProps & OwnProps

class UserHeadContainer extends React.Component<UserHeadContainerProps> {
    public onClick = () => {
        const { BaseActions, pin } = this.props;
        pin ? BaseActions.openPinBox(false) : BaseActions.openPinBox(true);
    }

    public initialize = async () => {
        const { CommonActions } = this.props;
        const { displayName } = this.props.match.params;
        if (!displayName) return;
        CommonActions.initializeProfile();
        CommonActions.getProfile(displayName);
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { match: { url }, profile, loading } = this.props;
        const { onClick } = this;

        if (loading) return <FullscreenLoader visible={loading}/>
        return (
            <React.Fragment>
                <UserHeader
                    profile={profile}
                    following={false}
                    onClick={onClick}
                />
                <UserNav
                    url={url}
                    displayName={profile.displayName}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ base, common }: StoreState) => ({
    pin: base.pin.visible,
    profile: common.profile,
    loading: common.profile.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    CommonActions: bindActionCreators(commonCreators, dispatch),
});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserHeadContainer);