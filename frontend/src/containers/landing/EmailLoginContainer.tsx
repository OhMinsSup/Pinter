import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import * as queryString from 'query-string';
import { actionCreators as authActions } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    location: Location,
    history: History,
}

type EmailLoginContainerProps = StateProps & DispatchProps & OwnProps;

class EmailLoginContainer extends React.Component<EmailLoginContainerProps> {
    public initialize = (): void => {
        const { search } = this.props.location;
        const { code } = queryString.parse(search);
        const { AuthActions } = this.props;
        try {
            AuthActions.localLogin({ code });
            this.props.history.push('/');

        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount() {
        this.initialize();
    }
    
    public render() {
        return null;
    }
}

const mapStateToProps = ({ auth }: StoreState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authActions, dispatch),
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(EmailLoginContainer);