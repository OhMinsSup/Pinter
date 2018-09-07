import * as React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Recent, Tags, Users, Groups, WriteGroup } from '../../page';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {  location: Location };

type MainProps = OwnProps & StateProps & DispatchProps; 

class Main extends React.Component<MainProps> {
    public onOpenBox = () => {
        const { BaseActions } = this.props;
        BaseActions.openPinBox(true)
    }

    public render() {       
        const { location, sidebar, user } = this.props; 
        const { onOpenBox } = this;

        if (!user) return null;

        return(
            <MainTemplate
                path={location.pathname}
                onClick={onOpenBox}
                header={<HeaderContainer />}
                sidebar={sidebar}
            >
                <Switch>
                    <Route exact path="/" component={Recent} />
                    <Route exact path='/tags/:tag?' component={Tags}/>
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/groups' component={Groups} />
                    <Route exact path='/groups/write' component={WriteGroup} />
                </Switch>
            </MainTemplate>
        )
    }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
    visible: base.pin.visible,
    sidebar: base.sidebar.visible,
    user: user.user && user.user
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