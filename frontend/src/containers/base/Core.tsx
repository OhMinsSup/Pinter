import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { userCreators } from '../../store/modules/user';
import { baseCreators } from '../../store/modules/base';
import { StoreState } from '../../store/modules';
import FullscreenLoader from '../../components/base/FullscreenLoader';
import Storage from '../../lib/storage';
import { commonCreators } from '../../store/modules/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type CoreProps = StateProps & DispatchProps;

class Core extends React.Component<CoreProps> {
  public checkUser = async () => {
    const storageUser = Storage.get('__pinter_user__');
    const { UserActions, CommonActions } = this.props;
    if (!storageUser) {
      UserActions.process();
      return;
    }
    UserActions.setUser(storageUser);

    try {
      await UserActions.checkUser();
      await CommonActions.createNotice();
    } catch (e) {
      Storage.remove('__pinter_user__');
    }
  };

  public initialize = () => {
    this.checkUser();
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        <FullscreenLoader visible={visible} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
  visible: base.fullscreenLoader,
  user: user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  UserActions: bindActionCreators(userCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
  CommonActions: bindActionCreators(commonCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Core);
