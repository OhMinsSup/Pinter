import * as React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';
import { Recent, Tags } from '../../page';

class Main extends React.Component {
    public render() {
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                <Route exact path='/' component={Recent}/>
                <Route exact path='/tags/:tag?' component={Tags}/>
            </MainTemplate>
        )
    }
}

export default Main;