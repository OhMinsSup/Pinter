import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import Header from '../../components/base/Header';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {
    public render() {
        const { thumbnail, username } = this.props;
        return (
            <Header 
                thumbnail={thumbnail}
                username={username}
            />
        )
    }
}

const mapStateToProps = ({ user }: StoreState) => ({
    user: user.user && user.user,
    username: user.user && user.user.username,
    thumbnail: user.user && user.user.thumbnail
});

const mapDispatchToProps = () => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);