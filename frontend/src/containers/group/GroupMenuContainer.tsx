import * as React from 'react';
import GroupMenu from '../../components/group/GroupMenu';
import { StoreState } from '../../store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { groupBaseCreators } from '../../store/modules/group/base';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type GroupMenuContaienrProps = StateProps & DispatchProps;

class GroupMenuContaienr extends React.Component<GroupMenuContaienrProps> {
    public render() {
        const { menu } = this.props;

        if (!menu) return null;
        
        return(
            <GroupMenu /> 
        )
    }
}

const mapStateToProps = ({ group }: StoreState) => ({
    menu: group.groupBase.menu.visible
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    GroupBaseActions: bindActionCreators(groupBaseCreators, dispatch),
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupMenuContaienr);