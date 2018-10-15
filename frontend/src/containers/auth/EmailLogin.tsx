import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import * as queryString from 'query-string';
import { authCreators } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';
import { userCreators } from '../../store/modules/user';
import storage from '../../lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  location: Location;
  history: History;
};

type Props = StateProps & DispatchProps & OwnProps;

class EmailLoginContainer extends React.Component<Props> {
  public initialize = async () => {
    const { search } = this.props.location;
    const { code } = queryString.parse(search);
    const { AuthActions, UserActions } = this.props;
    try {
      await AuthActions.localLogin(code);
      const { authResult } = this.props;

      if (
        authResult.user.displayName === '' ||
        authResult.user.id === '' ||
        authResult.user.username === ''
      ) {
        return this.props.history.push('/');
      }

      const { user } = authResult;
      UserActions.setUser(user);
      storage.set('__pinter_user__', user);
    } catch (e) {
      console.log(e);
    }

    const { history } = this.props;
    history.push('/');
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    return null;
  }
}

const mapStateToProps = ({ auth }: StoreState) => ({
  authResult: auth.authResult,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(EmailLoginContainer);
