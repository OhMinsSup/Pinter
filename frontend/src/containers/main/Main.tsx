import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';
import { Recent } from '../../page';

class Main extends React.Component {
    public render() {
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                <Switch>
                    <Route exact path='/' component={Recent}/>
                </Switch>
            </MainTemplate>
        )
    }
}

export default Main;