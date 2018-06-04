import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as authActions } from '../../store/modules/auth'
import AuthForm from '../../components/landing/AuthForm';


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type AuthFormContainerProps = StateProps & DispatchProps;

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

    public onSendVerification  = async () => {
        const { email, AuthActions } = this.props;

        try {
            await AuthActions.sendAuthEmail(email);
        } catch (e) {
            console.log(e);
        }
    }

    public render() {
        const { sendEmail, isUser, email, sending } = this.props;
        return (
            <AuthForm 
                onChange={this.onChange}
                onEnterKeyPress={this.onEnterKeyPress}
                onSendVerification={this.onSendVerification}
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
    sending: auth.sending
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(AuthFormContainer);