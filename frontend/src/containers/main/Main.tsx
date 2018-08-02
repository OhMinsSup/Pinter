import * as React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';
import { Recent, Tags } from '../../page';
import ListBoxUsers from '../recent/ListBoxUsers';

class Main extends React.Component {
    public render() {
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                <Route exact path='/' component={Recent}/>
                <Route exact path='/tags/:tag?' component={Tags}/>
                <ListBoxUsers />
            </MainTemplate>
        )
    }
}

export default Main;