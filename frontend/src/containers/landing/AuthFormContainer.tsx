import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { StoreState } from '../../store/modules';
import { baseCreators } from '../../store/modules/base';
import { authCreators } from '../../store/modules/auth';
import { userCreators } from '../../store/modules/user';
import AuthForm from '../../components/landing/AuthForm';
import storage from '../../lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  history: History;
};

type Props = StateProps & DispatchProps & OwnProps;

class AuthFormContainer extends React.Component<Props> {
  public onEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.onSendVerification();
    }
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const { AuthActions } = this.props;

    AuthActions.setEmailInput(value);
  };

  public onSendVerification = async () => {
    const { email, AuthActions } = this.props;

    try {
      await AuthActions.sendAuthEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  public onSocialLogin = async (provider: string) => {
    const { BaseActions, AuthActions, history, UserActions } = this.props;
    BaseActions.setFullscreenLoader(true);
    try {
      AuthActions.providerLoginType(provider);
      await AuthActions.providerLogin(provider);
    } catch (e) {
      BaseActions.setFullscreenLoader(false);
    }

    try {
      const { socialAuthResult } = this.props;
      if (
        socialAuthResult.accessToken === '' ||
        socialAuthResult.provider === ''
      )
        return;
      const { accessToken } = socialAuthResult;
      await AuthActions.verifySocial({ accessToken, provider });

      const { verifySocialResult } = this.props;
      if (verifySocialResult.id === '') return;
      const { exists } = verifySocialResult;

      if (exists) {
        await AuthActions.socialLogin({ accessToken, provider });
        const { authResult } = this.props;
        const { user } = authResult;
        UserActions.setUser(user);
        storage.set('__pinter_user__', user);
      } else {
        const { email, username } = verifySocialResult;
        if (!email || !username) {
          return;
        }
        AuthActions.autoRegisterForm({ email, username });
        history.push('/email-register');
      }
    } catch (e) {
      history.push('/');
    }
    BaseActions.setFullscreenLoader(false);
  };

  public render() {
    const { sendEmail, isUser, email, sending } = this.props;
    return (
      <AuthForm
        onChange={this.onChange}
        onEnterKeyPress={this.onEnterKeyPress}
        onSendVerification={this.onSendVerification}
        onSocialLogin={this.onSocialLogin}
        sendEmail={sendEmail}
        isUser={isUser}
        email={email}
        sending={sending}
      />
    );
  }
}

const mapStateToProps = ({ auth }: StoreState) => ({
  email: auth.email,
  sendEmail: auth.sendEmail,
  isUser: auth.isUser,
  sending: auth.sending,
  socialAuthResult: auth.socialAuthResult,
  verifySocialResult: auth.verifySocialResult,
  authResult: auth.authResult,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
  BaseActions: bindActionCreators(baseCreators, dispatch),
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(AuthFormContainer);
