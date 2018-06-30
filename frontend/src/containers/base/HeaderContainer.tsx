import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import Header from '../../components/base/Header';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {
    public renderRight() {
        const { user } = this.props;

        if (!user) {
            return (
                <div>
                    로그인해주세여
                </div>
            );
        }

        return (
            <div>로그린 버튼</div>
        )
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
    user: user.user
});

const mapDispatchToProps = () => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);