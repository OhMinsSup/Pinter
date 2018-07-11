import * as React from 'react';
import * as classNames from 'classnames/bind';
import LabelInput from '../LabelInput';

const ArrowIcon = require('react-icons/lib/md/arrow-forward');
const styles = require('./RegisterForm.scss');
const cx = classNames.bind(styles);

interface Props {
  displayName?: string
  email?: string
  username?: string
  emailEditable: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onRegister(): Promise<void>
};

const RegisterForm: React.SFC<Props> = ({
  onChange, onRegister,
  displayName, email, username, emailEditable,
}) => {
  return (
    <div className={cx('RegisterForm')}>
      <div className={cx('FormHead')}>
        <h2>기본 회원정보 등록</h2>
      </div>
      <div className={cx('FormContents')}>
        <LabelInput value={displayName} name="displayName" required label="이름" placeholder="이름을 입력하세요" onChange={onChange} />
        <LabelInput value={email} type="email" name="email" required label="이메일" placeholder="이메일을 입력하세요" onChange={onChange} disabled={!emailEditable} />
        <LabelInput value={username} name="username" required label="아이디" placeholder="아이디를 입력하세요" onChange={onChange} />
        <div className={cx('agreement')}>
          다음 버튼을 누르면 <span>서비스 이용약관</span>과 <span>개인정보취급방침</span>에 동의하는 것을 인정합니다.
        </div>
        <div className={cx('ButtonWrapper')}>
          <div className={cx('IconButton')} onClick={onRegister}>
            <span>다음</span>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;