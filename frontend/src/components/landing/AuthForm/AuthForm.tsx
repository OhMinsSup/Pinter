import * as React from 'react';
import * as classNames from 'classnames/bind';
import SocialLoginButton from '../SocialLoginButton';

const CheckIcon =  require('react-icons/lib/md/check');
const LogoIcons = require('react-icons/lib/fa/pinterest-square');
const styles = require('./AuthForm.scss');
const cx = classNames.bind(styles);

type Props = {
    email: string
    sendEmail: boolean
    isUser: boolean
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
    onEnterKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void,
    onSendVerification(): Promise<any>
}

const AuthForm: React.SFC<Props> = ({ 
    onChange,
    onEnterKeyPress,
    onSendVerification,
    sendEmail, 
    isUser, 
    email 
}) => {
    return (
        <div className={cx('AuthForm')}>
            <div className={cx('FormHeader')}>
                <LogoIcons />
            </div>
            <div>
                <h3>Pinter에 오신 것을 환영 합니다.</h3>
            </div>
            {
                sendEmail ? (
                    <div className={cx('SendEmail')}>
                        <CheckIcon />
                        <div className={cx('Text')}>
                            { isUser ? '로그인' : '회원가입' } 링크가 이메일로 전송되었습니다.<br />
                            이메일의 링크를 통하여 { isUser ? '로그인' : '회원가입' }을 계속하세요.
                        </div>
                    </div>
                ) : (
                    <div className={cx('InputWithButton')}>
                        <input
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={onChange}
                            onKeyPress={onEnterKeyPress}
                        />
                        <div className={cx('Button')} onClick={onSendVerification}>
                            시작하기
                        </div>
                    </div>
                )
            }
            <div className={cx('Separator')}>
                <div className={cx('or')}>OR</div>
            </div>
            <div className={cx('SocialButtons')}>
                <SocialLoginButton type="google"/>
                <SocialLoginButton type="facebook"/>
            </div>
        </div>
    );
}

export default AuthForm;