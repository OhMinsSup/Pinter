import * as React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import AuthFormContaiern from '../containers/landing/AuthFormContainer';

const Home: React.SFC<{}> = () => {
    return (
        <PageTemplate>
            <LandingTemplateContainer form={<AuthFormContaiern />}/>
        </PageTemplate>
    );
}

export default Home;