import * as React from 'react';
import Sidebar from '../../components/base/Sidebar';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type SidebarContainerProps = StateProps & DispatchProps;

class SidebarContainer extends React.Component<SidebarContainerProps> {
    public onClose = () => {
        const { BaseActions } = this.props;
        BaseActions.setSidebar(false);
    }

    public render() {
        const { visible,displayName } = this.props;
        if (!visible) return null;
        
        return (
            <Sidebar
                displayName={displayName}
                onClose={this.onClose}
            />
        );
    }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
    visible: base.sidebar.visible,
    displayName: user.user && user.user.displayName,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
})

export default compose(
    connect<StateProps, DispatchProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(SidebarContainer);