import * as React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import AuthFormContainer from '../containers/landing/AuthFormContainer';
import Main from '../containers/main/Main';

const Home: React.SFC<{}> = () => {
  return (
    <PageTemplate>
      <LandingTemplateContainer form={<AuthFormContainer />} />
      <Main />
    </PageTemplate>
  );
};

export default Home;
