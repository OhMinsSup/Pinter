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
    public onClickOutside = (e: any) => {
        const { BaseActions } = this.props;
        BaseActions.setSidebar(false);
    }

    public render() {
        const { visible } = this.props;
        if (!visible) return null;
        
        return (
            <Sidebar
            />
        );
    }
}

const mapStateToProps = ({ base }: StoreState) => ({
    visible: base.sidebar.visible
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