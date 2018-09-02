import * as React from 'react';
import UserContent from '../../components/user/UserContent';
import { StoreState } from '../../store/modules';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import RecentPinList from '../list/RecentPinList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type UserContentContainerProps = StateProps & DispatchProps;

class UserContentContainer extends React.Component<UserContentContainerProps> {
    public render() {
        return (
            <UserContent>
                <Switch>
                    <Route path="/@:displayName/pin" component={RecentPinList} />
                </Switch>
            </UserContent>
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserContentContainer);