import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { StoreState } from '../../store/modules';
import { actionCreators as baseActions } from '../../store/modules/base';
import { actionCreators as userActions } from '../../store/modules/user';
import { actionCreators as authActions } from '../../store/modules/auth';
import AuthForm from '../../components/landing/AuthForm';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    history: History
};

type AuthFormContainerProps = StateProps & DispatchProps & OwnProps;

class AuthFormContainer extends React.Component<AuthFormContainerProps> {
    public onEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onSendVerification();
        }
    }

    public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        const { AuthActions } = this.props;
        AuthActions.setEmailInput(value);
    }

    public onSendVerification = async () => {
        const { email, AuthActions } = this.props;

        try {
            await AuthActions.sendAuthEmail(email);
        } catch (e) {
            console.log(e);
        }
    }

    public onSocialLogin = async (provider: string) => {
        const { AuthActions, BaseActions } = this.props;

        BaseActions.setFullscreenLoader(true);

        try {
            await AuthActions.providerLogin(provider);
        } catch (e) {
            BaseActions.setFullscreenLoader(false);
        }
        
        // history.push('/register');
        BaseActions.setFullscreenLoader(false);
    }

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

const mapStateToProps = ({ auth, base }: StoreState) => ({
    email: auth.email,
    sendEmail: auth.sendEmail,
    isUser: auth.isUser,
    sending: auth.sending,
    socialAuthResult: auth.socialAuthResult
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(AuthFormContainer);

