import * as React from 'react';
import RegisterTemplate from '../components/register/RegisterTemplate';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

const Register: React.SFC<{}> = () => {
  return <RegisterTemplate form={<RegisterFormContainer />} />;
};

export default Register;
