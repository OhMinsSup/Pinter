import * as React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Recent, Tags, Users, Groups } from '../../page';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {  location: Location };

type MainProps = OwnProps & StateProps & DispatchProps; 

class Main extends React.Component<MainProps> {
    public render() {       
        const { location, sidebar, user, size } = this.props; 

        if (!user) return null;

        return(
            <MainTemplate
                path={location.pathname}
                header={<HeaderContainer />}
                sidebar={sidebar}
                size={size}
                displayName={user.displayName}
            >
                <Switch>
                    <Route exact path="/" component={Recent} />
                    <Route exact path='/tags/:tag?' component={Tags}/>
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/groups' component={Groups} />
                    <Route exact path='/groups/write' component={Groups} />
                </Switch>
            </MainTemplate>
        )
    }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
    sidebar: base.sidebar.visible,
    user: user.user && user.user,
    size: base.size,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch)
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(Main);