import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import { actionCreators as userActions } from '../../store/modules/user';
import Header from '../../components/base/Header';
import Storage from '../../lib/storage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {
    public onLogout = async () => {
        const { UserActions } = this.props;
        try {
          await UserActions.logout();
        } catch (e) {
          console.log(e);
        }
        Storage.remove('__pinter_user__');
        window.location.href = '/';
      }
    
    public render() {
        const { thumbnail, displayName } = this.props;
        const { onLogout } = this;
        return (
            <Header 
                thumbnail={thumbnail}
                displayName={displayName}
                onLogout={onLogout}
            />
        )
    }
}

const mapStateToProps = ({ user }: StoreState) => ({
    user: user.user && user.user,
    displayName: user.user && user.user.displayName,
    thumbnail: user.user && user.user.thumbnail
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);