import * as React from 'react';
import RegisterForm from '../../components/register/RegisterForm';


type Props = {

};

class RegisterFormContainer extends React.Component<Props> {
    public onChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        console.log(e);
    }

    public onRegister = async (): Promise<any> => {
        await console.log('하하하');
    }
    public render() {
      const {onChange, onRegister} = this;
      const displayName = 'veloss';
      const email = 'public.qwer123@naver.com';
      const username = '유저이름';
      const emailEditable = false;
    return (
      <RegisterForm
        onChange={onChange}
        onRegister={onRegister}
        displayName={displayName}
        email={email}
        username={username}
        emailEditable={emailEditable}
      />
    );
  }
}

export default RegisterFormContainer;
