import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Dispatch, compose } from 'redux';
import { StoreState } from '../../store/modules';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';
import { Recent, Tags, Users} from '../../page';
import ListBoxUsers from '../recent/ListBoxUsers';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MainProps = StateProps & DispatchProps

class Main extends React.Component<MainProps> {
    public render() {
        if (!this.props.user) return null;
        
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                <Switch>
                    <Route exact path='/' component={Recent}/>
                    <Route exact path='/tags/:tag?' component={Tags}/>
                    <Route exact path='/users' component={Users}/>
                </Switch>
                <ListBoxUsers />
            </MainTemplate>
        )
    }
}

const mapStateToProps = ({ user }: StoreState) => ({
    user: user.user && user.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default compose( 
    withRouter,
    connect<StateProps, DispatchProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(Main);