import * as React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import LandingTemplateContainer from '../containers/landing/LandingTemplateContainer';
import AuthFormContainer from '../containers/landing/AuthFormContainer';
import Main from '../containers/main/Main';

type Props = {
    location: Location
}

const Home: React.SFC<Props> = ({ location }) => {
    return (
        <PageTemplate>
            <LandingTemplateContainer form={<AuthFormContainer/>} />
            <Main path={location.pathname}/>
        </PageTemplate>
    )
}

export default Home;