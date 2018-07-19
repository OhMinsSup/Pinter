import * as React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import AuthFormContaiern from '../containers/landing/AuthFormContainer';
import Main from '../containers/main/Main';

const Home = () => {
    return (
        <PageTemplate>
            <LandingTemplateContainer form={<AuthFormContaiern />}/>
            <Main />
        </PageTemplate>
    );
}

export default Home;