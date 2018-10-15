import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import * as queryString from 'query-string';
import { authCreators } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';
import RegisterForm from '../../components/register/RegisterForm';
import { userCreators } from '../../store/modules/user';
import storage from '../../lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location; history: History };
type Props = StateProps & DispatchProps & OwnProps;

class RegisterFormContainer extends React.Component<Props> {
  public initialize = async () => {
    const { search } = this.props.location;
    const { AuthActions } = this.props;
    const { code } = queryString.parse(search);

    if (!code) return;

    try {
      await AuthActions.getCode(code);
    } catch (e) {
      console.log(e);
    }
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { AuthActions } = this.props;
    const { value, name } = e.target;
    AuthActions.changeRegisterForm({
      name,
      value,
    });
  };

  public onRegister = async (): Promise<void> => {
    const {
      displayName,
      username,
      registerToken,
      AuthActions,
      isSocial,
      UserActions,
      history,
    } = this.props;

    try {
      if (isSocial) {
        const { socialAuthResult } = this.props;
        if (
          socialAuthResult.accessToken === '' ||
          socialAuthResult.provider === ''
        )
          return;
        const { accessToken, provider } = socialAuthResult;
        await AuthActions.socialRegister({
          accessToken,
          provider,
          displayName,
          username,
        });
      } else {
        await AuthActions.localRegister({
          registerToken,
          username,
          displayName,
        });
      }

      const { authResult } = this.props;

      if (
        authResult.user.id === '' ||
        authResult.user.username === '' ||
        authResult.user.displayName === ''
      )
        return;

      const { user } = authResult;
      UserActions.setUser(user);
      storage.set('__pinter_user__', user);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { onChange, onRegister } = this;
    const { displayName, email, username, isSocial, socialEmail } = this.props;
    return (
      <RegisterForm
        onChange={onChange}
        onRegister={onRegister}
        displayName={displayName}
        email={email}
        username={username}
        emailEditable={isSocial && !socialEmail}
      />
    );
  }
}

const mapStateToProps = ({ auth }: StoreState) => ({
  displayName: auth.registerForm.displayName,
  email: auth.registerForm.email,
  username: auth.registerForm.username,
  registerToken: auth.registerToken,
  authResult: auth.authResult,
  socialAuthResult: auth.socialAuthResult,
  isSocial: auth.isSocial,
  socialEmail: auth.verifySocialResult && auth.verifySocialResult.email,
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
)(RegisterFormContainer);
