import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import Header from '../../components/base/Header';
import MenuItem from '../../components/base/MenuItem';

const HomeIcon = require('react-icons/lib/fa/home');
const UserIcon = require('react-icons/lib/fa/user');

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {
    public renderRight() {
        const { user } = this.props;

        if (!user) {
            return (
                <div>
                    로그인 버튼
                </div>
            );
        }
        
        return (
            <React.Fragment>
                <MenuItem
                    icon={<HomeIcon/>}
                />
                <MenuItem
                    icon={<UserIcon/>}
                    username={this.props.username}
                />
            </React.Fragment>
        );
    }

    public render() {
        return (
            <Header 
                right={this.renderRight()}
            />
        )
    }
}

const mapStateToProps = ({ user }: StoreState) => ({
    user: user.user,
    username: user.user && user.user.username
});

const mapDispatchToProps = () => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);