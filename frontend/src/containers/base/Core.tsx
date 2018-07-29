import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators as userActions } from '../../store/modules/user';
import { actionCreators as baseActions } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';
import FullscreenLoader from '../../components/base/FullscreenLoader';
import Storage from '../../lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type CoreProps = StateProps & DispatchProps;

class Core extends React.Component<CoreProps>{
  public checkUser = () => {
    const storageUser = Storage.get('__pinter_user__');
    const { UserActions } = this.props;
    if (!storageUser) {
      UserActions.process();
      return;
    }

    UserActions.setUser(storageUser);

    try {
      UserActions.checkUser();
    } catch (e) {
      Storage.remove('__pinter_user__');
    }
  }

  public initialize = () => {
    this.checkUser();
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        <FullscreenLoader visible={visible}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
    visible: base.fullscreenLoader,
    user: user.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Core);