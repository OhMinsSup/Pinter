import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as authActions} from '../../store/modules/auth'
import AuthForm from '../../components/landing/AuthForm';

type Props = {
    email: string;
    sendEmail: boolean;
    isUser: boolean;
    AuthActions: typeof authActions;
}

class AuthFormContainer extends React.Component<Props> {
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
        const { sendEmail, isUser, email } = this.props;
        const { onChange, onEnterKeyPress, onSendVerification } = this;
        const sending = false;
        return (
            <AuthForm 
                onChange={onChange}
                onEnterKeyPress={onEnterKeyPress}
                onSendVerification={onSendVerification}
                sendEmail={sendEmail} 
                isUser={isUser} 
                sending={sending}
                email={email}
            />
        );
    }
}

export default connect(
    ({ auth }: StoreState) => ({
        email: auth.email,
        sendEmail: auth.sendEmail,
        isUser: auth.isUser 
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(AuthFormContainer);