import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { StoreState } from '../../store/modules';
import { baseCreators } from '../../store/modules/base';
import { authCreators } from '../../store/modules/auth';
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
        const {  } = this.props;

        try {

        } catch (e) {
            console.log(e);
        }
    }

    public onSocialLogin = async (provider: string) => {
        const { BaseActions } = this.props;
        BaseActions.setFullscreenLoader(true);
        try {

        } catch (e) {
            BaseActions.setFullscreenLoader(false);
        }
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

const mapStateToProps = ({ auth }: StoreState) => ({
    email: auth.email,
    sendEmail: auth.sendEmail,
    isUser: auth.isUser,
    sending: auth.sending,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    AuthActions: bindActionCreators(authCreators, dispatch),
    BaseActions: bindActionCreators(baseCreators, dispatch),
});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(AuthFormContainer);