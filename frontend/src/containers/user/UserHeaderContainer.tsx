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
import { groupCreators } from 'src/store/modules/group';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class UserHeadContainer extends React.Component<Props> {
  public onSetting = () => {
    const { BaseActions } = this.props;
    BaseActions.setProfile(true);
  };

  public onGruop = () => {
    const { GroupActions } = this.props;
    GroupActions.setMakeGroup(true);
  };

  public onToggleFollow = async () => {
    const {
      FollowActions,
      CommonActions,
      follow,
      match: {
        params: { displayName },
      },
    } = this.props;

    try {
      if (follow) {
        await FollowActions.unfollow(displayName);
        await CommonActions.sendMessage('unfollow를');
      } else {
        await FollowActions.follow(displayName);
        await CommonActions.sendMessage('follow를');
      }
    } catch (e) {
      console.log(e);
    }
  };

  public initialize = async () => {
    const { CommonActions, FollowActions } = this.props;
    const { displayName } = this.props.match.params;

    if (!displayName) return;
    CommonActions.initializeProfile();

    try {
      await CommonActions.getProfile(displayName);
      await FollowActions.checkExistsUserFollow(displayName);
    } catch (e) {
      console.log(e);
    }
  };

  public componentDidUpdate(preProps: Props) {
    if (
      preProps.visible !== this.props.visible ||
      preProps.match.params.displayName !== this.props.match.params.displayName
    ) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      match: { url },
      profile,
      loading,
      follow,
      username,
      displayName,
    } = this.props;
    const { onSetting, onToggleFollow, onGruop } = this;

    if (loading) return <FullscreenLoader visible={loading} />;

    return (
      <React.Fragment>
        <UserHeader
          displayName={displayName}
          username={username}
          profile={profile}
          follow={follow}
          onSetting={onSetting}
          onGroup={onGruop}
          onFollow={onToggleFollow}
        />
        <UserNav url={url} displayName={profile.displayName} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  base,
  common,
  follow,
  user,
  group,
}: StoreState) => ({
  profile: common.profile,
  loading: common.profile.loading,
  visible: base.profile.visible,
  follow: follow.user.follow,
  group: group.makeModal.visible,
  username: user.user && user.user.username,
  displayName: user.user && user.user.displayName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
  CommonActions: bindActionCreators(commonCreators, dispatch),
  FollowActions: bindActionCreators(followCreators, dispatch),
  GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserHeadContainer);
