import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';
import { Recent, Tags } from '../../page';

class Main extends React.Component {
    public render() {
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                <Switch>
                    <Route exact path='/' component={Recent}/>
                    <Route exact path='/tags/:tag?' component={Tags}/>
                </Switch>
            </MainTemplate>
        )
    }
}

export default Main;