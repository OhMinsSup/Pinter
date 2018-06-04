import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import * as queryString from 'query-string';
import { actionCreators as userActions } from '../../store/modules/user';
import { actionCreators as authActions } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';
import RegisterForm from '../../components/register/RegisterForm';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
  location: Location,
  history: History,
}
type RegisterFormContainerProps = StateProps & DispatchProps & OwnProps; 

class RegisterFormContainer extends React.Component<RegisterFormContainerProps> {
    public initialize = async () => { 
      const { search } = this.props.location;
      const { AuthActions } = this.props;
      const { code } = queryString.parse(search);
      
      if (!code) {
        console.log('code가 없습니다.');
        return;
      }

      try {
        await AuthActions.code(code);
      } catch (e) {
        console.log(e);
      }
    }

    public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { AuthActions } = this.props;
      const { value, name } = e.target;
      AuthActions.changeRegisterForm({
        name, value
      });
    }

    public onRegister = (): void => {
      const {
        displayName,
        username,
        registerToken,
        AuthActions,
        isSocial
      } = this.props;

      try {
        if (isSocial) {
          console.log('소셜 인증');
        } else {
          const auth = {
            registerToken,
            username,
            displayName
          }
          AuthActions.localRegister(auth);
        }
      } catch (e) {
        console.log(e);
      }

      this.props.history.push('/');
    }

    public componentDidMount() {
      this.initialize();
    }

    public render() {
      const {onChange, onRegister} = this;
      const { displayName, email, username, isSocial, socialEmail  } = this.props;
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
  AuthActions: bindActionCreators(authActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch)
});

export default  compose( 
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterFormContainer);
