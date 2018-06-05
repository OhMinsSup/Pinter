import * as React from 'react';
import * as classNames from 'classnames/bind';

const FacebookIcon = require('react-icons/lib/fa/facebook-official');
const GoogleIcon = require('react-icons/lib/fa/google');
const styles = require('./SocialLoginButton.scss');
const cx = classNames.bind(styles);

type Props = {
  type: 'facebook' | 'google' ,
  onSocialLogin(provider: string): void
};

const providers = {
  facebook: {
    icon: FacebookIcon,
  },
  google: {
    icon: GoogleIcon,
  },
};

const SocialLoginButton: React.SFC<Props> = (props) => {
  const { type, onSocialLogin } = props;
  const { icon: Icon } = providers[type];

  return (
    <div className={cx('SocialLoginButton', type)} onClick={() => onSocialLogin(type)}>
      <div className={cx('icon')}>
        <Icon />
      </div>
      <div className={cx('Text')}>
        {type} <span className={cx('Login')}>로그인</span>
      </div>
    </div>
  );
};

SocialLoginButton.defaultProps = {
  type: 'facebook',
};

export default SocialLoginButton;