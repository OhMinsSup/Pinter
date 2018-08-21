import * as React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import AuthFormContainer from '../containers/landing/AuthFormContainer';

const Home = () => {
    return (
        <PageTemplate>
            <LandingTemplateContainer form={<AuthFormContainer/>}/>
        </PageTemplate>
    )
}

export default Home;